'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Star, Mountain, Users, Trophy } from 'lucide-react'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { staggerChildren: 0.2, delayChildren: 0.1 }
}

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <Navigation />

      <HeroSection />

      {/* About Guide Section */}
      <section id="about" className="py-20 px-4 bg-card/50 backdrop-blur">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp}>
              <Image
                src="/profile.jpg"
                alt="Guide Rahul Thapa"
                width={400}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-primary mb-4">Meet Your Guide</h2>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  Hi, I&apos;m Rahul Thapa, a professional mountain trekking guide with over 10 years of experience guiding adventurers through Nepal&apos;s most spectacular mountain ranges.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Trophy className="text-primary" size={24} />
                  <div>
                    <p className="font-semibold">100+ Successful Treks</p>
                    <p className="text-sm text-foreground/60">Happy adventurers</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mountain className="text-primary" size={24} />
                  <div>
                    <p className="font-semibold">15+ Routes</p>
                    <p className="text-sm text-foreground/60">Expert knowledge</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-primary" size={24} />
                  <div>
                    <p className="font-semibold">5 Star Rating</p>
                    <p className="text-sm text-foreground/60">Verified reviews</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="text-primary" size={24} />
                  <div>
                    <p className="font-semibold">Safety First</p>
                    <p className="text-sm text-foreground/60">Certified guide</p>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Treks Section */}
      <section id="featured" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Featured Trek Destinations</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
              Choose from our curated selection of the most breathtaking and rewarding mountain treks
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                id: 'annapurna',
                name: 'Annapurna Base Camp',
                difficulty: 'Moderate',
                days: '7-8 days',
                image: '/trek-annapurna.jpg',
                price: '$1,200',
                description: 'Trek to the stunning base camp with prayer flags and panoramic views'
              },
              {
                id: 'mardi',
                name: 'Mardi Himal',
                difficulty: 'Easy',
                days: '5-6 days',
                image: '/trek-mardi.jpg',
                price: '$900',
                description: 'Perfect beginner trek with incredible mountain panoramas'
              },
              {
                id: 'everest',
                name: 'Everest Base Camp',
                difficulty: 'Hard',
                days: '14 days',
                image: '/trek-annapurna.jpg',
                price: '$2,500',
                description: 'The ultimate challenge - trek to the world&apos;s highest peak'
              }
            ].map((trek, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={trek.image}
                      alt={trek.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-primary mb-2">{trek.name}</h3>
                    <p className="text-foreground/70 mb-4 flex-1">{trek.description}</p>
                    <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                      <div>
                        <p className="text-foreground/60">Duration</p>
                        <p className="font-semibold">{trek.days}</p>
                      </div>
                      <div>
                        <p className="text-foreground/60">Difficulty</p>
                        <p className="font-semibold">{trek.difficulty}</p>
                      </div>
                      <div>
                        <p className="text-foreground/60">Price</p>
                        <p className="font-semibold text-primary">{trek.price}</p>
                      </div>
                    </div>
                    <Link href={`/trek/${trek.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-card/50 backdrop-blur">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">What Trekkers Say</h2>
            <p className="text-foreground/70 text-lg">Join hundreds of satisfied adventurers</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                name: 'Sarah Johnson',
                location: 'USA',
                comment: 'Rahul made our Annapurna trek unforgettable. Professional, friendly, and incredibly knowledgeable!',
                rating: 5
              },
              {
                name: 'Michael Chen',
                location: 'Canada',
                comment: 'Best trekking experience of my life. The guides really care about safety and your experience.',
                rating: 5
              },
              {
                name: 'Emma Wilson',
                location: 'UK',
                comment: 'Worth every penny. The views, the people, the whole experience was just perfect!',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-4 leading-relaxed">&quot;{testimonial.comment}&quot;</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-foreground/60">{testimonial.location}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Ready for Your Adventure?</h2>
          <p className="text-xl mb-8 text-white/90">
            Book your trek today and start planning the experience of a lifetime
          </p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" variant="outline" className="border-white text-primary bg-white hover:bg-gray-100 px-8">
              Book Your Trek
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4 text-lg">NMZ RAHUL</h3>
            <p className="text-white/70">Your gateway to unforgettable mountain experiences</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#featured" className="hover:text-white transition">Treks</a></li>
              <li><a href="#testimonials" className="hover:text-white transition">Reviews</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/70">
              <li>+977-9841234567</li>
              <li>rahul@trekadventures.com</li>
              <li>Kathmandu, Nepal</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-white transition">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition">WhatsApp</a></li>
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
