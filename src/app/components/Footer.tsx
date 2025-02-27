"use client";

export default function ArtistList()
{
    return (   
        <footer className="bg-black py-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Les Closurades Festival.
                </p>
            </div>
        </footer>
    );
}
