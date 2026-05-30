import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { IReview, ReviewCollection } from '@/models/Review';
import { ObjectId } from 'mongodb';

// GET - Fetch all reviews (including pending)
export async function GET() {
  try {
    const reviews = await db.findAll<IReview>(
      ReviewCollection,
      {},
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

// PUT - Update review (approve/reject)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json(
        { error: 'Review ID is required' },
        { status: 400 }
      );
    }
    
    const success = await db.updateOne(
      ReviewCollection,
      { _id: new ObjectId(_id) },
      updateData
    );
    
    if (!success) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

// DELETE - Delete review
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Review ID is required' },
        { status: 400 }
      );
    }
    
    const success = await db.deleteOne(ReviewCollection, { _id: new ObjectId(id) });
    
    if (!success) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}
