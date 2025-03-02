"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ArtistList from "./components/ui/ArtistList";
import TicketButton from "./components/ui/TicketButton";
import Lineup from "./components/features/Lineup";
import Merch from "./components/features/Merch";
import Informations from "./components/features/Informations";

import { 
  FESTIVAL_NAME, 
  FESTIVAL_LOCATION, 
  FESTIVAL_DATES, 
  ARTISTS, 
  BACKGROUND_IMAGES 
} from "./lib/constants";

// Separate component for Hero section to improve organization
function HeroSection({ onScrollToBilleterie }: { onScrollToBilleterie: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Effect for automatically scrolling images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen" id="closurades">
      {/* Image carousel */}
      <div className="absolute inset-0 overflow-hidden">
        {BACKGROUND_IMAGES.map((src, index) => (
          <div
            key={`bg-image-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`Festival background ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover w-full h-full transform scale-105 hover:scale-100 transition-transform duration-10000"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Centered title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          {FESTIVAL_NAME}
        </h1>
        <h2 className="mt-8 text-xl sm:text-3xl text-white drop-shadow-lg opacity-0 animate-fade-in-up">
          <span className="font-bold">
            {FESTIVAL_LOCATION}
          </span>
          <br /> <br />
          <span className="underline decoration-pink-500 font-extrabold text-3xl">
            {FESTIVAL_DATES}
          </span>
        </h2>

        {/* Updated artist list with grid layout */}
        <ArtistList 
          artists={ARTISTS}
          highlightColor="bg-gradient-to-r from-pink-500 to-fuchsia-500"
          backgroundColor="bg-black/40"
          dividerColor="border-pink-500/30"
        />
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-300"
        onClick={onScrollToBilleterie}
      >
        <svg
          className="h-10 w-10 text-orange-600 animate-bounce"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <span className="mt-2 text-xl font-bold uppercase bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Billeterie
        </span>
      </div>
    </div>
  );
}

// Separate component for the Tickets section
function TicketsSection({ isVisible, forwardedRef }: { isVisible: boolean; forwardedRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div
      id="billeterie"
      ref={forwardedRef}
      className={`min-h-screen py-32 max-w-7xl mx-auto sm:px-6 lg:px-8 transition-all duration-1000 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <div className="px-4 py-6 sm:px-0">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent uppercase">
            Billeterie
          </h2>
          <p className="mt-4 text-lg max-w-2xl text-center mx-auto text-black">
            Achetez vos tickets dès maintenant !
          </p>
          <TicketButton />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const billeterieRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for animation when scrolling to tickets section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const currentRef = billeterieRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Function to handle scrolling to tickets section
  const scrollToBilleterie = () => {
    if (billeterieRef.current) {
      billeterieRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with image carousel */}
      <HeroSection onScrollToBilleterie={scrollToBilleterie} />

      {/* Main content */}
      <main className="flex-grow bg-white">
        {/* Tickets Section */}
        <TicketsSection isVisible={isVisible} forwardedRef={billeterieRef} />

        {/* Line-up Section */}
        <div id="lineup" className="min-h-screen md:py-32 py-16 bg-black">
          <Lineup />
        </div>

        {/* Merchandise Section */}
        <Merch />

        {/* Information Section */}
        <Informations />
      </main>

      {/* Styles for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}