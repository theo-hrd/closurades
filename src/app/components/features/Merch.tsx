import Image from "next/image";

export default function Merch() {
    // Liste des produits
    const products = [
        {
            id: 1,
            name: "T-shirt Signature",
            image: "/api/placeholder/300/300",
            description: "T-shirt en coton bio avec notre logo emblématique"
        },
        {
            id: 2,
            name: "Casquette Premium",
            image: "/api/placeholder/300/300",
            description: "Casquette ajustable de haute qualité"
        },
        {
            id: 3,
            name: "Hoodie Deluxe",
            image: "/api/placeholder/300/300",
            description: "Sweat à capuche ultra confortable pour toutes les saisons"
        },
        {
            id: 4,
            name: "Tote Bag Écologique",
            image: "/api/placeholder/300/300",
            description: "Sac en toile durable et écologique"
        },
        {
            id: 5,
            name: "Mug Collector",
            image: "/api/placeholder/300/300",
            description: "Mug en céramique édition limitée"
        },
        {
            id: 6,
            name: "Stickers Pack",
            image: "/api/placeholder/300/300",
            description: "Ensemble de stickers exclusifs pour personnaliser vos objets"
        },
    ];

    return (
        <div id="merch" className="min-h-screen py-16 max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Merch
            </h2>
            <p className="mt-4 text-lg text-center text-black">
                Découvrez nos produits exclusifs !
            </p>
            
            {/* Grille de produits */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div 
                        key={product.id} 
                        className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        <div className="relative h-64 bg-gray-200 overflow-hidden">
                            <Image
                                src={product.image} 
                                alt={product.name} 
                                width={300} // Added width property
                                height={300} // Added height property
                                className="object-cover w-full h-full transition-all duration-500 hover:scale-110"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                            <p className="text-gray-600">{product.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}