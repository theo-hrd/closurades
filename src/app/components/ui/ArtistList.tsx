"use client";
import React from 'react';

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
  // Duplicate the list for continuous scrolling effect
  const duplicatedArtists = [...artists, ...artists];
  
  return (
    <div className="overflow-hidden w-full mt-32">
      <div className="flex whitespace-nowrap animate-scroll">
        {duplicatedArtists.map((artist, index) => (
          <span
            key={`${artist}-${index}`}
            className={`text-3xl font-bold ${textColor} px-6 py-3 uppercase tracking-wide relative group drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}
          >
            {artist}
            <span className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${gradientFrom} ${gradientTo} group-hover:w-full transition-all duration-300 ease-in-out`}></span>
          </span>
        ))}
      </div>
      {/* Animation CSS */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: inline-flex;
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}