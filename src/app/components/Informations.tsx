import React from 'react';
import { Tent, MapPin, UtensilsCrossed, Beer, Info, Clock, Milk, Utensils } from 'lucide-react';

export default function Informations() {
  return (
    <div id="informations" className="min-h-screen py-12 md:py-32 max-w-7xl mx-auto px-6">
      <div className="mb-12 space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-red-600">
          Informations
        </h2>
        <p className="mt-4 text-lg text-center text-black">
          Tout ce que vous devez savoir pour profiter du festival !
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Camping */}
        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
          <div className="flex items-center mb-4 text-red-600">
            <Tent className="mr-2" size={24} />
            <h3 className="text-xl font-bold">Camping</h3>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">
              Le camping est inclus avec votre billet pour les 2 jours du festival. Installez votre tente et profite des Closurades !
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-black">Horaires du camping</h4>
              <div className="space-y-2">
                <p className="flex items-center text-gray-700">
                  <Clock className="mr-2" size={16} /> Ouverture : Vendredi 10h00
                </p>
                <p className="flex items-center text-gray-700">
                  <Clock className="mr-2" size={16} /> Fermeture : Lundi 12h00
                </p>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mt-4">
              <h4 className="font-semibold mb-2 text-black">Équipements disponibles</h4>
              <div className="space-y-2">
                <p className="flex items-center text-gray-700">
                  <Milk className="mr-2" size={16} /> Point d'eau potable
                </p>
                <p className="flex items-center text-gray-700">
                  <Utensils className="mr-2" size={16} /> Espace petit-déjeuner
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Nourriture et Boissons */}
        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
          <div className="flex items-center mb-4 text-red-600">
            <UtensilsCrossed className="mr-2" size={24} />
            <h3 className="text-xl font-bold">Restauration</h3>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">
              On ne plaisante pas avec la nourriture aux Closurades !
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-black">Options alimentaires</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Options végétariennes et véganes</li>
                <li>Le fameux plat de pâte</li>
                <li>Dahl de lentilles</li>
              </ul>
            </div>
            <div className="flex items-center mt-6 mb-2 text-red-600">
              <Beer className="mr-2" size={20} />
              <h4 className="font-semibold">Boissons</h4>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">
                On a de quoi vous désaltérer ! On adore La bière et la mythique Jacqueline sans oublier le divin Punch !
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Bières blonde, la classique tu connais</li>
                <li>La Jacqueline on la connaît bien celle là </li>
                <li>Cocktails signature du festival</li>
                <li>Boissons sans alcool et rafraîchissements</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Plan du site */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2 transition-transform hover:scale-105">
          <div className="flex items-center mb-4 text-red-600">
            <MapPin className="mr-2" size={24} />
            <h3 className="text-xl font-bold">Plan du site</h3>
          </div>
          <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">Carte du site du festival</p>
            {/* Emplacement pour insérer la carte dessinée du site */}
            {/* Vous pouvez remplacer cette div par une image ou un composant SVG plus tard */}
          </div>
        </div>

        {/* Règles et infos pratiques */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2 transition-transform hover:scale-105">
          <div className="flex items-center mb-4 text-red-600">
            <Info className="mr-2" size={24} />
            <h3 className="text-xl font-bold">Infos pratiques</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold mb-2 text-green-600">Ce qui est autorisé</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Tentes et matériel de camping</li>
                <li>Votre alcool dans la limite du raisonnable</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2 text-red-600">Ce qui est interdit</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Objets dangereux et armes</li>
                <li>Substances illicites</li>
                <li>Les animaux de compagnie</li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}