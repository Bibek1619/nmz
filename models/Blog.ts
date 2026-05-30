import { ObjectId } from 'mongodb';

export interface IBlog {
  _id?: ObjectId;
  id: string; // URL-friendly ID
  title: string; // Main headline
  slug: string; // URL slug
  subtext: string; // Short description that supports headline
  category: string; // e.g., "Health & Safety", "Trek Tips", etc.
  content: string; // Rich HTML content with formatting
  coverImage?: string;
  featured: boolean;
  published: boolean;
  views: number;
  readTime?: string; // e.g., "5 min read"
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const BlogCollection = 'blogs';
