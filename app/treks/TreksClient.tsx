'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrekCard } from '@/components/trek-card'
import { ITrek } from '@/models/Trek'
import { Footer } from '@/components/footer'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

interface TreksClientProps {
  treksData: ITrek[];
}

type FilterType = 'all' | 'trek' | 'tour'

export default function TreksClient({ treksData }: TreksClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  // Filter treks based on active filter
  const filteredTreks = treksData.filter((trek) => {
    if (activeFilter === 'all') return true
    // Assuming there's a 'type' field in trek data. If not, we can filter by other criteria
    // For now, using category or a custom field
    return trek.category?.toLowerCase() === activeFilter
  })

  return (
    <>
      {/* Breadcrumb */}
      <section className="pt-4 pb-6 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <nav className="text-sm text-muted-foreground mb-8">
            <a href="/" className="hover:text-foreground">Home</a>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Services</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-center text-primary">
            Our Services
          </h1>
          <p className="text-center text-muted-foreground mt-3 max-w-2xl mx-auto">
            Explore our curated collection of treks and tours designed for unforgettable adventures
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                activeFilter === 'all'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-foreground hover:bg-white/80 border border-border'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('trek')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                activeFilter === 'trek'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-foreground hover:bg-white/80 border border-border'
              }`}
            >
              Trek
            </button>
            <button
              onClick={() => setActiveFilter('tour')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                activeFilter === 'tour'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-foreground hover:bg-white/80 border border-border'
              }`}
            >
              Tour
            </button>
          </div>
        </div>
      </section>

      {/* Treks Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredTreks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60 text-lg">
                No {activeFilter !== 'all' ? activeFilter + 's' : 'services'} available at the moment. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTreks.map((trek) => (
                <motion.div
                  key={trek.id}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="whileInView"
                >
                  <TrekCard 
                    id={trek.id}
                    name={trek.name}
                    subtext={trek.subtext}
                    difficulty={trek.difficulty}
                    days={trek.days}
                    image={trek.image}
                    price={trek.price}
                    elevation={trek.height}
                    description={trek.description}
                  />
                </motion.div>
              ))}
            </div>
          )}
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

      <Footer />
    </>
  )
}
