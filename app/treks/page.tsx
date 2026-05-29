import { Navigation } from '@/components/navigation'
import { db } from '@/lib/db'
import { TrekCollection, ITrek } from '@/models/Trek'
import TreksClient from './TreksClient'

// Enable static generation with revalidation
export const revalidate = 3600; // Revalidate every hour

export default async function TreksPage() {
  // Fetch treks from database (server-side)
  let treksData: ITrek[] = [];
  
  try {
    const data = await db.findAll<ITrek>(TrekCollection, { isActive: true });
    // Serialize the data to remove MongoDB-specific objects
    if (data) {
      treksData = JSON.parse(JSON.stringify(data));
    }
  } catch (error) {
    console.error('Error fetching treks:', error);
  }
  return (
    <main className="w-full min-h-screen bg-background">
      <Navigation />
      <TreksClient treksData={treksData} />
    </main>
  )
}
