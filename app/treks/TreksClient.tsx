'use client'

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

export default function TreksClient({ treksData }: TreksClientProps) {
  return (
    <>
      {/* Breadcrumb */}
      <section className="pt-4 pb-6 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <nav className="text-sm text-muted-foreground mb-8">
            <a href="/" className="hover:text-foreground">Home</a>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Treks</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-center text-primary">
            Our Trek Destinations
          </h1>
        </div>
      </section>

      {/* Treks Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {treksData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60 text-lg">No treks available at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {treksData.map((trek) => (
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
