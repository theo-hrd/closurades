import Image from 'next/image';
import ArtistList from './components/ArtistList';

export default function Home() {
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
      {/* Header avec navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-70 backdrop-blur-md shadow-lg">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-extrabold text-white">Les Closurades</h2>
          <ul className="flex space-x-6">
            <li><a href="#billeterie" className="text-white hover:text-gray-300 transition">Billeterie</a></li>
            <li><a href="#merch" className="text-white hover:text-gray-300 transition">Merch</a></li>
            <li><a href="#lineup" className="text-white hover:text-gray-300 transition">Line-up</a></li>
            <li><a href="#informations" className="text-white hover:text-gray-300 transition">Informations</a></li>
          </ul>
        </nav>
      </header>

      {/* Section Header avec image et overlay */}
      <div className="relative h-screen">
        <Image
          src="/background.jpg"
          alt="Image de fond pour le festival"
          layout="fill"
          objectFit="cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        
        {/* Titre centré */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            Les Closurades Festival
          </h1>
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
          <span className="mt-2 text-white font-medium">
            Défilez pour voir les tickets
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
