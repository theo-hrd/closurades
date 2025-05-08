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