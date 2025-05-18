import Image from "next/image";

export default function Merch() {
    // Liste des produits
    const products = [
        {
            id: 1,
            name: "T-shirt Closurades 2025",
            image: "/artists/question.webp",
            description: "T-shirt exclusif avec notre logo 2025"
        },
        {
            id: 2,
            name: "T-shirt upcyclé Closurades",
            image: "/artists/question.webp",
            description: "T-shirt upcyclé avec le logo Closurades"
        },
        {
            id: 3,
            name: "T-shirt Closurades 4 Mascottes",
            image: "/artists/question.webp",
            description: "T-shirt exclusif avec notre logo 2025 avec ses 4 mascottes"
        },
        {
            id: 4,
            name: "Tote Bag",
            image: "/artists/question.webp",
            description: "Sac en toile durable et écologique"
        },
        {
            id: 5,
            name: "Stickers",
            image: "/artists/question.webp",
            description: "Stickers avec notre logo"
        },
        {
            id: 6,
            name: "Affiche Closurades 2025",
            image: "/artists/question.webp",
            description: "Affiche des closurades avec la line up 2025"
        },
    ];

    return (
        <div id="merch" className="min-h-screen py-12 max-w-7xl mx-auto px-6">
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