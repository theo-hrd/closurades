"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useInView } from "framer-motion";

import ArtistList from "./components/ui/ArtistList";

import TicketButton from "./components/ui/TicketButton";

import Lineup from "./components/features/Lineup";

import Merch from "./components/features/Merch";

import Informations from "./components/features/Informations";

import {
  FESTIVAL_DATES,
  ARTISTS,
  BACKGROUND_IMAGES,
} from "./lib/constants";

// Animation component that reveals content when scrolled into view
function AnimateOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: [0.2, 0.65, 0.3, 0.9] // Custom easing curve for a smooth entrance
      }}
    >
      {children}
    </motion.div>
  );
}

// Separate component for Hero section to improve organization

function HeroSection({
  onScrollToBilleterie,
}: {
  onScrollToBilleterie: () => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Effect for automatically scrolling images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen" id="closurades">
      {/* Image carousel */}
      <div className="absolute inset-0 overflow-hidden">
        {BACKGROUND_IMAGES.map((src, index) => (
          <motion.div
            key={`bg-image-${index}`}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: index === currentImageIndex ? 1 : 0,
              scale: index === currentImageIndex ? 1 : 1.1,
            }}
            transition={{ 
              duration: 2,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <motion.div
              className="w-full h-full"
              animate={{ 
                filter: index === currentImageIndex ? "brightness(1.1) saturate(1.1)" : "brightness(0.9) saturate(0.9)"
              }}
              transition={{ duration: 2 }}
            >
              <Image
                src={src}
                alt={`Festival background ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover w-full h-full"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay */}

      <div className="absolute inset-0 bg-black/50" />

      {/* Centered title */}

      <div className="absolute inset-0 flex flex-col items-center text-center px-4 sm:px-8">
        <div className="w-full max-w-4xl mx-auto pt-20 sm:pt-16">
          <div className="md:pt-10 mx-auto w-full max-w-2xl sm:max-w-3xl flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotate: [0, -1, 1, -1, 0] 
              }}
              transition={{ 
                opacity: { duration: 1, ease: "easeOut" },
                y: { duration: 1, ease: "easeOut" },
                rotate: { 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 5,
                  ease: "easeInOut",
                  delay: 0.8  // Commence après le fade-in
                }
              }}
            >
              <Image 
                src="/closurades.webp" 
                alt="Les Closurades" 
                width={2000} 
                height={2000} 
                className="w-full h-auto object-contain"
                priority
              />
            </motion.div>
          </div>

          <h2 className="mt-4 sm:mt-8 text-2xl sm:text-4xl text-white drop-shadow-lg">
            <motion.span 
              className="font-[helvetica] subpixel-antialiased font-extrabold text-3xl sm:text-5xl uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                x: [0, -2, 2, -2, 0],
                rotate: [0, -0.5, 0.5, -0.5, 0]
              }}
              transition={{ 
                duration: 0.8,
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 3.5,
                  ease: "easeInOut"
                },
                rotate: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 3.5,
                  ease: "easeInOut"
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              drag="x"
              dragConstraints={{ left: -10, right: 10 }}
              dragElastic={0.1}
            >
              {FESTIVAL_DATES}
            </motion.span>
          </h2>

          {/* Updated artist list with grid layout */}
          <div className="antialiased mt-2 sm:mt-4 mb-16 sm:mb-8 w-full max-w-[2000px] mx-auto">
            <ArtistList
              artists={ARTISTS}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}

      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-300"
        onClick={onScrollToBilleterie}
      >
        <span className="mb-2 text-xl font-bold uppercase bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Billetterie
        </span>
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
      </div>
    </div>
  );
}

// Separate component for the Tickets section

function TicketsSection({
  forwardedRef,
}: {
  isVisible: boolean;
  forwardedRef: React.RefObject<HTMLDivElement>;
}) {
  const isInView = useInView(forwardedRef, { once: true, amount: 0.1 });

  return (
    <div
      id="Billetterie"
      ref={forwardedRef}
      className="min-h-screen py-32 max-w-7xl mx-auto sm:px-6 lg:px-8"
    >
      <motion.div
        className="px-4 py-6 sm:px-0"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent uppercase">
            Billetterie
          </h2>

          <p className="mt-4 text-lg max-w-2xl text-center mx-auto text-black">
            Achetez vos tickets dès maintenant !
          </p>

          <TicketButton />
        </div>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const billeterieRef = useRef<HTMLDivElement>(null);
  
  // Scroll animation
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Hero Section with image carousel */}
      <HeroSection onScrollToBilleterie={scrollToBilleterie} />

      {/* Main content */}
      <main className="flex-grow bg-white">
        {/* Tickets Section */}
        <TicketsSection isVisible={isVisible} forwardedRef={billeterieRef as React.RefObject<HTMLDivElement>} />

        {/* Line-up Section */}
        <div id="lineup" className="min-h-screen md:py-32 py-16 bg-black">
          <AnimateOnScroll>
            <Lineup />
          </AnimateOnScroll>
        </div>

        {/* Merchandise Section */}
        <AnimateOnScroll delay={0.2}>
          <Merch />
        </AnimateOnScroll>

        {/* Information Section */}
        <AnimateOnScroll delay={0.3}>
          <Informations />
        </AnimateOnScroll>
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
