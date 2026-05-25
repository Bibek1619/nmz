'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MapPin, Clock, TrendingUp, DollarSign } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const treksData = [
  {
    id: 'annapurna',
    name: 'Annapurna Base Camp Trek',
    difficulty: 'Moderate',
    days: '7-8 days',
    image: '/trek-annapurna.jpg',
    price: '$1,200',
    elevation: '4,130 m',
    distance: '40 km',
    description: 'Trek to the stunning base camp surrounded by massive Himalayan peaks. Experience the iconic prayer flags, teahouses, and breathtaking panoramic views that make this one of Nepal\'s most popular treks.',
    highlights: ['Prayer flags at base camp', 'Rhododendron forests', 'Poon Hill sunrise', 'Local teahouse experience'],
    bestTime: 'September - November, March - May'
  },
  {
    id: 'mardi',
    name: 'Mardi Himal Trek',
    difficulty: 'Easy',
    days: '5-6 days',
    image: '/trek-mardi.jpg',
    price: '$900',
    elevation: '4,500 m',
    distance: '32 km',
    description: 'Perfect beginner trek with incredible mountain panoramas. A hidden gem offering less crowded trails while providing stunning views of Annapurna and Dhaulagiri ranges.',
    highlights: ['Off-the-beaten path', 'Alpine meadows', 'Mountain views', 'Traditional villages'],
    bestTime: 'October - November, March - April'
  },
  {
    id: 'everest',
    name: 'Everest Base Camp Trek',
    difficulty: 'Hard',
    days: '14 days',
    image: '/trek-annapurna.jpg',
    price: '$2,500',
    elevation: '5,364 m',
    distance: '65 km',
    description: 'The ultimate challenge - trek to the world\'s highest peak. Stand at the base camp where Mount Everest dominates the skyline and experience the majesty of the Himalayas.',
    highlights: ['Everest views', 'Sherpa villages', 'Namche Bazaar', 'Kala Pathar viewpoint'],
    bestTime: 'September - November, March - May'
  }
]

export default function TreksPage() {
  return (
    <main className="w-full min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-primary mb-4">Our Trek Destinations</h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Explore the most breathtaking mountain treks in Nepal with expert guides and unforgettable experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Treks Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {treksData.map((trek, index) => (
              <motion.div
                key={trek.id}
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-72 w-full overflow-hidden bg-muted">
                    <Image
                      src={trek.image}
                      alt={trek.name}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm font-semibold mb-2">DIFFICULTY</p>
                      <p className="text-white text-lg font-bold">{trek.difficulty}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-primary mb-2">{trek.name}</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-border">
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-primary" />
                        <div>
                          <p className="text-xs text-foreground/60">Duration</p>
                          <p className="font-semibold text-sm">{trek.days}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp size={18} className="text-primary" />
                        <div>
                          <p className="text-xs text-foreground/60">Elevation</p>
                          <p className="font-semibold text-sm">{trek.elevation}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-primary" />
                        <div>
                          <p className="text-xs text-foreground/60">Distance</p>
                          <p className="font-semibold text-sm">{trek.distance}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={18} className="text-primary" />
                        <div>
                          <p className="text-xs text-foreground/60">Price</p>
                          <p className="font-semibold text-sm">{trek.price}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-foreground/70 mb-6 flex-1 leading-relaxed">{trek.description}</p>

                    <div className="mb-6">
                      <p className="text-xs font-semibold text-foreground/60 mb-3">HIGHLIGHTS</p>
                      <ul className="space-y-2">
                        {trek.highlights.map((highlight, i) => (
                          <li key={i} className="text-sm text-foreground/70 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <p className="text-xs font-semibold text-foreground/60 mb-2">BEST TIME</p>
                      <p className="text-sm text-foreground/70">{trek.bestTime}</p>
                    </div>

                    <Link href={`/trek/${trek.id}`} className="w-full">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        View Full Details
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Ready for Your Adventure?</h2>
          <p className="text-xl mb-8 text-white/90">
            Contact us via WhatsApp to customize your trek or book your next adventure
          </p>
          <a
            href="https://wa.me/9779841234567?text=Hello! I am interested in booking a trek with you."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            WhatsApp Us Today
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4 text-lg">NMZ RAHUL</h3>
            <p className="text-white/70">Your gateway to unforgettable mountain experiences in Nepal</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/treks" className="hover:text-white transition">Treks</a></li>
              <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/70">
              <li>+977-9841234567</li>
              <li>rahul@nmztrek.com</li>
              <li>Kathmandu, Nepal</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="https://facebook.com/nmzrahul" className="hover:text-white transition">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition">Instagram</a></li>
              <li><a href="https://wa.me/9779841234567" className="hover:text-white transition">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
          <p>&copy; 2024 NMZ RAHUL. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
