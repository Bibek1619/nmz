'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Navigation } from '@/components/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Users, Mountain, Heart } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function About() {
  const whatsappLink = 'https://wa.me/9779841234567?text=Hello! I would like to know more about your services.'

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
            About Rahul Thapa
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-foreground/80"
          >
            Professional Mountain Guide & Adventure Enthusiast
          </motion.p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <Image
                src="/profile.jpg"
                alt="Rahul Thapa"
                width={400}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-primary mb-4">Your Mountain Guide</h2>
                <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                  Welcome! I am Rahul Thapa, a passionate mountain trekking guide with over 10 years of experience in the Himalayan peaks. My journey began with a deep love for mountains and a desire to share these incredible experiences with others.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  Every trek I lead is carefully planned to ensure the best experience for all participants, combining adventure with safety and cultural immersion. I believe in creating unforgettable memories while respecting nature and local communities.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-4 gap-6 mb-20"
          >
            {[
              { icon: Users, label: 'Happy Trekkers', value: '500+' },
              { icon: Mountain, label: 'Successful Expeditions', value: '100+' },
              { icon: Award, label: 'Years Experience', value: '10+' },
              { icon: Heart, label: 'Trek Routes', value: '20+' },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                    <Icon className="text-primary mx-auto mb-4" size={32} />
                    <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                    <p className="text-foreground/70">{stat.label}</p>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Why Choose Me Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-primary mb-12 text-center">Why Choose Me?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Expert Knowledge',
                  description: 'Comprehensive understanding of Himalayan trails, weather patterns, and local culture gained through years of experience.'
                },
                {
                  title: 'Safety First',
                  description: 'All treks include proper acclimatization, emergency protocols, and continuous health monitoring throughout the journey.'
                },
                {
                  title: 'Authentic Experience',
                  description: 'Immerse yourself in local culture with home-cooked meals, interactions with village communities, and cultural insights.'
                },
                {
                  title: 'Personalized Care',
                  description: 'Each trek is customized to match your fitness level, interests, and pace. Small group sizes ensure individual attention.'
                },
                {
                  title: 'Professional Support',
                  description: 'Certified guide with first aid training, rescue equipment, and insurance coverage for complete peace of mind.'
                },
                {
                  title: 'Flexible Planning',
                  description: 'Adaptable itineraries that adjust to weather conditions, group pace, and unexpected situations with minimal disruption.'
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                    <p className="text-foreground/70 leading-relaxed">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-primary text-primary-foreground rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
            <p className="text-lg mb-8 opacity-90">
              Contact me now to discuss your trek preferences and customize the perfect itinerary.
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-8 py-3 text-lg">
                Get in Touch via WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4 text-lg">Trek Adventures</h3>
            <p className="opacity-70">Your gateway to unforgettable mountain experiences in Nepal.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="/" className="hover:opacity-100 transition">Home</a></li>
              <li><a href="/services" className="hover:opacity-100 transition">Services</a></li>
              <li><a href="/gallery" className="hover:opacity-100 transition">Gallery</a></li>
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
