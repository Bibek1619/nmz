import { ObjectId } from 'mongodb';

export interface IBlog {
  _id?: ObjectId;
  id: string; // URL-friendly ID
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  views: number;
  readTime: string; // e.g., "5 min read"
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const BlogCollection = 'blogs';
