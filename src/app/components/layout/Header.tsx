"use client";
import { useEffect, useState, useRef } from "react";
import { scrollToElement } from "../../lib/utils";

// Define menu sections for better maintainability
const MENU_SECTIONS = [
  { id: "billeterie", label: "Billeterie" },
  { id: "lineup", label: "Line-up" },
  { id: "merch", label: "Merch" },
  { id: "informations", label: "Informations" }
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    }
  };

  // Separate component for menu items to reduce duplication
  const MenuItems = () => (
    <>
      {MENU_SECTIONS.map((section) => (
        <li key={section.id}>
          <button 
            onClick={() => scrollToSection(section.id)} 
            className="text-white hover:text-gray-300 transition"
          >
            {section.label}
          </button>
        </li>
      ))}
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-70 backdrop-blur-md shadow-lg">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <button 
          className="text-2xl font-extrabold text-white" 
          onClick={() => scrollToSection("closurades")}
        >
          Les Closurades
        </button>
        
        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center">
          <button 
            ref={buttonRef} 
            onClick={() => setMenuOpen(!menuOpen)} 
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
        <ul className="hidden lg:flex space-x-6">
          <MenuItems />
        </ul>
      </nav>

      {/* Mobile menu with animation */}
      <div
        ref={menuRef}
        className={`lg:hidden transition-all duration-300 ease-in-out fixed top-16 left-0 right-0 ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden bg-black bg-opacity-80 backdrop-blur-md`}
      >
        <ul className="space-y-4 p-6">
          <MenuItems />
        </ul>
      </div>
    </header>
  );
}