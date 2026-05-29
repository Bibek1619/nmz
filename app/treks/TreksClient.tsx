'use client'

import { motion } from 'framer-motion'
import { TrekCard } from '@/components/trek-card'
import { ITrek } from '@/models/Trek'

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
    </>
  )
}
