"use client";
import { useEffect, useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Marquer le composant comme monté après le rendu
  }, []);

  if (!mounted) return null; // Empêcher le rendu avant que le composant soit monté

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-70 backdrop-blur-md shadow-lg">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-extrabold text-white">Les Closurades</h2>
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <ul className="hidden lg:flex space-x-6">
          <li>
            <a href="#billeterie" className="text-white hover:text-gray-300 transition">
              Billeterie
            </a>
          </li>
          <li>
            <a href="#merch" className="text-white hover:text-gray-300 transition">
              Merch
            </a>
          </li>
          <li>
            <a href="#lineup" className="text-white hover:text-gray-300 transition">
              Line-up
            </a>
          </li>
          <li>
            <a href="#informations" className="text-white hover:text-gray-300 transition">
              Informations
            </a>
          </li>
        </ul>
      </nav>

      {/* Menu mobile avec animation */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-black bg-opacity-80 backdrop-blur-md`}
      >
        <ul className="space-y-4 p-6">
          <li>
            <a href="#billeterie" className="text-white hover:text-gray-300 transition">
              Billeterie
            </a>
          </li>
          <li>
            <a href="#merch" className="text-white hover:text-gray-300 transition">
              Merch
            </a>
          </li>
          <li>
            <a href="#lineup" className="text-white hover:text-gray-300 transition">
              Line-up
            </a>
          </li>
          <li>
            <a href="#informations" className="text-white hover:text-gray-300 transition">
              Informations
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
