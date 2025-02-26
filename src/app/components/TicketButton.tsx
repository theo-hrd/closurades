import React, { useState } from 'react';

const TicketButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <button 
        className={`relative overflow-hidden px-8 py-4 rounded-lg font-bold tracking-wide text-white transition-all duration-300 ${
          isHovered ? 'scale-105 shadow-lg shadow-pink-500/50' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Fond avec gradient simple */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300"></div>
        
        {/* Flash d'éclat au hover */}
        <div 
          className={`absolute inset-0 bg-white opacity-0 transition-opacity duration-300 ${
            isHovered ? 'opacity-10' : ''
          }`}
        ></div>
        
        {/* Conteneur pour le texte */}
        <div className="relative z-10">
          <span>Prenez vos billets</span>
        </div>
      </button>
      
      {/* Prix qui apparaît au hover */}
      <div className={`mt-3 font-semibold text-gray-300 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        Prix: 20 €
      </div>
    </div>
  );
};

export default TicketButton;