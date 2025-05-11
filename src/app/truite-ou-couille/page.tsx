"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

export default function TruiteOuCouille() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Démarrer la musique automatiquement lors du chargement de la page
    if (audioRef.current) {
      // Tentative de lecture après interaction utilisateur pour respecter les politiques des navigateurs
      const playAttempt = setInterval(() => {
        audioRef.current?.play()
          .then(() => {
            clearInterval(playAttempt);
          })
          .catch(error => {
            console.log("Lecture automatique bloquée, cliquez sur la page pour activer la musique");
          });
      }, 1000);

      return () => clearInterval(playAttempt);
    }
  }, []);

  const handleClick = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden" onClick={handleClick}>
      <div className="relative w-full h-full">
        <Image 
          src="/images/truite.jpg" 
          alt=""
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      
      <audio 
        ref={audioRef}
        src="/audio/OMFG-hello.mp3"
        loop
      />
    </div>
  );
} 