import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { TrekCollection, ITrek } from '@/models/Trek';

export const dynamic = 'force-dynamic';

// GET - Fetch all treks
export async function GET() {
  try {
    const treks = await db.findAll<ITrek>(TrekCollection, {});
    const serialized = JSON.parse(JSON.stringify(treks));
    return NextResponse.json(serialized);
  } catch (error) {
    console.error('Error fetching treks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch treks' },
      { status: 500 }
    );
  }
}

// POST - Add new trek
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      name,
      subtext,
      difficulty,
      days,
      height,
      distance,
      price,
      image,
      description,
      bestSeason,
      highlights,
      itinerary,
      included,
      notIncluded,
      featured,
    } = body;

    if (!id || !name) {
      return NextResponse.json(
        { error: 'ID and name are required' },
        { status: 400 }
      );
    }

    const newTrek: Omit<ITrek, '_id' | 'createdAt' | 'updatedAt'> = {
      id,
      name,
      subtext: subtext || '',
      difficulty: difficulty || 'Moderate',
      days: days || '',
      height: height || '',
      distance: distance || '',
      price: price || '',
      image: image || '',
      description: description || '',
      bestSeason: bestSeason || '',
      highlights: highlights || [],
      itinerary: itinerary || [],
      included: included || [],
      notIncluded: notIncluded || [],
      featured: featured || false,
      isActive: true,
    };

    const result = await db.insertOne(TrekCollection, newTrek);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error adding trek:', error);
    return NextResponse.json(
      { error: 'Failed to add trek' },
      { status: 500 }
    );
  }
}

// PUT - Update trek
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Trek ID is required' },
        { status: 400 }
      );
    }

    const success = await db.updateOne(
      TrekCollection,
      { id },
      { ...updateData, updatedAt: new Date() }
    );

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Trek not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error updating trek:', error);
    return NextResponse.json(
      { error: 'Failed to update trek' },
      { status: 500 }
    );
  }
}

// DELETE - Remove trek
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Trek ID is required' },
        { status: 400 }
      );
    }

    const success = await db.deleteOne(TrekCollection, { id });

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Trek not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error deleting trek:', error);
    return NextResponse.json(
      { error: 'Failed to delete trek' },
      { status: 500 }
    );
  }
}
