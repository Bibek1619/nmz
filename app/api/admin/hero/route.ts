import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { IHero, HeroCollection } from '@/models/Hero';

// GET - Fetch hero data
export async function GET() {
  try {
    const heroes = await db.findAll<IHero>(HeroCollection, { isActive: true });
    const hero = heroes[0] || null;
    
    return NextResponse.json(hero);
  } catch (error) {
    console.error('Error fetching hero:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero data' },
      { status: 500 }
    );
  }
}

// PUT - Update hero data
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Find existing hero
    const heroes = await db.findAll<IHero>(HeroCollection, { isActive: true });
    
    if (heroes.length === 0) {
      // Create new hero if none exists
      const newHero: Omit<IHero, '_id' | 'createdAt' | 'updatedAt'> = {
        title: body.title,
        subtitle: body.subtitle,
        backgroundImage: body.image,
        ctaButtons: body.ctaButtons || {
          primary: { text: 'Explore Treks', link: '#featured' },
          secondary: { text: 'Book via WhatsApp', link: 'https://wa.me/9779841234567' }
        },
        badge: body.badge || {
          icon: 'Mountain',
          text: 'Professional Trekking Guide · Nepal'
        },
        isActive: true,
      };
      
      await db.insertOne(HeroCollection, newHero);
    } else {
      // Update existing hero
      const hero = heroes[0];
      await db.updateOne(
        HeroCollection,
        { _id: hero._id },
        {
          title: body.title,
          subtitle: body.subtitle,
          backgroundImage: body.image,
        }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating hero:', error);
    return NextResponse.json(
      { error: 'Failed to update hero data' },
      { status: 500 }
    );
  }
}
