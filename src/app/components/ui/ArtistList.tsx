"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { ARTIST_LINKS } from '@/app/lib/constants';

// Define a type for color combinations
interface ColorCombination {
  text: string;
  from: string;
  to: string;
}

interface ArtistListProps {
  artists: string[];
  textColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  artistLinks?: Record<string, string>;
}

export default function ArtistList({ 
  artists,
  textColor = "text-white",
  gradientFrom = "from-pink-500",
  gradientTo = "to-purple-500",
  artistLinks = ARTIST_LINKS 
}: Readonly<ArtistListProps>) {
  const [mounted, setMounted] = useState(false);
  const [artistColors, setArtistColors] = useState<Record<string, ColorCombination>>({});

  // Predefined color combinations for variety - wrapped in useMemo to prevent recreating on every render
  const colorCombinations = useMemo<ColorCombination[]>(() => [
    // Originaux
    { text: 'text-pink-200', from: 'from-pink-500', to: 'to-purple-500' },
    { text: 'text-blue-200', from: 'from-blue-500', to: 'to-teal-500' },
    { text: 'text-amber-200', from: 'from-amber-500', to: 'to-red-500' },
    { text: 'text-emerald-200', from: 'from-emerald-500', to: 'to-blue-500' },
    { text: 'text-violet-200', from: 'from-violet-500', to: 'to-fuchsia-500' },
    { text: 'text-rose-200', from: 'from-rose-500', to: 'to-orange-500' },
    { text: 'text-cyan-200', from: 'from-cyan-600', to: 'to-indigo-500' },
    { text: 'text-lime-200', from: 'from-lime-500', to: 'to-emerald-600' },
    { text: 'text-indigo-200', from: 'from-indigo-500', to: 'to-violet-500' },
    { text: 'text-orange-200', from: 'from-orange-500', to: 'to-rose-500' },
    { text: 'text-teal-200', from: 'from-teal-500', to: 'to-sky-500' },
    { text: 'text-red-200', from: 'from-red-500', to: 'to-pink-500' },
    { text: 'text-fuchsia-200', from: 'from-fuchsia-500', to: 'to-blue-500' },
    { text: 'text-yellow-200', from: 'from-yellow-400', to: 'to-amber-600' },
    { text: 'text-purple-200', from: 'from-purple-500', to: 'to-pink-500' },
    
    // Nouvelles combinaisons
    { text: 'text-sky-200', from: 'from-sky-500', to: 'to-violet-500' },
    { text: 'text-green-200', from: 'from-green-500', to: 'to-teal-500' },
    { text: 'text-amber-100', from: 'from-amber-300', to: 'to-orange-600' },
    { text: 'text-slate-200', from: 'from-slate-500', to: 'to-blue-600' },
    { text: 'text-pink-100', from: 'from-pink-400', to: 'to-indigo-500' },
    { text: 'text-blue-100', from: 'from-blue-400', to: 'to-purple-600' },
    { text: 'text-emerald-100', from: 'from-emerald-400', to: 'to-cyan-600' },
    { text: 'text-violet-100', from: 'from-violet-400', to: 'to-pink-600' },
    { text: 'text-orange-100', from: 'from-orange-400', to: 'to-amber-600' },
    
    // Combinaisons plus vives/contrastées
    { text: 'text-red-100', from: 'from-red-600', to: 'to-yellow-500' },
    { text: 'text-lime-100', from: 'from-lime-600', to: 'to-emerald-500' },
    { text: 'text-cyan-100', from: 'from-cyan-500', to: 'to-blue-600' },
    { text: 'text-fuchsia-100', from: 'from-fuchsia-600', to: 'to-purple-600' },
    { text: 'text-rose-100', from: 'from-rose-600', to: 'to-pink-600' },
    
    // Combinaisons électro/néon
    { text: 'text-purple-100', from: 'from-purple-600', to: 'to-cyan-400' },
    { text: 'text-pink-100', from: 'from-pink-600', to: 'to-lime-400' },
    { text: 'text-indigo-100', from: 'from-indigo-600', to: 'to-green-400' },
    { text: 'text-blue-100', from: 'from-blue-600', to: 'to-yellow-400' },
    
    // Combinaisons pastel
    { text: 'text-red-50', from: 'from-red-300', to: 'to-pink-300' },
    { text: 'text-blue-50', from: 'from-blue-300', to: 'to-purple-300' },
    { text: 'text-green-50', from: 'from-green-300', to: 'to-teal-300' },
    { text: 'text-orange-50', from: 'from-orange-300', to: 'to-amber-300' },
    
    // Combinaisons sombres mais vibrantes
    { text: 'text-yellow-200', from: 'from-yellow-500', to: 'to-orange-800' },
    { text: 'text-lime-200', from: 'from-lime-500', to: 'to-green-800' },
    { text: 'text-teal-200', from: 'from-teal-500', to: 'to-blue-800' },
    { text: 'text-violet-200', from: 'from-violet-500', to: 'to-indigo-800' },
    
    // Nouvelles combinaisons électriques et festives
    { text: 'text-white', from: 'from-yellow-400', to: 'to-red-600' }, // Orange électrique
    { text: 'text-white', from: 'from-fuchsia-500', to: 'to-pink-600' }, // Rose vif
    { text: 'text-white', from: 'from-emerald-400', to: 'to-sky-500' }, // Turquoise brillant
    { text: 'text-white', from: 'from-violet-600', to: 'to-purple-800' }, // Violet profond
    { text: 'text-white', from: 'from-lime-300', to: 'to-green-600' }, // Vert acidulé
    { text: 'text-yellow-100', from: 'from-amber-500', to: 'to-red-600' }, // Feu
    { text: 'text-blue-100', from: 'from-blue-500', to: 'to-indigo-800' }, // Bleu profond
    { text: 'text-purple-100', from: 'from-indigo-500', to: 'to-fuchsia-600' }, // Indigo-fuchsia
    
    // Dégradés contrastés pour festival
    { text: 'text-white', from: 'from-rose-500', to: 'to-yellow-500' }, // Sunset
    { text: 'text-white', from: 'from-purple-600', to: 'to-pink-400' }, // Néon violet
    { text: 'text-white', from: 'from-green-500', to: 'to-lime-300' }, // Vert flashy
    { text: 'text-white', from: 'from-red-600', to: 'to-amber-400' }, // Rouge-orange
    { text: 'text-white', from: 'from-blue-600', to: 'to-cyan-400' }, // Bleu électrique
    
    // Combinaisons festives extrêmes
    { text: 'text-yellow-100', from: 'from-purple-600', to: 'to-orange-500' }, // Disco
    { text: 'text-green-100', from: 'from-blue-600', to: 'to-lime-400' }, // Bleu-vert
    { text: 'text-purple-100', from: 'from-fuchsia-600', to: 'to-red-500' }, // Pink punch
    { text: 'text-teal-100', from: 'from-emerald-500', to: 'to-blue-500' }, // Ocean flow
    { text: 'text-rose-100', from: 'from-rose-600', to: 'to-amber-400' }, // Sunset Glow
    
    // Combinaisons Fluo Festival
    { text: 'text-white', from: 'from-pink-500', to: 'to-yellow-400' },      // Rose fluo
    { text: 'text-white', from: 'from-purple-600', to: 'to-blue-400' },      // Violet brillant
    { text: 'text-white', from: 'from-green-400', to: 'to-yellow-300' },     // Vert citron
    { text: 'text-indigo-100', from: 'from-indigo-700', to: 'to-blue-400' }, // Bleu roi
    { text: 'text-red-100', from: 'from-red-700', to: 'to-rose-400' },       // Rouge profond
    
    // Tons Métalliques
    { text: 'text-slate-100', from: 'from-slate-700', to: 'to-slate-400' },   // Argent
    { text: 'text-yellow-100', from: 'from-yellow-600', to: 'to-amber-400' }, // Or
    { text: 'text-orange-100', from: 'from-orange-700', to: 'to-amber-500' }, // Cuivre
    { text: 'text-blue-100', from: 'from-blue-700', to: 'to-gray-400' },      // Acier bleu
    { text: 'text-rose-100', from: 'from-rose-600', to: 'to-pink-300' },      // Rose gold
    
    // Dégradés Cosmiques
    { text: 'text-white', from: 'from-purple-800', to: 'to-purple-400' },        // Galaxie
    { text: 'text-white', from: 'from-blue-900', to: 'to-indigo-400' },          // Nuit étoilée
    { text: 'text-white', from: 'from-cyan-600', to: 'to-blue-900' },            // Océan profond
    { text: 'text-white', from: 'from-pink-600', to: 'to-purple-900' },          // Nébuleuse
    { text: 'text-white', from: 'from-rose-400', to: 'to-orange-700' },          // Soleil couchant
    
    // Dégradés Spectraux
    { text: 'text-white', from: 'from-red-600', to: 'to-blue-600' },             // Rouge-Bleu
    { text: 'text-white', from: 'from-green-500', to: 'to-purple-600' },         // Vert-Violet
    { text: 'text-white', from: 'from-yellow-400', to: 'to-teal-600' },          // Jaune-Bleu-vert
    { text: 'text-white', from: 'from-orange-500', to: 'to-indigo-600' },        // Orange-Indigo
    { text: 'text-white', from: 'from-lime-400', to: 'to-fuchsia-600' },         // Vert acide-Fuchsia
    
    // Combinaisons Technicolor
    { text: 'text-white', from: 'from-cyan-400', to: 'to-red-500' },             // Cyan-Rouge
    { text: 'text-white', from: 'from-rose-500', to: 'to-blue-500' },            // Rose-Bleu
    { text: 'text-white', from: 'from-amber-400', to: 'to-purple-600' },         // Ambre-Violet
    { text: 'text-white', from: 'from-emerald-400', to: 'to-pink-600' },         // Émeraude-Rose
    { text: 'text-white', from: 'from-violet-500', to: 'to-amber-400' },         // Violet-Ambre
    
    // Styles Zébrés/Multicolores
    { text: 'text-white', from: 'from-red-500 via-yellow-400', to: 'to-red-500' },   // Rouge-Jaune-Rouge
    { text: 'text-white', from: 'from-blue-500 via-green-400', to: 'to-blue-500' },  // Bleu-Vert-Bleu
    { text: 'text-white', from: 'from-purple-500 via-pink-400', to: 'to-purple-500' }, // Violet-Rose-Violet
    { text: 'text-white', from: 'from-green-500 via-blue-400', to: 'to-green-500' }, // Vert-Bleu-Vert
    { text: 'text-white', from: 'from-pink-500 via-blue-400', to: 'to-yellow-400' }, // Arc-en-ciel
    
    // Dégradés Exotiques
    { text: 'text-white', from: 'from-rose-600', to: 'to-purple-400' },          // Flamant rose
    { text: 'text-white', from: 'from-lime-500', to: 'to-cyan-400' },            // Tropical
    { text: 'text-white', from: 'from-amber-600', to: 'to-rose-400' },           // Coucher de soleil
    { text: 'text-white', from: 'from-purple-500', to: 'to-lime-300' },          // Festival
    { text: 'text-white', from: 'from-violet-600', to: 'to-emerald-400' },       // Paon
    
    // Combinaisons Rétro
    { text: 'text-white', from: 'from-purple-600', to: 'to-amber-400' },         // Disco 70s
    { text: 'text-white', from: 'from-cyan-500', to: 'to-pink-400' },            // Miami Vice
    { text: 'text-white', from: 'from-indigo-500', to: 'to-emerald-400' },       // Synth wave
    { text: 'text-white', from: 'from-orange-600', to: 'to-amber-400' },         // 70s orange
    { text: 'text-white', from: 'from-pink-500', to: 'to-blue-400' },            // Bubblegum pop
    
    // Effets Intensifiés
    { text: 'text-white font-extrabold', from: 'from-red-600', to: 'to-red-400' },             // Rouge intense
    { text: 'text-white font-extrabold', from: 'from-blue-600', to: 'to-blue-400' },           // Bleu intense
    { text: 'text-white font-extrabold', from: 'from-green-600', to: 'to-green-400' },         // Vert intense
    { text: 'text-white font-extrabold', from: 'from-purple-600', to: 'to-purple-400' },       // Violet intense
    { text: 'text-white font-extrabold', from: 'from-yellow-500', to: 'to-yellow-300' },       // Jaune intense
  ], []);
  
  useEffect(() => {
    setMounted(true);
    
    // Generate random color assignments for all artists
    const colorAssignments: Record<string, ColorCombination> = {};
    
    // Pour garantir que chaque artiste obtient une couleur différente,
    // nous allons d'abord mélanger le tableau de combinaisons
    const shuffledCombinations = [...colorCombinations]
      .sort(() => Math.random() - 0.5)
      .slice(0, artists.length);
    
    // Ensuite, nous assignons ces combinaisons uniques aux artistes
    artists.forEach((artist, index) => {
      colorAssignments[artist] = shuffledCombinations[index % shuffledCombinations.length];
    });
    
    setArtistColors(colorAssignments);
    
    // Add randomized animation timing for entrance animations
    const elements = document.querySelectorAll('.artist-item');
    elements.forEach((el) => {
      const element = el as HTMLElement;
      
      // Random delay for entrance animation
      const entranceDelay = 0.1 + (Math.random() * 0.4);
      element.style.animationDelay = `${entranceDelay}s`;
      
      // Add subtle wobble animation
      const wobbleDelay = (Math.random() * 2);
      const wobbleDuration = 3 + (Math.random() * 1.5);
      
      // Create keyframes for the wobble effect
      const keyframes = [
        { transform: 'rotate(0deg) translateX(0px)' },
        { transform: 'rotate(-0.3deg) translateX(-1px)' },
        { transform: 'rotate(0.3deg) translateX(1px)' },
        { transform: 'rotate(-0.3deg) translateX(-1px)' },
        { transform: 'rotate(0deg) translateX(0px)' }
      ];
      
      // Set animation options
      const options = {
        duration: wobbleDuration * 1000,
        iterations: Infinity,
        delay: wobbleDelay * 1000,
        easing: 'ease-in-out'
      };
      
      // Add animation after entrance animation completes
      setTimeout(() => {
        const artistElement = element.querySelector('a');
        if (artistElement) {
          artistElement.animate(keyframes, options);
        }
      }, 800 + entranceDelay * 1000);
    });
  }, [artists, colorCombinations]);

  // Get a unique animation for each artist for variety
  const getAnimation = (index: number) => {
    const animations = [
      'fade-in-up',
      'fade-in-right',
      'fade-in-left',
      'fade-in-scale',
      'fade-in-bounce'
    ];
    return animations[index % animations.length];
  };
  
  return (
    <div className="w-full mt-8 md:mt-16">
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 w-full">
        {artists.map((artist, index) => {
          // Use the randomly assigned color for this artist
          const colorCombo = artistColors[artist] || { 
            text: textColor, 
            from: gradientFrom, 
            to: gradientTo 
          };
          
          // Get the link for this artist
          const artistLink = artistLinks[artist] || '#';
          
          return (
            <div 
              key={`${artist}-${index}`}
              className={`artist-item text-center transition-all duration-500 opacity-0 ${mounted ? getAnimation(index) : ''}`}
            >
              <a 
                href={artistLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  font-bold ${colorCombo.text} uppercase tracking-wide py-1 px-6
                  text-xl sm:text-2xl md:text-3xl lg:text-4xl
                  flex items-center justify-center
                  relative group
                  drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]
                  transition-all duration-500
                  hover:scale-110 hover:rotate-1
                  hover:text-white
                  text-glow
                  cursor-pointer
                  whitespace-nowrap
                  no-underline
                `}
              >
                {artist}
                <span className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${colorCombo.from} ${colorCombo.to} group-hover:w-full transition-all duration-300 ease-in-out`}></span>
              </a>
            </div>
          );
        })}
      </div>
      
      {/* Animation CSS */}
      <style jsx>{`
        .fade-in-up {
          animation: fadeInUp 0.8s ease forwards;
        }
        
        .fade-in-right {
          animation: fadeInRight 0.8s ease forwards;
        }
        
        .fade-in-left {
          animation: fadeInLeft 0.8s ease forwards;
        }
        
        .fade-in-scale {
          animation: fadeInScale 0.8s ease forwards;
        }
        
        .fade-in-bounce {
          animation: fadeInBounce 0.8s ease forwards;
        }
        
        .text-glow {
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.3), 0 0 15px rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        
        .text-glow:hover {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.2);
          cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🎵</text></svg>") 16 0, pointer;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fadeInBounce {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          40% {
            opacity: 0.6;
            transform: scale(1.1);
          }
          60% {
            opacity: 0.8;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}