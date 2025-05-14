"use client";

import { useState, useEffect } from 'react';

import { Artiste, ArtistesData } from '@/app/lib/types';

import { artistesData } from '@/app/lib/artistes';

// Pre-assign colors to ensure consistency between server and client
const artisteColors: Record<number, string> = {
  1: 'pink',
  2: 'blue',
  3: 'purple',
  4: 'red',
  5: 'green',
  6: 'pink',
  7: 'teal',
  8: 'orange',
  9: 'indigo',
  10: 'yellow'
};

// Ajouter une fonction pour obtenir des dégradés plus dynamiques
function getGradientOverlay(color: string): string {
  // Map colors to custom overlay gradients
  const overlays: Record<string, string> = {
    pink: 'from-black/70 via-black/55 to-pink-900/20',
    blue: 'from-black/70 via-black/55 to-blue-900/20',
    purple: 'from-black/70 via-black/55 to-purple-900/20',
    red: 'from-black/70 via-black/55 to-red-900/20',
    green: 'from-black/70 via-black/55 to-green-900/20',
    yellow: 'from-black/70 via-black/55 to-yellow-900/20',
    orange: 'from-black/70 via-black/55 to-orange-900/20',
    teal: 'from-black/70 via-black/55 to-teal-900/20',
    indigo: 'from-black/70 via-black/55 to-indigo-900/20'
  };
  
  // Return color-specific overlay or default if color not found
  return overlays[color] || 'from-black/70 via-black/55 to-black/40';
}

// Obtenir la classe CSS du dégradé de bordure selon la couleur de l'artiste
function getBorderGradient(color: string): string {
  const gradients: Record<string, string> = {
    pink: 'from-pink-500 to-purple-500',
    blue: 'from-blue-500 to-teal-500', 
    purple: 'from-purple-500 to-fuchsia-500',
    red: 'from-red-500 to-pink-500',
    green: 'from-green-500 to-teal-500',
    yellow: 'from-yellow-400 to-orange-500',
    orange: 'from-orange-500 to-rose-500',
    teal: 'from-teal-500 to-cyan-500',
    indigo: 'from-indigo-500 to-blue-500'
  };
  
  return gradients[color] || 'from-purple-500 to-fuchsia-500';
}

function ArtistPopup({ artiste, onClose }: { artiste: Artiste, onClose: () => void }) {
  const color = artisteColors[artiste.id] || 'purple';
  const gradientOverlay = getGradientOverlay(color);
  const borderGradient = getBorderGradient(color);
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`artist-popup-title-${artiste.id}`}
    >
      {/* Wrapper pour le contour en dégradé */}
      <div className="relative w-full max-w-2xl">
        {/* Contour en dégradé */}
        <div className={`absolute -inset-[2px] rounded-lg bg-gradient-to-r ${borderGradient}`}></div>
        
        {/* Contenu principal avec fond noir */}
        <div 
          className="relative w-full max-h-[90vh] bg-black rounded-lg overflow-hidden z-10 shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col">
            <div 
              className="relative aspect-video w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${artiste.photo})` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-t ${gradientOverlay}`}></div>
              <button 
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:bg-black"
                onClick={onClose}
                aria-label="Fermer les détails de l'artiste"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8 bg-black">
              <h2 id={`artist-popup-title-${artiste.id}`} className="text-3xl font-bold text-white mb-3 drop-shadow-sm">{artiste.nom}</h2>
              <div className="bg-black/80 p-4 mb-5 rounded-md backdrop-blur-sm">
                <p className="text-white mb-3">
                  <span className="font-semibold text-lg">{artiste.genre}</span>
                  {artiste.origine && <span className="text-gray-200"> | {artiste.origine}</span>}
                </p>
                <p className="text-white font-bold text-lg">{artiste.heure}</p>
              </div>
              {artiste.description && (
                <div className="mt-5 max-h-[30vh] overflow-y-auto">
                  <p className="text-gray-100 whitespace-pre-line text-base leading-relaxed">{artiste.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CarteArtiste({ artiste, onClick }: { artiste: Artiste, onClick: () => void }) {
  const color = artisteColors[artiste.id] || 'purple'; // Default to purple if id not found
  const gradientOverlay = getGradientOverlay(color);
  const borderGradient = getBorderGradient(color);
  
  return (
    <div className="relative w-full rounded-lg p-[3px] group">
      {/* Border container - only visible on hover */}
      <div className={`absolute inset-0 bg-gradient-to-r ${borderGradient} rounded-lg transition-opacity 
                       duration-300 opacity-0 group-hover:opacity-100`}>
      </div>
      
      <button 
        className="uppercase relative h-96 w-full overflow-hidden rounded-md
                  transition-transform duration-300 cursor-pointer text-left bg-black z-10"
        style={{
          backgroundImage: `url(${artiste.photo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        onClick={onClick}
        aria-label={`Voir les détails de ${artiste.nom}, ${artiste.genre}, ${artiste.heure}`}
      >
        {/* Overlay with neutral gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t ${gradientOverlay} transition-opacity duration-300 group-hover:opacity-60`}></div>
        
        <div className="relative h-full p-6 flex flex-col justify-end z-10">
          {/* Artistic name display with dynamic text shadow */}
          <h3 className={`text-2xl font-bold mx-auto text-center text-white transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]`}>
            {artiste.nom}
          </h3>
          
          <div className="transition-all duration-300 transform group-hover:translate-y-0 opacity-90 group-hover:opacity-100">
            <p className="mt-3 text-gray-100 text-center font-semibold text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">{artiste.genre}</p>
            <p className="mt-2 text-white text-center font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,1)]">{artiste.heure}</p>
            {artiste.origine && <p className="mt-2 text-gray-200 text-center text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">{artiste.origine}</p>}
          </div>
        </div>
      </button>
    </div>
  );
}

interface JourSectionProps {
  jour: string;
  artistes: Artiste[];
  isFirstDay?: boolean;
}

function JourSection({ jour, artistes, isFirstDay = false }: JourSectionProps) {
  const [selectedArtiste, setSelectedArtiste] = useState<Artiste | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Only enable client-side features after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className={`${isFirstDay ? 'mb-16 md:mb-0' : ''} md:w-1/2`}>
      <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-600 to-purple-700 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]">
        {jour}
      </h3>
      <div className="grid grid-cols-1 gap-8">
        {artistes.map((artiste) => (
          <CarteArtiste 
            key={artiste.id} 
            artiste={artiste} 
            onClick={() => isMounted && setSelectedArtiste(artiste)}
          />
        ))}
      </div>
      {isMounted && selectedArtiste && (
        <ArtistPopup 
          artiste={selectedArtiste} 
          onClose={() => setSelectedArtiste(null)} 
        />
      )}
    </section>
  );
}

export default function Page() {
  return (
    <div id="lineup" className="bg-black scroll-mt-32 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="uppercase text-4xl font-bold text-center mb-24 bg-gradient-to-r from-red-600 to-purple-700 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]">
          Line-up
        </h2>
        <div className="md:flex md:space-x-8">
          <JourSection 
            jour="Vendredi 18" 
            artistes={artistesData.j1} 
            isFirstDay={true} 
          />
          {/* Ligne horizontale pour mobile */}
          <div className="block md:hidden">
            <div className="h-2 bg-gradient-to-b from-purple-700 to-red-600 my-8 rounded-full"></div>
          </div>

          {/* Ligne verticale pour desktop */}
          <div className="hidden md:flex md:items-center">
            <div className="w-2 h-full bg-gradient-to-b from-purple-700 to-red-600 rounded-full"></div>
          </div>
          <JourSection 
            jour="Samedi 19" 
            artistes={artistesData.j2} 
            isFirstDay={false} 
          />
        </div>
      </div>
    </div>
  );
}