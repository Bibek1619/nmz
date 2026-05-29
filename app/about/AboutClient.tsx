'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Users, Mountain, Heart } from 'lucide-react'
import { IAbout } from '@/models'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

interface AboutClientProps {
  aboutData: IAbout;
}

export default function AboutClient({ aboutData }: AboutClientProps) {
  const whatsappLink = aboutData.whatsapp 
    ? `https://wa.me/${aboutData.whatsapp.replace(/[^0-9]/g, '')}?text=Hello! I would like to know more about your services.`
    : 'https://wa.me/9779841234567?text=Hello! I would like to know more about your services.';

  return (
    <main className="w-full pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-primary mb-6"
          >
            About {aboutData.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-foreground/80"
          >
            {aboutData.title}
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
                src={aboutData.profileImage}
                alt={aboutData.name}
                width={400}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-primary mb-4">Your Mountain Guide</h2>
                <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                  {aboutData.bio}
                </p>
              </div>
              
              {/* Certifications */}
              {aboutData.certifications && aboutData.certifications.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Certifications</h3>
                  <ul className="space-y-2">
                    {aboutData.certifications.map((cert, index) => (
                      <li key={index} className="flex items-center gap-2 text-foreground/80">
                        <Award size={16} className="text-primary" />
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Languages */}
              {aboutData.languages && aboutData.languages.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Languages</h3>
                  <p className="text-foreground/80">{aboutData.languages.join(', ')}</p>
                </div>
              )}
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
              { icon: Users, label: 'Happy Trekkers', value: `${aboutData.stats.happyTrekkers}+` },
              { icon: Mountain, label: 'Successful Treks', value: `${aboutData.stats.successfulTreks}+` },
              { icon: Award, label: 'Years Experience', value: `${aboutData.stats.yearsExperience}+` },
              { icon: Heart, label: 'Trek Routes', value: `${aboutData.stats.routes}+` },
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

          {/* Specializations */}
          {aboutData.specializations && aboutData.specializations.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold text-primary mb-12 text-center">Specializations</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {aboutData.specializations.map((spec, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-bold text-primary">{spec}</h3>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

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
            <h3 className="font-bold mb-4 text-lg">NMZ RAHUL</h3>
            <p className="opacity-70">Your gateway to unforgettable mountain experiences in Nepal.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="/" className="hover:opacity-100 transition">Home</a></li>
              <li><a href="/treks" className="hover:opacity-100 transition">Treks</a></li>
              <li><a href="/about" className="hover:opacity-100 transition">About</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>{aboutData.phone || '+977-9841234567'}</li>
              <li>{aboutData.email || 'rahul@nmztrek.com'}</li>
              <li>Kathmandu, Nepal</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow</h4>
            <ul className="space-y-2 text-sm opacity-70">
              {aboutData.socialLinks?.facebook && (
                <li><a href={aboutData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition">Facebook</a></li>
              )}
              {aboutData.socialLinks?.instagram && (
                <li><a href={aboutData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition">Instagram</a></li>
              )}
              <li><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition">WhatsApp</a></li>
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
