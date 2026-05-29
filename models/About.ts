import { ObjectId } from 'mongodb';

export interface IAbout {
  _id?: ObjectId;
  // Personal Information
  name: string;
  title: string; // e.g., "Professional Mountain Guide"
  bio: string; // About yourself description
  profileImage: string; // For /about page
  mainPageImage: string; // For homepage animated image
  
  // Statistics
  stats: {
    happyTrekkers: number; // Number of happy trekkers/clients
    successfulTreks: number; // Total number of treks completed
    yearsExperience: number; // Years of experience
    routes: number; // Number of routes/destinations
  };
  
  // Contact & Social
  email?: string;
  phone?: string;
  whatsapp?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  
  // Certifications & Skills
  certifications?: string[];
  languages?: string[];
  specializations?: string[];
  
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const AboutCollection = 'about';
