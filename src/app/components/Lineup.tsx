"use client";

import { useState, useEffect } from 'react';

interface Artiste {
  id: number;
  nom: string;
  photo: string;
  genre: string;
  heure: string;
  origine: string;
  description: string;
}

interface ArtistesData {
  a1: Artiste[];
  a2: Artiste[];
}

const artistesData: ArtistesData = {
  a1: [
    {
      id: 1,
      nom: 'Till', 
      photo: '/artists/till.jpg',
      genre: 'Jazz Fusion',
      heure: '20h00 - 20h45',
      origine: 'Poitiers - France',
      description: 'Till est un artiste de Jazz Fusion basé à Poitiers. Avec son style unique mêlant jazz traditionnel et sonorités modernes, il propose une expérience musicale immersive et innovante.'
    },
    {
      id: 2,
      nom: 'truc', 
      photo: '/artists/1.jpg',
      genre: 'Post Punk',
      heure: '20h00 - 20h45',
      origine: 'Toulouse - France',
      description: 'Truc est un groupe de Post Punk toulousain qui repousse les limites du genre avec des compositions envoûtantes et une énergie scénique débordante.'
    },
    {
      id: 3,
      nom: 'Artiste 3',
      photo: '/artists/1.jpg', 
      genre: 'Techno',
      heure: '23h00 - 2h00',
      origine: 'Toulouse - France',
      description: 'Artiste 3 est un DJ techno reconnu pour ses sets hypnotiques qui emmènent le public dans un voyage sonore aux frontières de la techno underground.'
    },
  ],
  a2: [
    {
      id: 4,
      nom: 'Stonks', 
      photo: '/artists/stonks.jpg',
      genre: 'Post Punk | Post Rock | Alternative rock',
      heure: '20h00 - 20h45',
      origine: 'Bruxelles - Belgique',
      description: 'Stonks est un groupe belge qui fusionne post-punk, post-rock et rock alternatif pour créer un son distinctif et captivant. Leur musique évoque des paysages sonores complexes et émotionnels.'
    },
    {
      id: 5,
      nom: 'TWENTYHATE',
      photo: '/artists/twentyhate.png',
      genre: 'Schranz | Drum & Bass | Early Hardcore | Uptempo',
      heure: '23h00 - 2h00',
      origine: 'Toulouse - France',
      description: 'TWENTYHATE est un projet électronique toulousain qui mélange schranz, drum & bass, early hardcore et uptempo. Ses performances sont intenses et énergiques, créant une ambiance unique sur le dancefloor.'
    },
    {
      id: 6,
      nom: 'Artiste 5',
      photo: '/artists/1.jpg',
      genre: 'Rock',
      heure: '23h00 - 2h00',
      origine: 'Toulouse - France',
      description: 'Artiste 5 propose un rock authentique et puissant, avec des mélodies accrocheuses et des paroles réfléchies qui résonnent avec le public.'
    },
  ]
};

// Pre-assign colors to ensure consistency between server and client
const artisteColors: Record<number, string> = {
  1: 'pink',
  2: 'blue',
  3: 'purple',
  4: 'red',
  5: 'green',
  6: 'pink'
};

function ArtistPopup({ artiste, onClose }: { artiste: Artiste, onClose: () => void }) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-md"
        onClick={e => e.stopPropagation()}
      >
        <div 
          className="relative aspect-video w-full rounded-t-md bg-cover bg-center"
          style={{ backgroundImage: `url(${artiste.photo})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <button 
            className="absolute top-2 right-2 p-2 rounded-full bg-black/70 text-white hover:bg-black"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="bg-black p-6 rounded-b-md">
          <h2 className="text-3xl font-bold text-white mb-2">{artiste.nom}</h2>
          <p className="text-gray-400 mb-4">
            <span className="font-semibold">{artiste.genre}</span> | {artiste.origine}
          </p>
          <p className="text-gray-200 mb-2 font-bold">{artiste.heure}</p>
          <p className="text-gray-300 leading-relaxed">{artiste.description}</p>
        </div>
      </div>
    </div>
  );
}

function CarteArtiste({ artiste, onClick }: { artiste: Artiste, onClick: () => void }) {
  const color = artisteColors[artiste.id] || 'pink'; // Default to pink if id not found
  
  const shadowClasses: Record<string, string> = {
    pink: 'hover:shadow-[0_10px_15px_rgba(236,72,153,0.3)]',
    blue: 'hover:shadow-[0_10px_15px_rgba(59,130,246,0.3)]',
    purple: 'hover:shadow-[0_10px_15px_rgba(168,85,247,0.3)]',
    red: 'hover:shadow-[0_10px_15px_rgba(239,68,68,0.3)]',
    green: 'hover:shadow-[0_10px_15px_rgba(34,197,94,0.3)]',
    yellow: 'hover:shadow-[0_10px_15px_rgba(234,179,8,0.3)]',
    orange: 'hover:shadow-[0_10px_15px_rgba(249,115,22,0.3)]',
    teal: 'hover:shadow-[0_10px_15px_rgba(20,184,166,0.3)]',
    indigo: 'hover:shadow-[0_10px_15px_rgba(99,102,241,0.3)]'
  };

  return (
    <div 
      className={`rounded-sm relative h-96 overflow-hidden transition-all duration-300 hover:scale-105 ${shadowClasses[color]} cursor-pointer`}
      style={{
        backgroundImage: `url(${artiste.photo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative h-full p-6 flex flex-col justify-end">
        <h3 className="text-2xl font-bold mx-auto text-center text-white shadow-xl">
          {artiste.nom}
        </h3>
        <p className="mt-2 text-gray-400 text-center font-semibold text-sm">{artiste.genre}</p>
        <p className="mt-2 text-gray-300 text-center font-bold">{artiste.heure}</p>
        <p className="mt-2 text-gray-400 text-center text-sm">{artiste.origine}</p>
      </div>
    </div>
  );
}

interface JourSectionProps {
  jour: string;
  artistes: Artiste[];
  isFirstDay?: boolean;
}

const JourSection = ({ jour, artistes, isFirstDay = false }: JourSectionProps) => {
  const [selectedArtiste, setSelectedArtiste] = useState<Artiste | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Only enable client-side features after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className={`${isFirstDay ? 'mb-16 md:mb-0' : ''} md:w-1/2`}>
      <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-600 to-purple-700 bg-clip-text text-transparent">
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
};

export default function Page() {
  return (
    <div id="lineup" className="bg-black scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="uppercase text-4xl font-bold text-center mb-24 bg-gradient-to-r from-red-600 to-purple-700 bg-clip-text text-transparent">
          Line-up
        </h2>
        <div className="uppercase md:flex md:space-x-8">
          <JourSection 
            jour="Vendredi 18" 
            artistes={artistesData.a1} 
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
            artistes={artistesData.a2} 
            isFirstDay={false} 
          />
        </div>
      </div>
    </div>
  );
}