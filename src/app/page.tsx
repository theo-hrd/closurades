"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ArtistList from './components/ArtistList';
import TicketButton from './components/TicketButton';
import Lineup from './components/Lineup';

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
          <span className="mt-2 text-xl blue-500 font-bold uppercase hover:text-[1c121] transition-colors duration-300">
            Billeterie
          </span>
        </div>
      </div>
      
      {/* Contenu principal avec animation au scroll */}
      <main className="flex-grow bg-white">
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
              <p className="mt-4 text-lg max-w-2xl text-center mx-auto text-black">
                Achetez vos tickets dès maintenant !
              </p>
              <TicketButton />
            </div>
          </div>
        </div>
        
        {/* Section Line-up */}
        <Lineup />
      </main>
      
      {/* Footer */}
      <footer className="bg-black py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Les Closurades Festival.
          </p>
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