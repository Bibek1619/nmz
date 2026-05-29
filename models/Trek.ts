import { ObjectId } from 'mongodb';

export interface ITrek {
  _id?: ObjectId;
  id: string; // URL-friendly ID (e.g., 'annapurna', 'mardi')
  name: string;
  subtext: string; // Short subtitle/tagline below the title
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Extreme';
  days: string;
  height: string; // Changed from altitude to match TrekEditor
  distance: string;
  price: string;
  image: string;
  description: string;
  bestSeason: string;
  highlights: string[];
  itinerary: {
    day: string | number;
    title: string;
    description: string;
  }[];
  included: string[];
  notIncluded: string[];
  featured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const TrekCollection = 'treks';
