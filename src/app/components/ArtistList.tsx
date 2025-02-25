"use client";

import React from 'react'

export default function ArtistList({ artists: artists }: Readonly<{ artists: string[] }>) {
// Duplique la liste pour un effet de défilement continu
const duplicatedArtists = [...artists, ...artists];

return (
  <div className="overflow-hidden w-full mt-32">
    <div className="flex whitespace-nowrap animate-scroll">
      {duplicatedArtists.map((artist, index) => (
        <span
          key={index}
          className="mx-6 text-3xl font-bold text-whit px-6 py-3 shadow-lg uppercase tracking-wide"
        >
          {artist}
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
    `}</style>
  </div>
);
}
