import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { db } from '@/lib/db'
import { AboutCollection, IAbout } from '@/models'
import { TrekCollection, ITrek } from '@/models/Trek'
import HomeClient from './HomeClient'

// Enable static generation with revalidation
export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  // Fetch about data from database (server-side)
  let aboutData: IAbout | null = null;
  let featuredTreks: ITrek[] = [];
  
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

  return (
    <main className="w-full overflow-hidden">
      <Navigation />
      <HeroSection />
      <HomeClient aboutData={aboutData} featuredTreks={featuredTreks} />
    </main>
  )
}
