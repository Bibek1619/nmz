import 'dotenv/config';
import { db } from '../lib/db';
import {
  IHero,
  HeroCollection,
  IAbout,
  AboutCollection,
  ITrek,
  TrekCollection,
  IBlog,
  BlogCollection,
} from '../models';

async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Seed Hero
    console.log('📝 Seeding Hero section...');
    const hero: Omit<IHero, '_id' | 'createdAt' | 'updatedAt'> = {
      title: 'Conquer the Himalayas.',
      subtitle: 'Professional Trekking Guide · Nepal',
      description:
        "I'm Rahul Thapa, a certified mountain guide with 10+ years leading adventurers through Nepal's most breathtaking routes.",
      backgroundImage: '/herooo.jpg',
      ctaButtons: {
        primary: {
          text: 'Explore Treks',
          link: '#featured',
        },
        secondary: {
          text: 'Book via WhatsApp',
          link: 'https://wa.me/9779841234567?text=Hello!%20I%20want%20to%20book%20a%20trek.',
        },
      },
      badge: {
        icon: 'Mountain',
        text: 'Professional Trekking Guide · Nepal',
      },
      isActive: true,
    };
    await db.insertOne(HeroCollection, hero);
    console.log('✅ Hero section seeded\n');

    // Seed About
    console.log('📝 Seeding About section...');
    const about: Omit<IAbout, '_id' | 'createdAt' | 'updatedAt'> = {
      name: 'Rahul Thapa',
      title: 'Professional Mountain Trekking Guide',
      bio: "Hi, I'm Rahul Thapa, a professional mountain trekking guide with over 10 years of experience guiding adventurers through Nepal's most spectacular mountain ranges. My passion for the mountains and dedication to safety has helped hundreds of trekkers achieve their dreams of conquering the Himalayas.",
      profileImage: '/profile.jpg',
      mainPageImage: '/profile.jpg',
      stats: {
        happyTrekkers: 500,
        successfulTreks: 100,
        yearsExperience: 10,
        routes: 15,
      },
      email: 'rahul@nmztrek.com',
      phone: '+977-9841234567',
      whatsapp: '+977-9841234567',
      socialLinks: {
        facebook: 'https://facebook.com/nmzrahul',
        instagram: 'https://instagram.com/nmzrahul',
      },
      certifications: [
        'Nepal Mountaineering Association Certified Guide',
        'Wilderness First Responder',
        'High Altitude Rescue Training',
      ],
      languages: ['English', 'Nepali', 'Hindi'],
      specializations: [
        'High Altitude Trekking',
        'Cultural Tours',
        'Photography Expeditions',
      ],
      isActive: true,
    };
    await db.insertOne(AboutCollection, about);
    console.log('✅ About section seeded\n');

    // Seed Treks
    console.log('📝 Seeding Treks...');
    const treks: Omit<ITrek, '_id' | 'createdAt' | 'updatedAt'>[] = [
      {
        id: 'annapurna',
        name: 'Annapurna Base Camp Trek',
        subtext: 'Surrounded by massive peaks',
        difficulty: 'Moderate',
        days: '7-8 days',
        height: '4,130 m',
        distance: '39 km',
        price: '$1,200',
        image: '/trek-annapurna.jpg',
        bestSeason: 'September - November, March - May',
        description:
          "Experience the stunning Annapurna Base Camp trek, one of Nepal's most iconic mountain routes. Trek through lush forests, charming villages, and reach the breathtaking base camp surrounded by prayer flags and panoramic mountain views.",
        highlights: [
          'Visit the picturesque Annapurna Base Camp',
          'Sleep in local tea houses along the route',
          'Experience traditional Nepali hospitality',
          'Witness incredible sunrise and sunset views',
          'Photo opportunities at prayer flag locations',
          'Meet local Sherpa communities',
        ],
        itinerary: [
          {
            day: 1,
            title: 'Pokhara to Nayapul',
            description:
              'Arrive in Pokhara and drive to Nayapul. Start trekking to Birethanti (1,025m).',
          },
          {
            day: 2,
            title: 'Birethanti to Ghorepani',
            description: 'Trek through rhododendron forests to Ghorepani (2,680m).',
          },
          {
            day: 3,
            title: 'Poon Hill Sunrise Trek',
            description:
              'Early morning trek to Poon Hill for stunning sunrise views, then trek to Tadapani.',
          },
          {
            day: 4,
            title: 'Tadapani to Chhile',
            description: 'Descend through forests and reach Chhile (2,580m).',
          },
          {
            day: 5,
            title: 'Chhile to Sinuwa to Deurali',
            description: 'Trek to Sinuwa and continue to Deurali (2,700m).',
          },
          {
            day: 6,
            title: 'Deurali to Annapurna Base Camp',
            description:
              'Reach the stunning Annapurna Base Camp (4,130m) with incredible panoramic views.',
          },
          {
            day: 7,
            title: 'Annapurna Base Camp to Bamboo',
            description: 'Trek back down to Bamboo (2,310m).',
          },
          {
            day: 8,
            title: 'Bamboo to Pokhara',
            description: 'Final descent to Pokhara, transfer to hotel.',
          },
        ],
        included: [
          'Experienced mountain guide',
          '7 nights in tea houses',
          'All meals during trekking',
          'Basic travel insurance',
          'Trekking permits',
          'Transportation from Pokhara',
        ],
        notIncluded: [
          'International flights',
          'Pokhara accommodation',
          'Travel insurance (optional)',
          'Personal trekking gear',
          'Tips for guides',
        ],
        featured: true,
        isActive: true,
      },
      {
        id: 'mardi',
        name: 'Mardi Himal Trek',
        subtext: 'Perfect beginner trek',
        difficulty: 'Easy',
        days: '5-6 days',
        height: '4,500 m',
        distance: '30 km',
        price: '$900',
        image: '/trek-mardi.jpg',
        bestSeason: 'October - November, March - April',
        description:
          'The perfect beginner-friendly trek offering incredible mountain panoramas. Mardi Himal provides stunning views of Machhapuchare, Annapurna, and Dhaulagiri without the crowds of other popular routes.',
        highlights: [
          'Panoramic mountain views',
          'Less crowded than Annapurna routes',
          'Perfect for beginners',
          'Visit charming Nepali villages',
          'Experience authentic mountain life',
          'Excellent value for money',
        ],
        itinerary: [
          {
            day: 1,
            title: 'Pokhara to Kande',
            description: 'Drive to Kande and start trekking to Forest Camp.',
          },
          {
            day: 2,
            title: 'Forest Camp to Mardi Himal Base Camp',
            description: 'Trek through forests to reach Mardi Himal Base Camp.',
          },
          {
            day: 3,
            title: 'Mardi Himal Base Camp Summit',
            description:
              'Early morning trek to Mardi Himal (4,500m) for panoramic views.',
          },
          {
            day: 4,
            title: 'Descent to Sangda',
            description: 'Trek down to the village of Sangda.',
          },
          {
            day: 5,
            title: 'Sangda to Pokhara',
            description: 'Final descent and drive back to Pokhara.',
          },
        ],
        included: [
          'Professional mountain guide',
          '4 nights accommodation',
          'All meals included',
          'Trekking permits',
          'Porter service',
          'Transportation',
        ],
        notIncluded: [
          'International flights',
          'Pre-trek accommodation',
          'Personal equipment',
          'Travel insurance',
          'Tips',
        ],
        featured: true,
        isActive: true,
      },
      {
        id: 'everest',
        name: 'Everest Base Camp Trek',
        subtext: 'The ultimate challenge',
        difficulty: 'Hard',
        days: '14 days',
        height: '5,364 m',
        distance: '130 km',
        price: '$2,500',
        image: '/trek-annapurna.jpg',
        bestSeason: 'September - November, March - May',
        description:
          "The ultimate trekking challenge. Trek to the base camp of the world's highest mountain, experiencing stunning Himalayan scenery, meeting Sherpa communities, and standing at the foot of Mount Everest.",
        highlights: [
          'Trek to Everest Base Camp (5,364m)',
          'Witness Mount Everest up close',
          'Meet legendary Sherpa communities',
          'Experience high-altitude trekking',
          'Visit Buddhist monasteries',
          'Incredible mountain photography',
        ],
        itinerary: [
          {
            day: '1-2',
            title: 'Kathmandu to Lukla',
            description: 'Fly to Lukla and trek to Phakding.',
          },
          {
            day: '3-4',
            title: 'Phakding to Namche Bazaar',
            description: 'Trek to Namche Bazaar with acclimatization day.',
          },
          {
            day: '5-6',
            title: 'Namche to Tengboche',
            description: 'Trek to Tengboche monastery (3,867m).',
          },
          {
            day: '7-8',
            title: 'Tengboche to Pheriche',
            description: 'Trek to Pheriche with acclimatization.',
          },
          {
            day: '9-10',
            title: 'Pheriche to Gorak Shep',
            description: 'Trek to Gorak Shep (5,164m).',
          },
          {
            day: 11,
            title: 'Everest Base Camp',
            description: 'Trek to Everest Base Camp (5,364m) - the pinnacle!',
          },
          {
            day: '12-14',
            title: 'Return Trek',
            description: 'Trek back down to Lukla and fly to Kathmandu.',
          },
        ],
        included: [
          'Expert Everest guide',
          'All trekking permits',
          'All accommodations',
          'Meals during trek',
          'Domestic flights',
          'Porter and guide',
        ],
        notIncluded: [
          'International flights',
          'International travel insurance',
          'Personal climbing gear',
          'Oxygen and climbing equipment',
          'Pre-trek accommodation',
        ],
        featured: true,
        isActive: true,
      },
    ];
    await db.insertMany(TrekCollection, treks);
    console.log(`✅ ${treks.length} treks seeded\n`);

    // Seed Blogs
    console.log('📝 Seeding Blogs...');
    const blogs: Omit<IBlog, '_id' | 'createdAt' | 'updatedAt'>[] = [
      {
        id: 'preparing-for-annapurna',
        title: 'Essential Guide to Preparing for Annapurna Base Camp Trek',
        slug: 'preparing-for-annapurna',
        excerpt:
          'Everything you need to know before embarking on the Annapurna Base Camp trek, from fitness preparation to packing essentials.',
        content: `
# Essential Guide to Preparing for Annapurna Base Camp Trek

The Annapurna Base Camp trek is one of Nepal's most popular treks, offering stunning mountain views and cultural experiences. Here's everything you need to prepare for this incredible journey.

## Physical Preparation

Start training at least 2-3 months before your trek. Focus on:
- Cardiovascular exercises (running, cycling, swimming)
- Leg strength training
- Hiking with a weighted backpack
- Altitude simulation if possible

## What to Pack

### Essential Gear
- Good quality trekking boots (broken in)
- Warm sleeping bag (-10°C rated)
- Layered clothing system
- Rain jacket and pants
- Trekking poles
- Headlamp with extra batteries

### Clothing
- Base layers (thermal)
- Fleece jacket
- Down jacket
- Trekking pants
- Warm hat and gloves
- Sun hat and sunglasses

## Best Time to Trek

The ideal seasons are:
- Spring (March-May): Clear skies, blooming rhododendrons
- Autumn (September-November): Stable weather, excellent visibility

## Permits Required

- TIMS Card (Trekkers' Information Management System)
- Annapurna Conservation Area Permit (ACAP)

Your guide will help arrange these permits.

## Altitude Acclimatization

Take it slow and follow these tips:
- Ascend gradually
- Stay hydrated
- Listen to your body
- Don't skip acclimatization days

Ready to start your adventure? Contact us to book your trek!
        `,
        coverImage: '/trek-annapurna.jpg',
        author: {
          name: 'Rahul Thapa',
          avatar: '/profile.jpg',
          bio: 'Professional mountain guide with 10+ years of experience',
        },
        category: 'Trekking Tips',
        tags: ['Annapurna', 'Preparation', 'Trekking Guide', 'Nepal'],
        featured: true,
        published: true,
        views: 0,
        readTime: '8 min read',
        publishedAt: new Date('2024-01-15'),
      },
      {
        id: 'best-season-nepal-trekking',
        title: 'Best Seasons for Trekking in Nepal',
        slug: 'best-season-nepal-trekking',
        excerpt:
          'Discover the optimal times to trek in Nepal and what to expect in each season.',
        content: `
# Best Seasons for Trekking in Nepal

Nepal offers year-round trekking opportunities, but certain seasons provide better conditions for specific treks.

## Spring (March to May)

### Advantages
- Clear mountain views
- Rhododendron forests in full bloom
- Moderate temperatures
- Stable weather patterns

### Best Treks
- Annapurna Base Camp
- Everest Base Camp
- Langtang Valley

## Autumn (September to November)

### Advantages
- Crystal clear skies
- Best visibility for mountain views
- Comfortable temperatures
- Dry trails
- Festival season (Dashain, Tihar)

### Best Treks
- All major treks
- Peak trekking season

## Monsoon (June to August)

### Considerations
- Heavy rainfall
- Leeches on trails
- Cloud cover limiting views
- Good for rain shadow areas

### Recommended Treks
- Upper Mustang
- Dolpo
- Upper Manang

## Winter (December to February)

### Considerations
- Cold temperatures at high altitude
- Snow on high passes
- Clear skies
- Fewer trekkers

### Best Treks
- Lower altitude treks
- Annapurna Base Camp (with proper gear)
- Poon Hill

Choose your season based on your preferences and the trek you want to do!
        `,
        coverImage: '/gallery-1.jpg',
        author: {
          name: 'Rahul Thapa',
          avatar: '/profile.jpg',
          bio: 'Professional mountain guide with 10+ years of experience',
        },
        category: 'Travel Planning',
        tags: ['Nepal', 'Seasons', 'Weather', 'Planning'],
        featured: true,
        published: true,
        views: 0,
        readTime: '6 min read',
        publishedAt: new Date('2024-02-01'),
      },
    ];
    await db.insertMany(BlogCollection, blogs);
    console.log(`✅ ${blogs.length} blogs seeded\n`);

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run the seed function
seedDatabase()
  .then(() => {
    console.log('\n✅ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
