'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Star, Mountain, Users, Trophy } from 'lucide-react'
import Link from 'next/link'
import { IAbout } from '@/models'
import { ITrek } from '@/models/Trek'
import { TrekCard } from '@/components/trek-card'

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

interface HomeClientProps {
  aboutData: IAbout | null;
  featuredTreks: ITrek[];
}

export default function HomeClient({ aboutData, featuredTreks }: HomeClientProps) {
  return (
    <>
      {/* About Guide Section */}
      <section id="about" className="py-20 px-4 bg-card/50 backdrop-blur relative">
        <div className="max-w-6xl mx-auto">
          {/* Animated Profile Image - Positioned at left edge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block"
          >
            <div className="relative w-72 h-72 xl:w-[400px] xl:h-[400px]">
              {/* Spinning dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-primary"
              />

              {/* Circular profile image */}
              <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl z-10">
                <Image
                  src={aboutData?.mainPageImage || '/profile.jpg'}
                  alt={aboutData?.name || 'Guide'}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Floating: Available badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                className="absolute -top-4 right-6 bg-card/80 backdrop-blur-md p-3 rounded-2xl border border-border z-20 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-medium text-card-foreground">Available for Treks</span>
                </div>
              </motion.div>

              {/* Floating: Experience badge */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                className="absolute -bottom-4 left-4 bg-card/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-border z-20 shadow-xl"
              >
                <p className="text-2xl font-bold text-primary leading-none">
                  {aboutData?.stats.yearsExperience || 10}+
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Years Experience</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content - Pushed to the right */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="lg:ml-auto lg:max-w-2xl"
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-primary mb-4">Meet Your Guide</h2>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {aboutData?.bio 
                    ? `${aboutData.bio.substring(0, 150)}${aboutData.bio.length > 150 ? '...' : ''}`
                    : "Hi, I'm a professional mountain trekking guide with years of experience guiding adventurers through Nepal's most spectacular..."}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Trophy className="text-primary" size={24} />
                  <div>
                    <p className="font-semibold">{aboutData?.stats.successfulTreks || 100}+ Successful Treks</p>
                    <p className="text-sm text-foreground/60">Happy adventurers</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mountain className="text-primary" size={24} />
                  <div>
                    <p className="font-semibold">{aboutData?.stats.routes || 15}+ Routes</p>
                    <p className="text-sm text-foreground/60">Expert knowledge</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-primary" size={24} />
                  <div>
                    <p className="font-semibold">{aboutData?.stats.happyTrekkers || 500}+ Happy Trekkers</p>
                    <p className="text-sm text-foreground/60">Satisfied clients</p>
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
              <div>
                <Link href="/about">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                    See More About
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Why Choose Me</h2>
            <p className="text-foreground/70 text-lg">Your trusted partner for Himalayan adventures</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: 'Expert Local Knowledge', icon: Mountain },
              { title: 'Safety First Approach', icon: Star },
              { title: 'Personalized Experience', icon: Users },
              { title: 'Certified & Licensed', icon: Trophy },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <item.icon className="text-primary" size={32} />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                </Card>
              </motion.div>
            ))}
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
            {featuredTreks.length > 0 ? (
              featuredTreks.map((trek) => (
                <motion.div key={trek.id} variants={fadeInUp}>
                  <TrekCard 
                    id={trek.id}
                    name={trek.name}
                    difficulty={trek.difficulty}
                    days={trek.days}
                    image={trek.image}
                    price={trek.price}
                    elevation={trek.height}
                    description={trek.description}
                  />
                </motion.div>
              ))
            ) : (
              // Fallback if no featured treks in database
              [
                {
                  id: 'annapurna',
                  name: 'Annapurna Base Camp',
                  difficulty: 'Moderate',
                  days: '7-8 days',
                  image: '/trek-annapurna.jpg',
                  price: '$1,200',
                  elevation: '4,130 m',
                  description: 'Trek to the stunning base camp with prayer flags and panoramic views'
                },
                {
                  id: 'mardi',
                  name: 'Mardi Himal',
                  difficulty: 'Easy',
                  days: '5-6 days',
                  image: '/trek-mardi.jpg',
                  price: '$900',
                  elevation: '4,500 m',
                  description: 'Perfect beginner trek with incredible mountain panoramas'
                },
                {
                  id: 'everest',
                  name: 'Everest Base Camp',
                  difficulty: 'Hard',
                  days: '14 days',
                  image: '/trek-annapurna.jpg',
                  price: '$2,500',
                  elevation: '5,364 m',
                  description: 'The ultimate challenge - trek to the world&apos;s highest peak'
                }
              ].map((trek) => (
                <motion.div key={trek.id} variants={fadeInUp}>
                  <TrekCard {...trek} />
                </motion.div>
              ))
            )}
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
            <Link href="/booking">
              <Button size="lg" variant="outline" className="border-white text-primary bg-white hover:bg-gray-100 px-8">
                Book Your Trek
              </Button>
            </Link>
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
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/treks" className="hover:text-white transition">Treks</Link></li>
              <li><Link href="/reviews" className="hover:text-white transition">Reviews</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/70">
              <li>{aboutData?.phone || '+977-9841234567'}</li>
              <li>{aboutData?.email || 'rahul@trekadventures.com'}</li>
              <li>Kathmandu, Nepal</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow</h4>
            <ul className="space-y-2 text-white/70">
              {aboutData?.socialLinks?.facebook && (
                <li><a href={aboutData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Facebook</a></li>
              )}
              {aboutData?.socialLinks?.instagram && (
                <li><a href={aboutData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a></li>
              )}
              {aboutData?.whatsapp && (
                <li><a href={`https://wa.me/${aboutData.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">WhatsApp</a></li>
              )}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
          <p>&copy; 2024 NMZ RAHUL. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
