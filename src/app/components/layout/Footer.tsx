"use client";

import { usePathname } from "next/navigation";

export default function ArtistList()
{
    const pathname = usePathname();
    
    // Ne pas afficher le footer sur la page truite-ou-couille
    if (pathname === "/truite-ou-couille") {
        return null;
    }

    return (   
        <footer className="bg-black py-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 text-center flex flex-col md:flex-row justify-center md:justify-between items-center gap-2 md:gap-0">
                <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Les Closurades Festival.
                </p>
                <div className="flex items-center gap-4">
                    <p className="text-xs md:text-sm">
                        Made by TWENTYHATE with ❤️
                    </p>
                </div>
            </div>
        </footer>
    );
}
