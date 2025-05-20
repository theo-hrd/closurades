import React from 'react';
import Image from 'next/image';
import { Tent, MapPin, Info, Clock, Car, Train, Check, ZoomIn, ZoomOut, X, Move, Download } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { SOCIAL_LINKS } from '@/app/lib/constants';

// Discord icon component
const DiscordIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 127.14 96.36" 
    fill="currentColor"
    className={className}
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

// Instagram icon component
const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

export default function Informations() {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // Pour le drag de l'image
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const openMapModal = () => {
    setIsMapModalOpen(true);
    document.body.style.overflow = 'hidden';
    // Réinitialiser la position et le zoom quand on ouvre la modal
    setPosition({ x: 0, y: 0 });
    setZoomLevel(1);
  };

  const closeMapModal = () => {
    setIsMapModalOpen(false);
    document.body.style.overflow = 'auto';
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  // Fonctionnalité de drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Gestion du drag pour les appareils tactiles
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ 
        x: e.touches[0].clientX - position.x, 
        y: e.touches[0].clientY - position.y 
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      e.preventDefault();
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Ajout du zoom au scroll
  const handleWheelZoom = (e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.deltaY < 0) {
      setZoomLevel(prev => Math.min(prev + 0.1, 3)); // Zoom in
    } else {
      setZoomLevel(prev => Math.max(prev - 0.1, 0.5)); // Zoom out, ajusté pour un minimum de 0.5
    }
  };

  // Ajouter les événements lors du montage et les supprimer lors du démontage
  useEffect(() => {
    const container = containerRef.current;
    
    if (isMapModalOpen && container) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);
      container.addEventListener('wheel', handleWheelZoom, { passive: false });
      
      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchend', handleTouchEnd);
        container.removeEventListener('wheel', handleWheelZoom);
      };
    }
  }, [isMapModalOpen, isDragging, zoomLevel]);

  return (
    <div id="informations" className="min-h-screen py-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-12 space-y-2">
        <div className="flex justify-center items-center">
          <Image
            src="/titles/informations.webp"
            alt="Informations Closurades"
            width={400}
            height={80}
            className="object-contain"
            priority
          />
        </div>
        <p className="mt-4 text-lg text-center text-black">
          Tout ce que vous devez savoir pour profiter du festival !
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* À propos */}
        <div className="relative bg-white rounded-lg shadow-xl p-6 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-purple-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          <div className="relative flex items-center mb-4">
            <div className="p-2 rounded-full bg-gradient-to-r from-red-600 to-purple-700">
              <Info className="text-white" size={20} aria-hidden="true" />
            </div>
            <h3 id="about-heading" className="ml-3 text-xl font-bold bg-gradient-to-r from-red-600 to-purple-700 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">À propos</h3>
          </div>
          <div className="space-y-4">
            <p className="text-gray-800">
              LES CLOSURADES est un festival de musique 100% indépendant qui se tiendra du vendredi 18 juillet (à partir de 17h) au dimanche 20 juillet 2025. 🎶
            </p>
            <p className="text-gray-800">
              En pleine forêt de Moulières, à 20 minutes de Poitiers, se trouve un ancien corps de ferme que nous avons transformé en lieu de rassemblement pour les musicophiles et kiffeurs/euses de plein air.
              Ici, pas de voisins à 1,5km à la ronde et pas d'électricité. 🍃
            </p>
            <p className="text-gray-800">
              C'est l'endroit parfait où se retrouver entre amis pour décompresser, écouter de la très bonne musique, dormir en tente, danser, courir, parler fort, boire et manger de bonnes choses, jouer aux cartes… 🍻
            </p>
            <p className="text-gray-800">
              Concerts de Rock indé, de post Punk et de modulaire, Sets de House, Techno, Hard et acid seront au rendez-vous sur une scène spécialement construite et sonorisée avec du matériel de professionnel par notre incroyable ami Julien alias PRPHTXIV !!
            </p>
          </div>
        </div>

        {/* Horaires */}
        <div className="relative bg-white rounded-lg shadow-xl p-6 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-purple-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          <div className="relative flex items-center mb-4">
            <div className="p-2 rounded-full bg-gradient-to-r from-red-600 to-purple-700">
              <Clock className="text-white" size={20} aria-hidden="true" />
            </div>
            <h3 id="schedule-heading" className="ml-3 text-xl font-bold bg-gradient-to-r from-red-600 to-purple-700 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">Horaires du Festival</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-600/40 to-purple-700/40 transform origin-left"></div>
              <h4 className="font-semibold mb-3 text-black text-center">Début</h4>
              <p className="flex items-center justify-center text-gray-800 font-medium">
                <Clock className="mr-2 text-red-600" size={20} aria-hidden="true" /> Vendredi 18 juillet 2025
              </p>
              <p className="text-center text-gray-800 mt-1">à partir de 17h00</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-600/40 to-purple-700/40 transform origin-left"></div>
              <h4 className="font-semibold mb-3 text-black text-center">Durée</h4>
              <p className="text-center text-gray-800">
                2 jours de festival avec camping inclus
              </p>
              <p className="text-center text-gray-800 mt-1">
                Concerts, DJ sets, activités et restauration
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-600/40 to-purple-700/40 transform origin-left"></div>
              <h4 className="font-semibold mb-3 text-black text-center">Fin</h4>
              <p className="flex items-center justify-center text-gray-800 font-medium">
                <Clock className="mr-2 text-red-600" size={20} aria-hidden="true" /> Dimanche 20 juillet 2025
              </p>
              <p className="text-center text-gray-800 mt-1">à 12h00</p>
            </div>
          </div>
        </div>

        {/* Transport */}
        <div className="relative bg-white rounded-lg shadow-xl p-6 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-purple-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          <div className="relative flex items-center mb-4">
            <div className="p-2 rounded-full bg-gradient-to-r from-red-600 to-purple-700">
              <Car className="text-white" size={20} aria-hidden="true" />
            </div>
            <h3 id="transport-heading" className="ml-3 text-xl font-bold bg-gradient-to-r from-red-600 to-purple-700 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">Transport</h3>
          </div>
          <div className="space-y-4">
            <p className="text-gray-800 font-bold">
              Nous disposons d'un espace limité pour garer les voitures, alors faites un maximum de covoiturage, surtout si vous venez de la même ville !
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-600/40 to-purple-700/40 transform origin-left"></div>
              <div className="flex items-center mb-2 text-black">
                <Car className="mr-2 text-red-600" size={20} aria-hidden="true" />
                <h4 className="font-semibold">En voiture 🚙</h4>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-gray-800">
                <li>Privilégiez un maximum le covoiturage ! Vous pouvez trouver ou proposer des groupes de covoit' dans <span className="font-bold">🚙covoiturage</span> sur le <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">Discord</a>.</li>
                <li>Quelqu'un vous guidera pour vous garer lorsque vous arrivez sur le site.</li>
                <li>Contactez un.e orga si vous venez de Poitiers et ces environs, nous pourrons certainement vous prendre dans une des navettes.</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mt-4 border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-600/40 to-purple-700/40 transform origin-left"></div>
              <div className="flex items-center mb-2 text-black">
                <Train className="mr-2 text-red-600" size={20} aria-hidden="true" />
                <h4 className="font-semibold">En train  /bus 🚎</h4>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-gray-800">
                <li>Pour celles / ceux qui viennent en train / bus, prévoyez votre arrivée uniquement à la gare du Futuroscope ou la gare de Poitiers.</li>
                <li>Nous ferons la navette pour venir vous chercher à certaines heures (à partir de 17h le vendredi).</li>
                <li>Afin de déterminer les horaires de passage de la navette, vous devez impérativement envoyer un message (dès que vous avez votre trajet) dans <span className="font-bold">🚌navette</span> sur le <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">Discord</a> ou en contactant un.e orga.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* À ramener */}
        <div className="relative bg-white rounded-lg shadow-xl p-6 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-purple-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          <div className="relative flex items-center mb-4">
            <div className="p-2 rounded-full bg-gradient-to-r from-red-600 to-purple-700">
              <Check className="text-white" size={20} aria-hidden="true" />
            </div>
            <h3 id="bring-heading" className="ml-3 text-xl font-bold bg-gradient-to-r from-red-600 to-purple-700 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">À ramener</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-800">
              Préparez bien votre séjour aux Closurades en n'oubliant rien d'essentiel !
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-600/40 to-purple-700/40 transform origin-left"></div>
              <div className="flex items-center mb-2 text-black">
                <Tent className="mr-2 text-red-600" size={20} aria-hidden="true" />
                <h4 className="font-semibold">Les Indispensables</h4>
              </div>
              <div className="space-y-3 text-gray-800 mt-2">
                <ul className="list-disc pl-5 space-y-1 text-gray-800">
                  <li>
                    <span className="font-medium text-black">Votre tente ⛺</span> : Elle vous logera pendant deux nuits.
                    Elle vous permettra également d'y laisser vos effets personnels pendant votre festival,
                    ainsi il est recommandé d'amener un cadenas, pour pouvoir la fermer.
                  </li>
                  <li>
                    <span className="font-medium text-black">Une bouteille ou une gourde 🍶</span> : De l'eau potable sera 
                    disponible à volonté, donc pensez à votre contenant
                    pour vous hydrater n'importe où / quand.
                  </li>
                  <li>
                    <span className="font-medium text-black">De l'argent LIQUIDE 💸</span> : Pour celles et ceux qui n'ont pas pris des JETONS en avance avec votre billet, vous pourrez en acheter sur place, avec
                    de l'argent LIQUIDE (Aucuns distributeurs à 5km à la ronde).
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mt-4 border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-600/40 to-purple-700/40 transform origin-left"></div>
              <div className="flex items-center mb-2 text-black">
                <Check className="mr-2 text-red-600" size={20} aria-hidden="true" />
                <h4 className="font-semibold">Les Recommandés</h4>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-gray-800">
                <li>Duvet / Plaid 🛌</li>
                <li>Une batterie externe 🔋</li>
                <li>Cadenas 🔒 (Pour fermer votre tente)</li>
                <li>Lingettes bébé 🧻</li>
                <li>Spray anti-moustique / anti-tique 🦟</li>
                <li>Hamac 🌴 (Il y a quelques arbres bien disposés)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Plan du site */}
        <div className="relative bg-white rounded-lg shadow-xl p-6 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-purple-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          <div className="relative flex items-center mb-4">
            <div className="p-2 rounded-full bg-gradient-to-r from-red-600 to-purple-700">
              <MapPin className="text-white" size={20} aria-hidden="true" />
            </div>
            <h3 id="map-heading" className="ml-3 text-xl font-bold bg-gradient-to-r from-red-600 to-purple-700 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">Plan du site</h3>
          </div>
          <div 
            className="rounded-lg flex items-center justify-center cursor-pointer relative group"
            onClick={openMapModal}
          >
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <ZoomIn className="text-white" size={32} />
            </div>
            <Image 
              src="/plandusite.webp" 
              alt="Carte du site du festival" 
              width={600} 
              height={400} 
              className="w-full h-auto max-h-[300px] object-contain rounded-lg" 
            />
          </div>
          <div className="flex items-center justify-center mt-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600/10 to-purple-700/10 rounded-full border border-gray-200 shadow-sm">
              <ZoomIn size={16} className="text-red-600 flex-shrink-0" />
              <p className="font-medium text-gray-800 text-sm whitespace-nowrap">Cliquez sur l'image pour agrandir</p>
            </div>
          </div>
        </div>

        {/* Infos pratiques */}
        <div className="relative bg-white rounded-lg shadow-xl p-6 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-purple-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          <div className="relative flex items-center mb-4">
            <div className="p-2 rounded-full bg-gradient-to-r from-red-600 to-purple-700">
              <Info className="text-white" size={20} aria-hidden="true" />
            </div>
            <h3 id="info-heading" className="ml-3 text-xl font-bold bg-gradient-to-r from-red-600 to-purple-700 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">Infos pratiques</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-800 font-bold">
              Le site des Closurades est très sujet au risque d'incendie en plein été, alors afin que tout le monde passe un agréable moment tout en sécurité, vous devez prendre ardemment connaissance des règles de sécurité et de bonne conduite.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-600/40 to-purple-700/40 transform origin-left"></div>
              <h4 className="font-semibold mb-2 text-black text-center text-xl md:text-xl text-lg">🦺 Sécurité du site</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-800 text-base md:text-lg">
                <li>Ne jamais jeter ses mégots dans la nature mais dans les nombreux cendriers prévus à cet effet : risque très important d'incendie 🚬</li>
                <li>Ne pas faire de feu même brasero et barbecue 🔥</li>
                <li>Ne pas utiliser de bougie et d'allumette 🕯️</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-600/40 to-purple-700/40 transform origin-left"></div>
              <h4 className="font-semibold mb-2 text-black text-center text-xl md:text-xl text-lg">⛑️ Sécurité des personnes</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-800 text-base md:text-lg">
                <li>Gérez votre consommation d'alcool sur place pour votre bien-être et celui des autres.</li>
                <li>Tout produit stupéfiant illicite (autre que l'alcool) est formellement interdit sur le site.</li>
                <li>La nature du festival fait qu'on ne peut pas se permettre d'avoir quelconque problème lié à la consommation de stupéfiants.</li>
                <li>Ne pas se rendre dans les lieux réservés aux ORGANISATEURS (Chalet, dortoir, zone de stockage, zone de barbecue, etc) qui seront indiqués par une affiche ⛔</li>
                <li>Interdiction formelle de se rendre dans les lieux avec rubalise : risque d'éboulement 🚧</li>
                <li>Interdiction formelle de monter sur n'importe quelle toiture et n'importe quel puits.</li>
                <li>En cas de doute, des contrôles d'alcoolémie seront réalisés pour ceux et celles qui veulent partir en voiture.</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-600/40 to-purple-700/40 transform origin-left"></div>
              <h4 className="font-semibold mb-2 text-black text-center text-xl md:text-xl text-lg">🤝 Bonne conduite</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-800 text-base md:text-lg">
                <li>🚫 Interdit aux animaux de compagnie ! 🐕 🐱 🚫</li>
                <li>Nous avons investi du temps et beaucoup d'argent dans la Buvette, alors nous demandons de ne pas ramener d'alcool et de nourriture (Les prix sont bas).</li>
                <li>Prenez soin de l'écocup qui vous est offert à l'entrée ! Si vous le perdez / cassez, vous devrez en racheter un au stand boisson !</li>
                <li>Refermez systématiquement le robinet des bidons d'eau en libre-service au stand bouffe et boisson et ne gaspillez pas l'eau.</li>
                <li>Respectez les lieux de repos la nuit, pas de bruit, si vous voulez parler etc les lieux sont grands, allez autre part.</li>
                <li>Grosse commission uniquement dans les toilettes, interdiction même dans les champs.</li>
                <li>Si vous pouvez faire pipi debout, n'encombrez pas les toilettes inutilement. Marchez une minute et allez faire pipi dans le champ (Pas au niveau des voitures).</li>
                <li>Interdiction formelle de laisser du papier toilette par terre et autres déchets (même organique)!! 🚯</li>
                <li>De nombreuses poubelles sont à votre disposition merci de jeter vos déchets.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Suivez-nous */}
        <div className="relative bg-white rounded-lg shadow-xl p-6 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-purple-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          <h4 className="font-semibold mb-5 text-black text-center text-xl">Suivez-nous</h4>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center flex-grow">
            <a 
              href={SOCIAL_LINKS.instagram}
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-purple-600 to-red-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 w-full sm:w-auto text-lg cursor-pointer pointer-events-auto relative z-10"
              aria-label="Instagram"
            >
              <InstagramIcon size={28} />
              <span className="font-medium">Instagram</span>
            </a>
            <a 
              href={SOCIAL_LINKS.discord}
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 w-full sm:w-auto text-lg cursor-pointer pointer-events-auto relative z-10"
              aria-label="Discord"
            >
              <DiscordIcon size={28} />
              <span className="font-medium">Discord</span>
            </a>
          </div>
        </div>
      </div>

      {/* Modal for enlarged map view */}
      {isMapModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeMapModal}
        >
          <div 
            className="relative max-w-4xl w-full h-auto max-h-[90vh] bg-white/5 rounded-xl backdrop-blur-sm p-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-20 flex gap-1 md:gap-2">
              <button 
                onClick={handleZoomIn}
                className="bg-white p-2 md:p-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center"
                aria-label="Zoom in"
              >
                <ZoomIn size={18} className="text-gray-800" />
              </button>
              <button 
                onClick={handleZoomOut}
                className="bg-white p-2 md:p-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center"
                aria-label="Zoom out"
              >
                <ZoomOut size={18} className="text-gray-800" />
              </button>
              <button 
                onClick={handleResetZoom}
                className="bg-white p-2 md:p-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center"
                aria-label="Reset zoom and position"
              >
                <Move size={18} className="text-gray-800" />
              </button>
              <a 
                href="/plandusite-optimized.webp" 
                download="Plan_du_site_Closurades.webp"
                className="bg-white p-2 md:p-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center"
                aria-label="Télécharger la carte"
                onClick={(e) => e.stopPropagation()}
              >
                <Download size={18} className="text-gray-800" />
              </a>
              <button 
                onClick={closeMapModal}
                className="bg-red-500 p-2 md:p-3 rounded-full hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center"
                aria-label="Close modal"
              >
                <X size={18} className="text-white" />
              </button>
            </div>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-black/70 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm backdrop-blur-sm w-auto max-w-[95%] md:max-w-[90%] text-center whitespace-nowrap">
              Cliquez et déplacez pour naviguer • Zoom: {Math.round(zoomLevel * 100)}%
            </div>

            <div 
              ref={containerRef}
              className="overflow-hidden h-full w-full rounded-lg"
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="transform-gpu w-full h-full" 
                style={{ 
                  transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`, 
                  transformOrigin: 'center', 
                  transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                }}
              >
                <Image 
                  src="/plandusite.webp" 
                  alt="Carte du site du festival" 
                  width={1200} 
                  height={800} 
                  quality={95}
                  className="w-full h-auto object-contain"
                  draggable="false"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}