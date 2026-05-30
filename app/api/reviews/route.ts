import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { IReview, ReviewCollection } from '@/models/Review';

// GET - Fetch approved reviews
export async function GET() {
  try {
    const reviews = await db.findAll<IReview>(
      ReviewCollection,
      { approved: true },
      { sort: { createdAt: -1 } }
    );
    
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST - Submit new review (pending approval)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const review: Omit<IReview, '_id' | 'createdAt' | 'updatedAt'> = {
      fullName: body.fullName,
      address: body.address,
      trekName: body.trekName,
      rating: body.rating,
      comment: body.comment,
      images: body.images || [],
      approved: false, // Pending approval by default
    };
    
    const newReview = await db.insertOne(ReviewCollection, review);
    
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
