import { ObjectId } from 'mongodb';

export interface IContact {
  _id?: ObjectId;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  trekInterest?: string; // Trek they're interested in
  preferredDate?: Date;
  numberOfPeople?: number;
  status: 'new' | 'read' | 'replied' | 'archived';
  replied: boolean;
  replyMessage?: string;
  repliedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const ContactCollection = 'contacts';
