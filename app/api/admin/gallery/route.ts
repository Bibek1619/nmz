import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { GalleryCollection, IGallery } from '@/models/Gallery';

export const dynamic = 'force-dynamic';

// GET - Fetch all gallery images
export async function GET() {
  try {
    const images = await db.findAll<IGallery>(GalleryCollection, { isActive: true });
    const serialized = JSON.parse(JSON.stringify(images));
    return NextResponse.json(serialized);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery' },
      { status: 500 }
    );
  }
}

// POST - Add new gallery image
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, image, publicId, description } = body;

    if (!title || !image) {
      return NextResponse.json(
        { error: 'Title and image are required' },
        { status: 400 }
      );
    }

    const newImage: Omit<IGallery, '_id' | 'createdAt' | 'updatedAt'> = {
      title,
      image,
      publicId,
      description: description || '',
      isActive: true,
    };

    const result = await db.insertOne(GalleryCollection, newImage);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error adding gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to add image' },
      { status: 500 }
    );
  }
}

// DELETE - Remove gallery image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      );
    }

    const success = await db.deleteOne(GalleryCollection, { _id: id });
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
