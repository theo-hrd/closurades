// Define common types used across the application

export interface Artist {
  name: string;
  image?: string;
  description?: string;
  social?: {
    instagram?: string;
    facebook?: string;
    spotify?: string;
  };
}

export interface MerchItem {
  id: string;
  name: string;
  price: string;
  image: string;
  description?: string;
}

export interface FestivalDay {
  date: string;
  artists: Artist[];
}

export interface Artiste {
  id: number;
  nom: string;
  photo: string;
  genre: string;
  heure: string;
  origine: string;
  description: string;
}

export interface ArtistesData {
  j1: Artiste[];
  j2: Artiste[];
}