import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { db } from '@/lib/db'
import { AboutCollection, IAbout, HeroCollection, IHero } from '@/models'
import { TrekCollection, ITrek } from '@/models/Trek'
import { ReviewCollection, IReview } from '@/models/Review'
import HomeClient from './HomeClient'

// Enable static generation with revalidation
export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  // Fetch hero data from database
  let heroData: IHero | null = null;
  try {
    const heroes = await db.findAll<IHero>(HeroCollection, { isActive: true });
    if (heroes && heroes.length > 0) {
      heroData = JSON.parse(JSON.stringify(heroes[0]));
    }
  } catch (error) {
    console.error('Error fetching hero data:', error);
  }

  // Fetch about data from database (server-side)
  let aboutData: IAbout | null = null;
  let featuredTreks: ITrek[] = [];
  let featuredReviews: IReview[] = [];
  
  try {
    const data = await db.findOne<IAbout>(AboutCollection, { isActive: true });
    // Serialize the data to remove MongoDB-specific objects
    if (data) {
      aboutData = JSON.parse(JSON.stringify(data));
    }
  } catch (error) {
    console.error('Error fetching about data:', error);
  }

  // Fetch featured treks from database
  try {
    const treks = await db.findAll<ITrek>(
      TrekCollection, 
      { isActive: true, featured: true },
      { limit: 3 }
    );
    if (treks) {
      featuredTreks = JSON.parse(JSON.stringify(treks));
    }
  } catch (error) {
    console.error('Error fetching featured treks:', error);
  }

  // Fetch featured reviews from database
  try {
    const reviews = await db.findAll<IReview>(
      ReviewCollection, 
      { approved: true, featured: true },
      { limit: 3, sort: { createdAt: -1 } }
    );
    if (reviews) {
      featuredReviews = JSON.parse(JSON.stringify(reviews));
    }
  } catch (error) {
    console.error('Error fetching featured reviews:', error);
  }

  return (
    <main className="w-full overflow-hidden">
      <Navigation />
      <HeroSection heroData={heroData} />
      <HomeClient aboutData={aboutData} featuredTreks={featuredTreks} featuredReviews={featuredReviews} />
    </main>
  )
}
