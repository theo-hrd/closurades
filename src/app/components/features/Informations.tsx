import React from 'react';
import Image from 'next/image';
import { Tent, MapPin, Info, Clock, Milk, Utensils, Car, Train, Check, CircleOff } from 'lucide-react';

export default function Informations() {
  return (
    <div id="informations" className="min-h-screen py-12 max-w-7xl mx-auto px-6">
      <div className="mb-12 space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-red-600 to-purple-700 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
          Informations
        </h2>
        <p className="mt-4 text-lg text-center text-black">
          Tout ce que vous devez savoir pour profiter du festival !
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* À propos */}
        <div className="relative bg-white rounded-lg shadow-xl p-6 md:col-span-2 overflow-hidden group">
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
        <div className="relative bg-white rounded-lg shadow-xl p-6 md:col-span-2 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-purple-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          <div className="relative flex items-center mb-4">
            <div className="p-2 rounded-full bg-gradient-to-r from-red-600 to-purple-700">
              <Clock className="text-white" size={20} aria-hidden="true" />
            </div>
            <h3 id="schedule-heading" className="ml-3 text-xl font-bold bg-gradient-to-r from-red-600 to-purple-700 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">Horaires du Festival</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                3 jours de festival avec camping inclus
              </p>
              <p className="text-center text-gray-800 mt-1">
                Concerts, activités et restauration
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
            <p className="text-gray-800">
              Nous disposons d'un espace limité pour garer les voitures, alors faites un maximum de covoiturage, surtout si vous venez de la même ville !!
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-600/40 to-purple-700/40 transform origin-left"></div>
              <div className="flex items-center mb-2 text-black">
                <Car className="mr-2 text-red-600" size={20} aria-hidden="true" />
                <h4 className="font-semibold">En voiture 🚙</h4>
              </div>
              <div className="space-y-2 text-gray-800">
                <p>Privilégiez un maximum le covoiturage !! Vous pouvez trouver/proposer des groupes de covoit dans 🚙covoiturage sur le Discord.</p>
                <p>Quelqu'un vous guidera sur place pour vous garer.</p>
                <p>Contactez un/e orga si vous venez de Poitiers/les environs, nous pourrons certainement vous prendre dans une des navettes.</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mt-4 border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-600/40 to-purple-700/40 transform origin-left"></div>
              <div className="flex items-center mb-2 text-black">
                <Train className="mr-2 text-red-600" size={20} aria-hidden="true" />
                <h4 className="font-semibold">En train/bus 🚎</h4>
              </div>
              <div className="space-y-2 text-gray-800">
                <p>Pour celles/ceux qui viennent en Train/Bus, prévoyez votre arrivée uniquement à : la gare du Futuroscope ou la gare de Poitiers.</p>
                <p>Nous ferons la navette pour venir vous chercher à certaines heures (à partir de 17h le vendredi).</p>
                <p>Afin de déterminer les horaires de passage de la navette, vous devez impérativement envoyer un message (dès que vous avez votre trajet) dans 🚌navette sur le Discord ou en contactant un/e orga.</p>
              </div>
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
                <div className="flex items-start">
                  <div className="mt-1 mr-2 min-w-4 text-center">•</div>
                  <div>
                    <span className="font-medium text-black">Votre tente ⛺</span> : Elle vous logera pendant deux nuits.
                    Elle vous permettra également d'y laisser vos effets personnels pendant votre festival,
                    ainsi il est recommandé d'amener un cadenas, pour pouvoir la fermer.
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 mr-2 min-w-4 text-center">•</div>
                  <div>
                    <span className="font-medium text-black">Une bouteille ou une gourde 🍶</span> : De l'eau potable sera 
                    disponible à volonté, donc pensez à votre contenant
                    pour vous hydrater n'importe où / quand.
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 mr-2 min-w-4 text-center">•</div>
                  <div>
                    <span className="font-medium text-black">De l'argent LIQUIDE 💸</span> : Pour celles et ceux qui n'ont pas pris des JETONS en avance avec votre billet, vous pourrez en acheter sur place, avec
                    de l'argent LIQUIDE (Aucuns distributeurs à 5km à la ronde).
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mt-4 border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-600/40 to-purple-700/40 transform origin-left"></div>
              <div className="flex items-center mb-2 text-black">
                <Check className="mr-2 text-red-600" size={20} aria-hidden="true" />
                <h4 className="font-semibold">Les Recommandés</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-800">
                <div className="flex items-center">
                  <div className="mr-2">•</div>
                  <span>Ethylotest 🧪</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2">•</div>
                  <span>Contraception 🛡️</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2">•</div>
                  <span>Duvet / Plaid 🛌 (Il va faire chaud)</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2">•</div>
                  <span>Une batterie externe 🔋</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2">•</div>
                  <span>Cadenas 🔒 (Pour fermer votre tente)</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2">•</div>
                  <span>Lingettes bébé 🧻</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2">•</div>
                  <span>Spray anti-moustique / anti-tique 🦟</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2">•</div>
                  <span>Hamac 🌴 (Il y a quelques arbres bien disposés)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plan du site */}
        <div className="relative bg-white rounded-lg shadow-xl p-6 md:col-span-2 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-purple-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          <div className="relative flex items-center mb-4">
            <div className="p-2 rounded-full bg-gradient-to-r from-red-600 to-purple-700">
              <MapPin className="text-white" size={20} aria-hidden="true" />
            </div>
            <h3 id="map-heading" className="ml-3 text-xl font-bold bg-gradient-to-r from-red-600 to-purple-700 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">Plan du site</h3>
          </div>
          <div className="rounded-lg flex items-center justify-center">
            <Image src="/plandusite.jpeg" alt="Carte du site du festival" width={600} height={400} className="w-full h-full object-contain rounded-lg" />
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
            <p className="text-gray-800">
              Le site des Closurades est très sujet au risque d'incendie en plein été, alors afin que tout le monde passe un agréable moment tout en sécurité, vous devez prendre ardemment connaissance des règles de sécurité et de bonne conduite.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-600/40 to-purple-700/40 transform origin-left"></div>
              <h4 className="font-semibold mb-2 text-black">Sécurité</h4>
              <div className="space-y-2">
                <p className="text-gray-800">
                  Respectez les consignes de sécurité et les zones délimitées.
                </p>
                <p className="text-gray-800">
                  En cas de problème, adressez-vous immédiatement à un membre de l'organisation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}