"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ArtistList from './components/ArtistList';
import Header from './components/Header';
import TicketButton from './components/TicketButton';

export default function Home() {
  const images = [
    '/background.jpg',
    '/background2.jpg',
    '/background3.jpg',
    '/background4.jpg',
    '/background5.jpg',
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Effet pour faire défiler automatiquement les images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change l'image toutes les 5 secondes
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  // Animation au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const artists = [
    "Stuffed Foxes",
    "Dandee",
    "Lohan & Julien",
    "Born Idiot",
    "Kube",
    "TWENTYHATE",
    "Stonks"
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header fixe */}
      <Header />
      
      {/* Section Hero avec carousel d'images */}
      <div className="relative h-screen">
        {/* Carousel d'images avec effet de fondu */}
        <div className="absolute inset-0 overflow-hidden">
          {images.map((src, index) => (
            <div 
              key={index} 
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={src}
                alt={`Image ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover w-full h-full transform scale-105 hover:scale-100 transition-transform duration-10000"
              />
            </div>
          ))}
        </div>
        
        {/* Overlay gradient amélioré */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Titre centré avec animation */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            Les Closurades Festival
          </h1>
          <h2 className="mt-16 text-xl sm:text-3xl text-white drop-shadow-lg opacity-0 animate-fade-in-up">
            <span className='font-bold'>Les Closures, St-Georges-lès-Baillargeaux (86)</span> - <span className='underline decoration-pink-500 font-extrabold'>18 & 19 Juillet 2025</span>
          </h2>
         
          {/* Liste d'artistes défilante */}
          <ArtistList artists={artists} />
        </div>
        
        {/* Indicateur de scroll avec animation */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-300">
          <svg
            className="h-8 w-8 text-white animate-bounce"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
          <span className="mt-2 text-xl text-white font-bold uppercase hover:text-pink-500 transition-colors duration-300">
            Billeterie
          </span>
        </div>
      </div>
      
      {/* Contenu principal avec animation au scroll */}
      <main className="flex-grow bg-gray-900 text-white">
        <div 
          ref={sectionRef}
          className={`max-w-7xl mx-auto py-16 sm:px-6 lg:px-8 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="px-4 py-6 sm:px-0">
            <div className="text-center mt-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent uppercase">
                Billeterie
              </h2>
              <p className="mt-4 text-lg text-gray-300 max-w-2xl text-center mx-auto">
                Achetez vos tickets dès maintenant !
              </p>
              <TicketButton />
            </div>
          </div>
        </div>
        
        {/* Section Line-up */}
        <div id="lineup" className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">Line-up</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artists.map((artist, index) => (
                <div key={index} className="p-6 bg-gray-800 rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-gray-700 hover:shadow-lg hover:shadow-pink-500/30 group">
                  <h3 className="text-2xl font-bold group-hover:text-pink-500 transition-colors">{artist}</h3>
                  <p className="mt-2 text-gray-400">18 Juillet 2025 • 21:00</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-black py-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-extrabold text-white mb-4">Les Closurades</h2>
            <p className="text-gray-400">Le festival indépendant qui fait vibrer le Poitou</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Nous suivre</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.16 10.16 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
            <p className="text-gray-400">info@lesclosurades.com</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-8 mt-8 border-t border-gray-800 text-center text-gray-400">
          © {new Date().getFullYear()} Les Closurades Festival. Tous droits réservés.
        </div>
      </footer>
      
      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}