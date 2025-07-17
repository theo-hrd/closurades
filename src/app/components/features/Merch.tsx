import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCw, Loader2 } from "lucide-react";

type ProductVariant = {
    front: string;
    back?: string;
};

type Product = {
    id: number;
    name: string;
    image: string;
    description: string;
    isShirt: boolean;
    colors?: string[];
    views?: string[];
    variants?: {
        [color: string]: ProductVariant;
    };
};

export default function Merch() {
    // Liste des produits
    const products: Product[] = [
        {
            id: 1,
            name: "T-shirt Closurades 2025",
            image: "/merch/tshirt2025-bleu-front.webp", // Image par défaut
            description: "T-shirt exclusif avec notre logo 2025",
            isShirt: true,
            colors: ["bleu", "orange", "vert"],
            views: ["front", "back"],
            variants: {
                "bleu": {
                    "front": "/merch/tshirt2025-bleu-front.webp",
                    "back": "/merch/tshirt2025-bleu-back.webp"
                },
                "orange": {
                    "front": "/merch/tshirt2025-orange-front.webp",
                    "back": "/merch/tshirt2025-orange-back.webp"
                },
                "vert": {
                    "front": "/merch/tshirt2025-vert-front.webp",
                    "back": "/merch/tshirt2025-vert-back.webp"
                }
            }
        },
        {
            id: 2,
            name: "Tote Bag",
            image: "/merch/tote-bleu.webp",
            description: "Sac en toile durable et écologique",
            isShirt: true, // Changé à true pour activer les contrôles de couleur
            colors: ["bleu", "orange", "vert"],
            views: ["front"], // Uniquement vue de face
            variants: {
                "bleu": {
                    "front": "/merch/tote-bleu.webp",
                },
                "orange": {
                    "front": "/merch/tote-orange.webp",
                },
                "vert": {
                    "front": "/merch/tote-vert.webp",
                }
            }
        },
        {
            id: 3,
            name: "T-shirt patch Closurades",
            image: "/artists/question.webp",
            description: "",
            isShirt: true,
            colors: ["bleu", "noir"],
            variants: {
                "bleu": {
                    "front": "/merch/lison/bleu_patch.webp",
                },
                "noir": {
                    "front": "/merch/lison/noir_patch.webp",
                }
            }
        },
        {
            id: 4,
            name: "T-shirt patch 2 Closurades",
            image: "/artists/question.webp",
            description: "",
            isShirt: true,
            colors: ["bleu", "blanc", "vert"],
            variants: {
                "bleu": {
                    "front": "/merch/lison/bleu_inti.webp",
                },
                "blanc": {
                    "front": "/merch/lison/blanc_inti.webp",
                },
                "vert": {
                    "front": "/merch/lison/vert_inti.webp",
                }
            }
        }
    ];

    // State pour suivre la couleur et la vue de chaque produit
    const [productStates, setProductStates] = useState(
        products.reduce((acc: Record<number, { colorIndex: number, view: string }>, product) => {
            if (product.isShirt) {
                acc[product.id] = { colorIndex: 0, view: "front" };
            }
            return acc;
        }, {} as Record<number, { colorIndex: number, view: string }>)
    );

    // State pour suivre l'état de chargement des images
    const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});

    // Fonction pour changer la couleur d'un t-shirt
    const changeColor = (productId: number, direction: 'next' | 'prev') => {
        setLoadingStates(prev => ({ ...prev, [productId]: true }));
        
        setProductStates(prev => {
            const product = products.find(p => p.id === productId);
            const currentIndex = prev[productId].colorIndex;
            let newIndex;
            
            if (!product || !product.colors) {
                return prev; // Return unchanged state if product not found
            }
            
            if (direction === "next") {
                newIndex = (currentIndex + 1) % product.colors.length;
            } else {
                newIndex = (currentIndex - 1 + product.colors.length) % product.colors.length;
            }
            
            return {
                ...prev,
                [productId]: {
                    ...prev[productId],
                    colorIndex: newIndex
                }
            };
        });
    };

    // Fonction pour basculer entre vue avant/arrière
    const toggleView = (productId: number) => {
        setLoadingStates(prev => ({ ...prev, [productId]: true }));
        
        setProductStates(prev => {
            const currentView = prev[productId].view;
            const newView = currentView === "front" ? "back" : "front";
            
            return {
                ...prev,
                [productId]: {
                    ...prev[productId],
                    view: newView
                }
            };
        });
    };

    // Fonction pour gérer la fin de chargement d'une image
    const handleImageLoad = (productId: number) => {
        setLoadingStates(prev => ({ ...prev, [productId]: false }));
    };

    // Fonction pour générer l'URL de l'image en fonction de l'état
    const getImageUrl = (product: Product) => {
        if (!product.isShirt) return product.image;
        
        const state = productStates[product.id];
        const color = product.colors?.[state.colorIndex] || 'bleu';
        const view = state.view;
        
        // Si le produit a des variantes d'images spécifiques, on les utilise
        if (product.variants && product.variants[color]) {
            // Pour les produits qui ont seulement une face (comme les tote bags)
            if (view === 'back' && !product.variants[color].back) {
                return product.variants[color].front;
            }
            
            // Sinon on retourne la vue demandée
            return view === 'front' ? product.variants[color].front : 
                  (product.variants[color].back || product.variants[color].front);
        }
        
        // Sinon on revient à l'image par défaut
        return product.image;
    };

    return (
        <div id="merch" className="min-h-screen py-12 max-w-7xl mx-auto px-6">
            <div className="flex justify-center items-center mb-4">
                <Image
                    src="/titles/merch.webp"
                    alt="Merch Closurades"
                    width={400}
                    height={80}
                    className="object-contain"
                    priority
                />
            </div>
            <p className="mt-4 text-lg text-center text-black">
                Notre Merch Closurades 2025 !
            </p>
            
            {/* Grille de produits */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-10">
                {products.map((product) => (
                    <div 
                        key={product.id} 
                        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-gray-100 group"
                    >
                        <div className="relative bg-white overflow-hidden" style={{ height: "480px" }}>
                            {product.isShirt && product.views?.includes("back") && (
                                <div className="absolute top-4 right-4 z-10 flex space-x-2">
                                    <button 
                                        onClick={() => toggleView(product.id)}
                                        className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all"
                                        aria-label="Toggle front/back view"
                                    >
                                        <RotateCw size={20} className="text-gray-700" />
                                    </button>
                                </div>
                            )}
                            
                            <div className="w-full h-full flex items-center justify-center overflow-hidden">
                                {loadingStates[product.id] && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                                        <Loader2 size={40} className="animate-spin text-gray-700" />
                                    </div>
                                )}
                                <Image
                                    src={getImageUrl(product)}
                                    alt={product.name} 
                                    width={900}
                                    height={900}
                                    className="w-full h-full object-cover md:object-contain transition-all duration-500 group-hover:scale-105"
                                    priority={product.id <= 2}
                                    onLoad={() => handleImageLoad(product.id)}
                                />
                            </div>
                            
                            {product.isShirt && (
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center bg-white/80 backdrop-blur-sm rounded-full shadow-md px-2">
                                    <button 
                                        onClick={() => changeColor(product.id, "prev")}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-all"
                                        aria-label="Previous color"
                                        disabled={loadingStates[product.id]}
                                    >
                                        <ChevronLeft size={20} className={`${loadingStates[product.id] ? 'text-gray-400' : 'text-gray-700'}`} />
                                    </button>
                                    
                                    <div className="px-2 text-sm font-medium text-gray-700 capitalize">
                                        {product.colors?.[productStates[product.id].colorIndex] || 'bleu'}
                                    </div>
                                    
                                    <button 
                                        onClick={() => changeColor(product.id, "next")}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-all"
                                        aria-label="Next color"
                                        disabled={loadingStates[product.id]}
                                    >
                                        <ChevronRight size={20} className={`${loadingStates[product.id] ? 'text-gray-400' : 'text-gray-700'}`} />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                            <p className="text-gray-600">{product.description}</p>
                            {product.isShirt && (
                                <div className="mt-3 flex space-x-2">
                                    {product.colors?.map((color, index) => (
                                        <button 
                                            key={color}
                                            onClick={() => {
                                                if (!loadingStates[product.id]) {
                                                    setLoadingStates(prev => ({ ...prev, [product.id]: true }));
                                                    setProductStates(prev => ({
                                                        ...prev,
                                                        [product.id]: { ...prev[product.id], colorIndex: index }
                                                    }));
                                                }
                                            }}
                                            className={`w-6 h-6 rounded-full border ${
                                                productStates[product.id].colorIndex === index 
                                                    ? 'ring-2 ring-offset-2 ring-red-500' 
                                                    : 'border-gray-300'
                                            }`}
                                            style={{ 
                                                backgroundColor: 
                                                    color === 'bleu' ? '#1e40af' : 
                                                    color === 'orange' ? '#ea580c' : 
                                                    color === 'vert' ? '#16a34a' : 
                                                    color === 'noir' ? '#000000' : 
                                                    color === 'blanc' ? '#f9f9f9' : 
                                                    color
                                            }}
                                            aria-label={`Select ${color} color`}
                                            disabled={loadingStates[product.id]}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}