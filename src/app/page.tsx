"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ArtistList from './components/ArtistList';

export default function Home() {
  const images = [
    '/background.jpg',
    '/background2.jpg',
    '/background3.jpg',
    '/background4.jpg',
    '/background5.jpg',
    // Vous pouvez ajouter d'autres images ici
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Effet pour faire défiler automatiquement les images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change l'image toutes les 3 secondes
    
    return () => clearInterval(interval);
  }, [images.length]);
  
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
      {/* Section Header avec carousel d'images */}
      <div className="relative h-screen">
        {/* Carousel d'images */}
        <div className="absolute inset-0 overflow-hidden">
          {images.map((src, index) => (
            <div 
              key={index} 
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={src}
                alt={`Image ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        
        {/* Titre centré */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            Les Closurades Festival
          </h1>
          <h2 className="mt-16 text-xl sm:text-3xl drop-shadow-lg">
            <span className='font-bold'>Les Closures, St-Georges-lès-Baillargeaux (86)</span> -  <span className='underline decoration-pink-500 font-extrabold'>18 & 19 Juillet 2025</span>
          </h2>
         
          {/* Liste d'artistes défilante */}
          <ArtistList artists={artists} />
        </div>
        
        {/* Indicateur de scroll */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <svg
            className="h-8 w-8 text-white animate-bounce"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
          <span className="mt-2 text-xl text-white font-bold uppercase">
            Billeterie
          </span>
        </div>
      </div>
      
      {/* Contenu principal */}
      <main className="flex-grow bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="text-center mt-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Vivez l'expérience unique !
              </h2>
              <p className="mt-2 text-gray-600">
                Achetez vos tickets dès maintenant pour ne pas manquer le festival le plus attendu de l'année.
              </p>
              <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Acheter les tickets
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white shadow py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          © {new Date().getFullYear()} Les Closurades Festival. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}