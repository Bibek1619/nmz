import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { TrekCollection, ITrek } from '@/models/Trek';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch only featured treks
    const treks = await db.findAll<ITrek>(
      TrekCollection, 
      { isActive: true, featured: true },
      { limit: 3 }
    );
    
    // Serialize the data to remove MongoDB-specific objects
    const serializedTreks = JSON.parse(JSON.stringify(treks));
    
    return NextResponse.json(serializedTreks);
  } catch (error) {
    console.error('Error fetching featured treks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured treks' },
      { status: 500 }
    );
  }
}
