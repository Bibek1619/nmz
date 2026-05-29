import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { TrekCollection, ITrek } from '@/models/Trek';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const treks = await db.findAll<ITrek>(TrekCollection, { isActive: true });
    
    // Serialize the data to remove MongoDB-specific objects
    const serializedTreks = JSON.parse(JSON.stringify(treks));
    
    return NextResponse.json(serializedTreks);
  } catch (error) {
    console.error('Error fetching treks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch treks' },
      { status: 500 }
    );
  }
}
