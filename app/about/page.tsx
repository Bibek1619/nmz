import { Navigation } from '@/components/navigation'
import { db } from '@/lib/db'
import { AboutCollection, IAbout } from '@/models'
import AboutClient from './AboutClient'

// Enable static generation with revalidation
export const revalidate = 3600; // Revalidate every hour

export default async function About() {
  // Fetch about data from database (server-side)
  const aboutData = await db.findOne<IAbout>(AboutCollection, { isActive: true });
  
  if (!aboutData) {
    return <div>About section not found</div>;
  }

  // Pass data to client component
  return (
    <>
      <Navigation />
      <AboutClient aboutData={aboutData} />
    </>
  );
}
