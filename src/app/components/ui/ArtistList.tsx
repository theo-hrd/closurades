"use client";
import React, { useEffect, useState, useMemo } from 'react';

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
}

export default function ArtistList({ 
  artists,
  textColor = "text-white",
  gradientFrom = "from-pink-500",
  gradientTo = "to-purple-500" 
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
    { text: 'text-violet-200', from: 'from-violet-500', to: 'to-indigo-800' }
  ], []);
  
  useEffect(() => {
    setMounted(true);
    
    // Generate random color assignments for all artists
    const colorAssignments: Record<string, ColorCombination> = {};
    artists.forEach((artist) => {
      // Get truly random color for each artist
      const randomIndex = Math.floor(Math.random() * colorCombinations.length);
      colorAssignments[artist] = colorCombinations[randomIndex];
    });
    
    setArtistColors(colorAssignments);
    
    // Add randomized animation timing for entrance animations
    const elements = document.querySelectorAll('.artist-item');
    elements.forEach((el) => { // use underscore to indicate deliberately unused parameter
      const element = el as HTMLElement;
      
      // Random delay for entrance animation
      const entranceDelay = 0.1 + (Math.random() * 0.4);
      element.style.animationDelay = `${entranceDelay}s`;
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
    <div className="w-full mt-8 sm:mt-16 md:mt-32">
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-7xl mx-auto px-4">
        {artists.map((artist, index) => {
          // Use the randomly assigned color for this artist
          const colorCombo = artistColors[artist] || { 
            text: textColor, 
            from: gradientFrom, 
            to: gradientTo 
          };
          
          return (
            <div 
              key={`${artist}-${index}`}
              className={`artist-item text-center transition-all duration-500 opacity-0 ${mounted ? getAnimation(index) : ''}`}
            >
              <div 
                className={`
                  font-bold ${colorCombo.text} uppercase tracking-wide py-1 px-2
                  text-2xl sm:text-3xl md:text-5xl lg:text-6xl
                  flex items-center justify-center
                  relative group
                  drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]
                  transition-all duration-500
                  hover:scale-110 hover:rotate-1
                  hover:text-white
                  text-glow
                  cursor-pointer
                `}
              >
                {artist}
                <span className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${colorCombo.from} ${colorCombo.to} group-hover:w-full transition-all duration-300 ease-in-out`}></span>
              </div>
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