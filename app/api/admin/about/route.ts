import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { AboutCollection, IAbout } from '@/models';

// GET - Fetch current about data
export async function GET() {
  try {
    const aboutData = await db.findOne<IAbout>(AboutCollection, { isActive: true });
    
    if (!aboutData) {
      return NextResponse.json({ error: 'About data not found' }, { status: 404 });
    }

    return NextResponse.json(aboutData);
  } catch (error) {
    console.error('Error fetching about data:', error);
    return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 });
  }
}

// PUT - Update about data
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // Remove _id from update data if present
    const { _id, ...updateData } = body;
    
    // Add updatedAt timestamp
    updateData.updatedAt = new Date();
    
    // Find the active about document and update it
    const result = await db.updateOne(
      AboutCollection,
      { isActive: true },
      updateData
    );

    if (!result) {
      return NextResponse.json({ error: 'About data not found' }, { status: 404 });
    }

    // Fetch and return updated data
    const updatedAbout = await db.findOne<IAbout>(AboutCollection, { isActive: true });
    
    return NextResponse.json({ 
      success: true, 
      message: 'About data updated successfully',
      data: updatedAbout 
    });
  } catch (error) {
    console.error('Error updating about data:', error);
    return NextResponse.json({ error: 'Failed to update about data' }, { status: 500 });
  }
}
