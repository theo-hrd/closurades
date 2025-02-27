import React, { useState, useEffect, useRef } from 'react';

const TicketButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinSpeed, setSpinSpeed] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const spinRef = useRef<number | null>(null);

  // Mise à jour progressive de spinSpeed
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isHovered) {
        if (spinSpeed < 15) {
          setSpinSpeed(prevSpeed => Math.min(prevSpeed + 0.5, 15));
          setIsSpinning(true);
        }
      } else if (isSpinning) {
        if (spinSpeed > 0) {
          setSpinSpeed(prev => Math.max(0, prev - 0.25));
        } else {
          setIsSpinning(false);
        }
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [isHovered, isSpinning, spinSpeed]);

  // Mise à jour continue de l'angle de rotation via requestAnimationFrame
  useEffect(() => {
    let lastTime = performance.now();
    const updateAngle = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;
      setRotationAngle(prev => prev + spinSpeed * dt * 0.05);
      spinRef.current = requestAnimationFrame(updateAngle);
    };
    spinRef.current = requestAnimationFrame(updateAngle);
    return () => {
      if (spinRef.current) cancelAnimationFrame(spinRef.current);
    };
  }, [spinSpeed]);

  return (
    <div className="relative flex flex-col items-center justify-center p-6 h-[600px] overflow-hidden">
      {/* Vinyle en arrière-plan */}
      <div 
        className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px]"
        style={{
          maxWidth: "100%",
          transform: `rotate(${rotationAngle}deg)`,
          zIndex: 1
        }}
      >
        <img 
          src="/vinyl.png" 
          alt="Vinyl record" 
          className="object-cover w-full h-full"
        />
      </div>

      {/* Contenu principal avec bouton et texte */}
      <div className="relative z-10">
        <button 
          className={`relative overflow-hidden px-12 py-6 rounded-lg font-bold tracking-wide text-white transition-all duration-500 ${
            isHovered ? 'scale-105 shadow-lg shadow-pink-500/50' : ''
          }`}
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 transition-all duration-500"></div>
          <div 
            className={`absolute inset-0 bg-white opacity-0 transition-opacity duration-500 ${
              isHovered ? 'opacity-10' : ''
            }`}
          ></div>
          <div className="relative z-10 uppercase font-extrabold text-2xl">
            <span>Prenez vos tickets</span>
          </div>
        </button>
        <div 
          className={`mt-3 text-center font-semibold text-white transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Prix: 20 €
        </div>
      </div>
    </div>
  );
};

export default TicketButton;