"use client";
import React from 'react';

export default function ArtistList({ artists }: Readonly<{ artists: string[] }>) {
  // Duplique la liste pour un effet de défilement continu
  const duplicatedArtists = [...artists, ...artists];
  
  return (
    <div className="overflow-hidden w-full mt-32">
      <div className="flex whitespace-nowrap animate-scroll">
        {duplicatedArtists.map((artist, index) => (
          <span
            key={index}
            className="text-3xl font-bold text-white px-6 py-3 uppercase tracking-wide relative group"
          >
            {artist}
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
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