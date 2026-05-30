import { ObjectId } from 'mongodb';

export interface IReview {
  _id?: ObjectId;
  fullName: string;
  address: string;
  trekName: string;
  rating: number; // 1-5
  comment: string;
  images: string[]; // Array of Cloudinary URLs
  approved: boolean;
  featured?: boolean; // Featured reviews show on homepage
  createdAt: Date;
  updatedAt: Date;
}

export const ReviewCollection = 'reviews';
