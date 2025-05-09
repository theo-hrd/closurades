"use client";

import { useState, useEffect } from 'react';

import { Artiste, ArtistesData } from '@/app/lib/types';

const artistesData: ArtistesData = {
  j1: [
    {
      id: 1,
      nom: "Till'", 
      photo: '/artists/till.jpg',
      genre: 'Stoner Rock | Jazz | Groove',
      heure: '21h30 - 22h30',
      origine: 'Poitiers - France',
      description: `2022, Tom Ranson et Baudouin Salembier ont formé le groupe musical Till', aujourd’hui composé d'un guitariste, d'un saxophoniste, d'un bassiste et d'un batteur.
                    L'arrivée de Pierre-Antoine Clion, bassiste du groupe, a permis de réunir trois membres ayant une longue histoire commune, mais n'ayant jamais exploré leur connexion musicale en tant que trio En octobre 2023, lors du bal du chahut organisé par l’association Warp Unchained, le saxophoniste Hicham El Mansouri s'est joint au groupe pour jouer sur leur set.
                    Cette collaboration a enrichi de façon significative la musique du groupe, en apportant des mélodies envoûtantes se mêlant au jeu de guitare de Tom et à la rythmique complexe jouée par Baudouin et Pierre-Antoine. Leur rencontre a été une évidence, contribuant ainsi à créer une grande osmose musicale.`
    },
    {
      id: 2,
      nom: 'TRIFOUILLE1ER',
      photo: '/artists/Trifouille1er.png', 
      genre: 'Musique électronique modulaire',
      heure: '23h00 - 00h00',
      origine: '',
      description: `Fils et filtres, Radios et magnétos, Grande fêtes et tintamarre, Turbulences électroniques, Insouciance majestueuse, Antennes et potentiomètres, Modulations aléatoires, Commandes rectilignes, Hommes-pumas et bottes magiques, Générateur d'agréable, Télécommandes et parasites, Saturations et décodeurs, Grande Maison du Strobe, Laboratoire de séquences, Oscilloscopes et ondulations, Fantômes et trains de nuit.`
    },
    {
      id: 3,
      nom: 'PRPHTXIV & TSHIMBOMBO', 
      photo: '/artists/julien.png',
      genre: 'House | Dub | Techno',
      heure: '00h30 - 01h30',
      origine: 'Poitiers - France',
      description: ``
    },
    {
      id: 4,
      nom: 'LARSEN',
      photo: '/artists/larsen.png',
      genre: 'Techno | Hard Techno',
      heure: '02h30 - 04h00',
      origine: 'Poitiers - France',
      description: `LARSEN est le président et fondateur du collectif Badmood, aujourd’hui reconnu comme un acteur majeur de la scène Techno et Hard Music locale.
                    DJ passionné et engagé, il se distingue par une approche sans concession du mix, où l’éclectisme est poussé à l’outrance.
                    Ses sets fusionnent les styles avec audace en passant par des classiques détournés et des surprises inattendues.
                    Résolument instinctif et imprévisible, LARSEN aime jouer avec les codes, quitte à troller son public en glissant volontairement des morceaux inattendus ou complètement décalés dans ses sets.
                    Amateur de contrastes et de chaos maîtrisé, il cultive l’art de la surprise et de la tension, créant des montagnes russes sonores entre intensité brute et clins d’œil malicieux.
                    Fort d’une solide expérience en tant que DJ généraliste, il maîtrise les dynamiques de dancefloor sur le bout des doigts, ce qui lui permet d’embarquer tout type de public, du plus pointu au plus festif.`
    },
  ],
  j2: [
    {
      id: 5,
      nom: 'Sun Gazol', 
      photo: '/artists/sungazol.jpg',
      genre: 'Pop Folk',
      heure: '20h30 - 21h30',
      origine: '',
      description: `Sun Gazol propose une pop folk organique et aérienne, où la folk se mêle aux atmosphères pop et psychédéliques.
                    Inspiré par des artistes comme Radiohead, Nick Drake, Half Moon Run ou Tame Impala, le groupe compose une musique immersive et envoûtante.
                    Ses quatre musicien·nes plongent l'auditeur·rice dans un océan onirique, où les textures riches des synthétiseurs et des rythmes se fondent dans les vagues intimistes des guitares électriques et acoustiques.`
    },
    {
      id: 6,
      nom: 'Stonks', 
      photo: '/artists/stonks.jpg',
      genre: 'Post Punk | Post Rock | Alternative rock',
      heure: '21h30 - 22h45',
      origine: 'Bruxelles - Belgique',
      description: `Formé en 2021 par quatre musiciens attirés par la création originale et alternative, Stonks est un groupe indé Bruxellois. Ils sont inspiré par le rock, le jazz, le brouahahah désinvolte, les valses cassées, tous types de musiques pour cheveux longs, et surtout par la nouvelle scène post-punk anglaise, tirée au lasso par squid, shame et les viagra boys qui font parler d'eux depuis quelques années.`
    },
    {
      id: 7,
      nom: "C'EST ELLE AIME",
      photo: '/artists/CLM.jpg',
      genre: 'Mood House | Electro-Acid | Techno Industrial | Dub',
      heure: '22h45 - 00h00',
      origine: 'Poitiers - France',
      description: `Plongez dans l'univers cosmique et cyberpunk des protagonistes C'est Elle et Aime grace à leurs aventures retrouvés sous format audio. Genres musicaux diagnostiqués : mood house, electro-acid, techno indus/DUB.`
    },
    {
      id: 8,
      nom: "TOOFOULK",
      photo: '/artists/1.jpg',
      genre: 'Jungle | Drum and Bass | Neuro',
      heure: '00h15 - 01h45',
      origine: 'Poitiers - France',
      description: ``
    },
    {
      id: 9,
      nom: "Akae",
      photo: '/artists/1.jpg',
      genre: 'Hard Techno',
      heure: '01h45 - 02h45',
      origine: 'Toulouse - France',
      description: ``
    },
    {
      id: 10,
      nom: 'TWENTYHATE',
      photo: '/artists/twentyhate.png',
      genre: 'Hard Music | Early Hardcore | Uptempo',
      heure: '02h45 - 05h00',
      origine: 'Toulouse - France',
      description: `TWENTYHATE vous entraîne dans un voyage sans concession : des atmosphères rugueuses de l’early hardcore aux déflagrations de kicks rythmés de l’uptempo.
                    Sur scène, chaque transition est un choc, chaque drop une explosion. Entre samples distordus, kicks surpuissants et breaks affûtés, il orchestre un véritable carnage auditif où l’on ne s’autorise aucun répit. Son objectif ? Faire découvrir au public des sonorités extrêmes tout en lâchant prise, et offrir une expérience live immersive, presque violente, mais toujours dans un esprit de joyeuseté.`
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
  const color = artisteColors[artiste.id] || 'purple'; // Default to purple if id not found
  
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
      className={`uppercase rounded-sm relative h-96 overflow-hidden transition-all duration-300 hover:scale-105 ${shadowClasses[color]} cursor-pointer`}
      style={{
        backgroundImage: `url(${artiste.photo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-black/50"></div>
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