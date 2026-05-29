import { ObjectId } from 'mongodb';

export interface IHero {
  _id?: ObjectId;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  ctaButtons: {
    primary: {
      text: string;
      link: string;
    };
    secondary: {
      text: string;
      link: string;
    };
  };
  badge: {
    icon: string;
    text: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const HeroCollection = 'heroes';
