import { Navigation } from '@/components/navigation'
import { db } from '@/lib/db'
import { GalleryCollection, IGallery } from '@/models/Gallery'
import GalleryClient from './GalleryClient'

// Enable static generation with revalidation
export const revalidate = 3600; // Revalidate every hour

export default async function GalleryPage() {
  // Fetch gallery images from database (server-side)
  let galleryImages: IGallery[] = [];
  
  try {
    const data = await db.findAll<IGallery>(GalleryCollection, { isActive: true });
    // Serialize the data to remove MongoDB-specific objects
    if (data) {
      galleryImages = JSON.parse(JSON.stringify(data));
    }
  } catch (error) {
    console.error('Error fetching gallery images:', error);
  }

  return (
    <main className="w-full overflow-hidden">
      <Navigation />
      <GalleryClient images={galleryImages} />
    </main>
  )
}
