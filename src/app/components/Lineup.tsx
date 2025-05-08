interface Artiste {
  id: number;
  nom: string;
  photo: string;
  genre: string;
  heure: string;
  origine: string;
}

interface ArtistesData {
  jour1: Artiste[];
  jour2: Artiste[];
}

const artistesData: ArtistesData = {
  jour1: [
    {
      id: 1,
      nom: 'Till', 
      photo: '/artists/till.jpg',
      genre: 'Jazz Fusion',
      heure: '20h00 - 20h45',
      origine: 'Poitiers - France'
    },
    {
      id: 2,
      nom: 'truc', 
      photo: '/artists/1.jpg',
      genre: 'Post Punk',
      heure: '20h00 - 20h45',
      origine: 'Toulouse - France'
    },
    {
      id: 3,
      nom: 'Artiste 3',
      photo: '/artists/1.jpg', 
      genre: 'Techno',
      heure: '23h00 - 2h00',
      origine: 'Toulouse - France'
    },
  ],
  jour2: [
    {
      id: 4,
      nom: 'Stonks', 
      photo: '/artists/stonks.jpg',
      genre: 'Post Punk | Post Rock | Alternative rock',
      heure: '20h00 - 20h45',
      origine: 'Bruxelles - Belgique'
    },
    {
      id: 5,
      nom: 'TWENTYHATE',
      photo: '/artists/twentyhate.png',
      genre: 'Schranz | Drum & Bass | Early Hardcore | Uptempo',
      heure: '23h00 - 2h00',
      origine: 'Toulouse - France'
    },
    {
      id: 6,
      nom: 'Artiste 5',
      photo: '/artists/1.jpg',
      genre: 'Rock',
      heure: '23h00 - 2h00',
      origine: 'Toulouse - France'
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

function CarteArtiste({ artiste }: { artiste: Artiste }) {
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
      className={`rounded-sm relative h-96 overflow-hidden transition-all duration-300 hover:scale-105 ${shadowClasses[color]}`}
      style={{
        backgroundImage: `url(${artiste.photo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
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

const JourSection = ({ jour, artistes }: { jour: string; artistes: Artiste[] }) => (
  <section className={`${jour === 'Vendredi 18' ? 'mb-16 md:mb-0' : ''} md:w-1/2`}>
    <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-600 to-purple-700 bg-clip-text text-transparent">
      {jour}
    </h3>
    <div className="grid grid-cols-1 gap-8">
      {artistes.map((artiste) => (
        <CarteArtiste key={artiste.id} artiste={artiste} />
      ))}
    </div>
  </section>
);

export default function Page() {
  return (
    <div id="lineup" className="bg-black scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="uppercase text-4xl font-bold text-center mb-24 bg-gradient-to-r from-red-600 to-purple-700 bg-clip-text text-transparent">
          Line-up
        </h2>
        <div className="uppercase md:flex md:space-x-8">
          <JourSection jour="Vendredi 18" artistes={artistesData.jour1} />
          {/* Ligne horizontale pour mobile */}
          <div className="block md:hidden">
            <div className="h-2 bg-gradient-to-b from-purple-700 to-red-600 my-8 rounded-full"></div>
          </div>

          {/* Ligne verticale pour desktop */}
          <div className="hidden md:flex md:items-center">
            <div className="w-2 h-full bg-gradient-to-b from-purple-700 to-red-600 rounded-full"></div>
          </div>
          <JourSection jour="Samedi 19" artistes={artistesData.jour2} />
        </div>
      </div>
    </div>
  );
}