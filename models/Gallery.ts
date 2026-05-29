import { ObjectId } from 'mongodb';

export interface IGallery {
  _id?: ObjectId;
  title: string;
  image: string; // Cloudinary URL
  publicId?: string; // Cloudinary public ID for deletion
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const GalleryCollection = 'gallery';
