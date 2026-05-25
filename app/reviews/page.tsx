'use client'

import { motion } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function Reviews() {
  const whatsappLink = 'https://wa.me/9779841234567?text=I would like to book a trek and see what others have experienced.'

  const reviews = [
    {
      name: 'Sarah Johnson',
      location: 'USA',
      trek: 'Annapurna Base Camp',
      rating: 5,
      date: 'April 2024',
      comment: 'Rahul made our Annapurna trek absolutely unforgettable! His expertise, warmth, and dedication to making sure everyone was comfortable was exceptional. The food was delicious, the pace was perfect, and we felt completely safe the entire time. Highly recommended!'
    },
    {
      name: 'Michael Chen',
      location: 'Canada',
      trek: 'Mardi Himal',
      rating: 5,
      date: 'March 2024',
      comment: 'Best trekking experience of my life! Rahul is not just a guide but also a fantastic storyteller and cultural ambassador. He taught us so much about Nepal and the mountains. The attention to detail and safety protocols were outstanding.'
    },
    {
      name: 'Emma Wilson',
      location: 'United Kingdom',
      trek: 'Annapurna Base Camp',
      rating: 5,
      date: 'February 2024',
      comment: 'Worth every penny! From the moment we met Rahul, we knew we were in great hands. The trek was perfectly paced, the accommodations were comfortable, and the views were breathtaking. An experience we will cherish forever!'
    },
    {
      name: 'David Kumar',
      location: 'India',
      trek: 'Everest Base Camp',
      rating: 5,
      date: 'January 2024',
      comment: 'The Everest Base Camp trek with Rahul was life-changing. His expertise in handling altitude, his physical support, and his motivational presence made the challenging trek feel achievable. The porters and entire team were professional and caring.'
    },
    {
      name: 'Lisa Anderson',
      location: 'Australia',
      trek: 'Mardi Himal',
      rating: 5,
      date: 'December 2023',
      comment: 'I was nervous about trekking alone, but Rahul made me feel comfortable and safe from day one. The group was wonderful, and the trek was perfectly suited for my fitness level. I loved the local villages and authentic meals. Absolute gem!'
    },
    {
      name: 'James Morrison',
      location: 'United States',
      trek: 'Annapurna Base Camp',
      rating: 5,
      date: 'November 2023',
      comment: 'Rahul is a true professional. His knowledge of the trails, weather patterns, and local culture is impressive. He goes above and beyond to ensure trekkers have the best experience. Our family trek was fantastic, and my kids talk about it all the time!'
    },
    {
      name: 'Sophie Dupont',
      location: 'France',
      trek: 'Mardi Himal',
      rating: 5,
      date: 'October 2023',
      comment: 'Un guide extraordinaire! Rahul\'s passion for the mountains is contagious. He shared fascinating insights about the region, its people, and ecology. The trek was challenging but rewarding, and I felt supported every step of the way.'
    },
    {
      name: 'Alex Rodriguez',
      location: 'Spain',
      trek: 'Everest Base Camp',
      rating: 5,
      date: 'September 2023',
      comment: 'The most incredible adventure I\'ve ever experienced! Rahul\'s experience with high-altitude trekking and his calm demeanor during challenging moments was invaluable. Our group bonded beautifully, and the memories will last a lifetime.'
    },
    {
      name: 'Maria Santos',
      location: 'Brazil',
      trek: 'Annapurna Base Camp',
      rating: 5,
      date: 'August 2023',
      comment: 'Fantástico! Rahul is not just a guide but a friend. He cared about each person in our group individually, made sure everyone was happy and healthy, and shared his love for Nepal generously. This trek was a dream come true!'
    },
  ]

  const stats = [
    { label: 'Happy Trekkers', value: '500+' },
    { label: 'Average Rating', value: '5.0 ⭐' },
    { label: 'Successful Treks', value: '100+' },
    { label: 'Repeat Customers', value: '80%' },
  ]

  return (
    <main className="w-full pt-16">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-primary mb-6"
          >
            Guest Reviews & Testimonials
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-foreground/80"
          >
            Read what our trekkers have to say about their experiences
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-foreground/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
              >
                <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-semibold text-foreground">{review.name}</p>
                      <p className="text-sm text-foreground/60">{review.location}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4 flex-1">
                    <p className="text-sm font-medium text-primary mb-2">{review.trek}</p>
                    <p className="text-foreground/80 leading-relaxed text-sm">&quot;{review.comment}&quot;</p>
                  </div>
                  
                  <p className="text-xs text-foreground/50">{review.date}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-20 bg-primary text-primary-foreground rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Community of Happy Trekkers</h2>
            <p className="text-lg mb-8 opacity-90">
              Your next adventure awaits! Book now and become part of our extended trekking family.
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-8 py-3 text-lg">
                Book Your Trek
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-12 px-4 mt-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4 text-lg">Trek Adventures</h3>
            <p className="opacity-70">Your gateway to unforgettable mountain experiences in Nepal.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="/" className="hover:opacity-100 transition">Home</a></li>
              <li><a href="/about" className="hover:opacity-100 transition">About</a></li>
              <li><a href="/services" className="hover:opacity-100 transition">Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>+977-984-1234567</li>
              <li>rahul@trekadventures.com</li>
              <li>Kathmandu, Nepal</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="#" className="hover:opacity-100 transition">Facebook</a></li>
              <li><a href="#" className="hover:opacity-100 transition">Instagram</a></li>
              <li><a href="#" className="hover:opacity-100 transition">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm opacity-60">
          <p>&copy; 2024 Trek Adventures with Rahul Thapa. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
