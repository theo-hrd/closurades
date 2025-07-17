"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface TicketButtonProps {
  price?: string;
  buttonText?: string;
  gradientFrom?: string;
  gradientTo?: string;
  ticketUrl?: string;
}

// Separate the vinyl animation logic into a hook for better maintainability
function useVinylSpinAnimation(isHovered: boolean) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinSpeed, setSpinSpeed] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const spinRef = useRef<number | null>(null);

  // Progressive update of spinSpeed
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

  // Continuous rotation angle update using requestAnimationFrame
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

  // Automatic spinning for mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // Mobile breakpoint
        setSpinSpeed(15); // Constant spin speed for mobile
      } else {
        setSpinSpeed(0); // Stop spinning on larger screens unless hovered
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { rotationAngle };
}

const TicketButton = ({
  buttonText = "COMPLET",
  gradientFrom = "from-red-600",
  gradientTo = "to-orange-600",
}: Readonly<TicketButtonProps>) => {
  const [isHovered, setIsHovered] = useState(false);
  const { rotationAngle } = useVinylSpinAnimation(isHovered);

  return (
    <div className="relative flex flex-col items-center justify-center p-6 h-[600px] overflow-hidden">
      {/* Vinyl background */}
      <div 
        className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px]"
        style={{
          maxWidth: "100%",
          transform: `rotate(${rotationAngle}deg)`,
          zIndex: 1
        }}
      >
        <Image 
          width={600}
          height={600}
          src="/vinyl.webp" 
          alt="Vinyl record" 
          className="object-cover w-full h-full"
          priority={false}
        />
      </div>

      {/* Main content with button and text */}
      <div className="relative z-10">
        <div 
          className={`relative overflow-hidden px-8 py-4 md:px-12 md:py-6 rounded-lg font-bold tracking-wide text-white transition-all duration-500 ${
            isHovered ? 'scale-105 shadow-lg shadow-pink-500/50' : ''
          }`}
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
          // onClick={handleClick}
          role="button"
          aria-label="Acheter des billets pour le festival"
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientTo} transition-all duration-500`}></div>
          <div 
            className={`absolute inset-0 bg-white opacity-0 transition-opacity duration-500 ${
              isHovered ? 'opacity-10' : ''
            }`}
          ></div>
          <div className="relative z-10 uppercase font-extrabold text-xl md:text-2xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            <span>{buttonText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketButton;