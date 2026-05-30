'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Users, Mountain, Heart } from 'lucide-react'
import { IAbout } from '@/models'
import { Footer } from '@/components/footer'

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
      {/* Breadcrumb */}
      <section className="pt-4 pb-6 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <nav className="text-sm text-muted-foreground mb-6">
            <a href="/" className="hover:text-foreground">Home</a>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">About</span>
          </nav>
          <h1 className="text-4xl font-bold text-center text-primary bg-gradient-to-br from-primary/10 to-accent/10">Your Mountain Guide</h1>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line text-justify max-w-4xl mx-auto hyphens-auto" lang="en">
              {aboutData.bio}
            </p>
          </motion.div>

          {/* Profile Image - Animated Circle like Homepage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-12"
          >
            <div className="relative w-64 h-64">
              {/* Spinning dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-primary"
              />

              {/* Circular profile image */}
              <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
                <Image
                  src={aboutData.profileImage}
                  alt={aboutData.name}
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Floating: Available badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                className="absolute -top-4 right-0 bg-card/80 backdrop-blur-md p-3 rounded-2xl border border-border shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-medium text-card-foreground">Available</span>
                </div>
              </motion.div>

              {/* Floating: Experience badge */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                className="absolute -bottom-4 left-0 bg-card/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-border shadow-xl"
              >
                <p className="text-2xl font-bold text-primary leading-none">
                  {aboutData.stats.yearsExperience || 10}+
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Years Exp</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Certifications and Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto"
          >
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

          {/* Stats Grid - Single row on medium and small screens */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-3 gap-4 mb-20 max-w-4xl mx-auto"
          >
            {[
              { icon: Users, label: 'Happy Trekkers', value: `${aboutData.stats.happyTrekkers}+`, bgColor: 'bg-green-400' },
              { icon: Mountain, label: 'Successful Treks', value: `${aboutData.stats.successfulTreks}+`, bgColor: 'bg-blue-400' },
              { icon: Award, label: 'Years Experience', value: `${aboutData.stats.yearsExperience}+`, bgColor: 'bg-orange-400' },
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
                  <Card className={`p-4 text-center hover:shadow-lg transition-shadow ${stat.bgColor}`}>
                    <Icon className="text-white mx-auto mb-2" size={24} />
                    <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-xs text-white/90">{stat.label}</p>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Why Choose Me Section - 2 boxes per row on medium and small screens */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-primary mb-12 text-center">Why Choose Me?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Expert Knowledge',
                  description: 'Comprehensive understanding of Himalayan trails, weather patterns, and local culture gained through years of experience.',
                  bgColor: 'bg-blue-50/50'
                },
                {
                  title: 'Safety First',
                  description: 'All treks include proper acclimatization, emergency protocols, and continuous health monitoring throughout the journey.',
                  bgColor: 'bg-green-50/50'
                },
                {
                  title: 'Authentic Experience',
                  description: 'Immerse yourself in local culture with home-cooked meals, interactions with village communities, and cultural insights.',
                  bgColor: 'bg-orange-50/50'
                },
                {
                  title: 'Personalized Care',
                  description: 'Each trek is customized to match your fitness level, interests, and pace. Small group sizes ensure individual attention.',
                  bgColor: 'bg-purple-50/50'
                },
                {
                  title: 'Professional Support',
                  description: 'Certified guide with first aid training, rescue equipment, and insurance coverage for complete peace of mind.',
                  bgColor: 'bg-pink-50/50'
                },
                {
                  title: 'Flexible Planning',
                  description: 'Adaptable itineraries that adjust to weather conditions, group pace, and unexpected situations with minimal disruption.',
                  bgColor: 'bg-teal-50/50'
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className={`p-4 md:p-5 hover:shadow-lg transition-shadow ${item.bgColor}`}>
                    <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

        
         
        </div>
      </section>

      <Footer />
    </main>
  )
}
