import { Navigation } from '@/components/navigation'
import { db } from '@/lib/db'
import { IReview, ReviewCollection } from '@/models/Review'
import ReviewsClient from './ReviewsClient'

export const revalidate = 60 // Revalidate every minute

export default async function Reviews() {
  let reviews: IReview[] = []
  
  try {
    reviews = await db.findAll<IReview>(
      ReviewCollection,
      { approved: true },
      { sort: { createdAt: -1 } }
    )
  } catch (error) {
    console.error('Error fetching reviews:', error)
  }

  return (
    <main className="w-full pt-16">
      <Navigation />
      <ReviewsClient initialReviews={reviews} />
      
      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-12 px-4 mt-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4 text-lg">NMZ RAHUL</h3>
            <p className="opacity-70">Your gateway to unforgettable mountain experiences in Nepal.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="/" className="hover:opacity-100 transition">Home</a></li>
              <li><a href="/about" className="hover:opacity-100 transition">About</a></li>
              <li><a href="/treks" className="hover:opacity-100 transition">Treks</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>+977-984-1234567</li>
              <li>rahul@nmztrek.com</li>
              <li>Kathmandu, Nepal</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="#" className="hover:opacity-100 transition">Facebook</a></li>
              <li><a href="#" className="hover:opacity-100 transition">Instagram</a></li>
              <li><a href="https://wa.me/9779841234567" className="hover:opacity-100 transition">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm opacity-60">
          <p>&copy; 2024 NMZ RAHUL. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
