'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MapPin, Clock, Gauge, AlertCircle, Check, MessageCircle, Mountain } from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { ITrek } from '@/models/Trek'
import { Footer } from '@/components/footer'

interface TrekDetailClientProps {
  trek: ITrek
}

export default function TrekDetailClient({ trek }: TrekDetailClientProps) {
  return (
    <main className="w-full overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-96 w-full pt-32 overflow-hidden">
        <Image
          src={trek.image}
          alt={trek.name}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-end">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full p-8 text-white"
          >
            <h1 className="text-5xl font-bold mb-2">{trek.name}</h1>
            {trek.subtext && (
              <p className="text-xl italic text-white/90 mb-4">{trek.subtext}</p>
            )}
            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>{trek.days}</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge size={20} />
                <span>{trek.difficulty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mountain size={20} />
                <span>{trek.height}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-4">Overview</h2>
              <p className="text-foreground/80 leading-relaxed text-lg mb-6">{trek.description}</p>
              
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">Best Season to Trek</h3>
                <p className="text-foreground/80">{trek.bestSeason}</p>
              </div>
            </motion.div>

            {/* Highlights */}
            {trek.highlights && trek.highlights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold text-primary mb-4">Trek Highlights</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {trek.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-3">
                      <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                      <p className="text-foreground/80">{highlight}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Itinerary */}
            {trek.itinerary && trek.itinerary.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold text-primary mb-4">Detailed Itinerary</h2>
                <div className="space-y-4">
                  {trek.itinerary.map((item, index) => (
                    <Card key={index} className="p-6">
                      <h3 className="font-bold text-lg text-primary mb-2">
                        Day {item.day}: {item.title}
                      </h3>
                      <p className="text-foreground/80">{item.description}</p>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Inclusions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {trek.included && trek.included.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-4">What's Included</h3>
                  <ul className="space-y-3">
                    {trek.included.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {trek.notIncluded && trek.notIncluded.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-4">Not Included</h3>
                  <ul className="space-y-3">
                    {trek.notIncluded.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <AlertCircle className="text-orange-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="sticky top-24"
            >
              <Card className="p-8 space-y-6">
                <div>
                  <p className="text-foreground/60 text-sm mb-2">Starting from</p>
                  <p className="text-4xl font-bold text-primary">{trek.price}</p>
                  <p className="text-foreground/60 text-sm">per person</p>
                </div>

                <div className="border-t pt-6 space-y-4">
                  <div>
                    <p className="text-foreground/60 text-sm">Duration</p>
                    <p className="font-semibold">{trek.days}</p>
                  </div>
                  <div>
                    <p className="text-foreground/60 text-sm">Max Height</p>
                    <p className="font-semibold">{trek.height}</p>
                  </div>
                  <div>
                    <p className="text-foreground/60 text-sm">Distance</p>
                    <p className="font-semibold">{trek.distance}</p>
                  </div>
                  <div>
                    <p className="text-foreground/60 text-sm">Difficulty</p>
                    <p className="font-semibold text-primary">{trek.difficulty}</p>
                  </div>
                </div>

                <a 
                  href={`https://wa.me/9779841234567?text=Hi! I'm interested in booking the ${trek.name} for ${trek.days}. What's available?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                    <MessageCircle size={18} className="mr-2" />
                    WhatsApp to Book
                  </Button>
                </a>
                <a 
                  href="https://wa.me/9779841234567?text=Hi! I have questions about the trek. Can we chat?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button size="lg" variant="outline" className="w-full">
                    <MessageCircle size={18} className="mr-2" />
                    Chat with Guide
                  </Button>
                </a>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
