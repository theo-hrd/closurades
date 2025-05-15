"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Define menu sections for better maintainability
const MENU_SECTIONS = [
  { id: "Billetterie", label: "Billetterie" },
  { id: "lineup", label: "Line-up" },
  { id: "merch", label: "Merch" },
  { id: "informations", label: "Informations" }
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    setMounted(true);

    // Only run these effects if the header is visible
    if (pathname !== "/truite-ou-couille") {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setMenuOpen(false);
        }
      };

      // Measure the actual header height for scroll-padding-top
      const headerHeight = document.querySelector('header')?.offsetHeight || 100;
      document.documentElement.style.scrollPaddingTop = `${headerHeight}px`;

      document.addEventListener("mousedown", handleClickOutside);
      
      // Track scroll position to highlight active section and header background
      const handleScroll = () => {
        // Set header background when scrolled down
        const isScrolled = window.scrollY > 50;
        setScrolled(isScrolled);
        
        const scrollPosition = window.scrollY + headerHeight + 50;
        
        // Find which section we're currently in
        let current = "";
        MENU_SECTIONS.forEach(section => {
          const element = document.getElementById(section.id);
          if (element && element.offsetTop <= scrollPosition && 
              element.offsetTop + element.offsetHeight > scrollPosition) {
            current = section.id;
          }
        });
        
        // Also check if we're at the top (hero section)
        const heroSection = document.getElementById("closurades");
        if (heroSection && scrollPosition < (heroSection.offsetHeight / 2)) {
          current = "closurades";
        }
        
        setActiveSection(current);
      };
      
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Ne pas afficher le header sur la page truite-ou-couille
  if (pathname === "/truite-ou-couille") {
    return null;
  }

  if (!mounted) return null;

  // Improved function for scrolling to sections
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      setMenuOpen(false);
      
      // Get the header height to use as offset
      const headerHeight = document.querySelector('header')?.offsetHeight || 100;
      
      // Get the position of the section relative to the document
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      
      // Scroll to the section with the header height as offset
      window.scrollTo({
        top: sectionTop - headerHeight,
        behavior: 'smooth'
      });
      
      setActiveSection(id);
    }
  };

  // Separate component for menu items to reduce duplication
  const MenuItems = () => (
    <>
      {MENU_SECTIONS.map((section) => (
        <li key={section.id}>
          <button 
            onClick={() => scrollToSection(section.id)} 
            className={`font-raleway relative px-4 py-2 tracking-wider uppercase text-sm font-semibold transition-colors duration-300
              ${activeSection === section.id 
                ? "text-pink-400" 
                : "text-white hover:text-pink-300"}`}
          >
            {section.label}
            {activeSection === section.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-fuchsia-500 to-pink-500"></span>
            )}
          </button>
        </li>
      ))}
    </>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-black bg-opacity-80 backdrop-blur-md shadow-lg py-2" 
        : "bg-transparent py-6"
    }`}>
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button 
          className={`transition-all duration-500 ${scrolled ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => scrollToSection("closurades")}
        >
          <Image 
            src="/closurades.webp" 
            alt="Les Closurades" 
            width={160} 
            height={60} 
            className="h-12 w-auto object-contain"
          />
        </button>
        
        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center">
          <button 
            ref={buttonRef} 
            onClick={(e) => {
              e.stopPropagation(); // Prevent event propagation
              setMenuOpen(!menuOpen);
            }} 
            className="text-white relative z-50"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* Desktop menu */}
        <ul className="hidden lg:flex space-x-2 items-center">
          <MenuItems />
        </ul>
      </nav>

      {/* Mobile menu dropdown */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 right-0 bottom-0 z-40 bg-black bg-opacity-95 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden overflow-y-auto`}
        style={{ top: '0', height: '100vh' }}
      >
        <div className="flex flex-col h-full justify-center items-center py-20">
          <ul className="space-y-8 text-center">
            <MenuItems />
          </ul>
        </div>
      </div>
    </header>
  );
}