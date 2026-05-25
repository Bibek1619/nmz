'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { X } from 'lucide-react'
import { Navigation } from '@/components/navigation'

const galleryImages = [
  {
    id: 1,
    src: '/trek-annapurna.jpg',
    alt: 'Annapurna Base Camp Prayer Flags',
    title: 'Prayer Flags at Annapurna',
    description: 'Colorful prayer flags fluttering in the wind at Annapurna Base Camp'
  },
  {
    id: 2,
    src: '/gallery-1.jpg',
    alt: 'Mountain Landscape Golden Hour',
    title: 'Golden Hour Mountains',
    description: 'Dramatic Himalayan peaks bathed in golden sunlight'
  },
  {
    id: 3,
    src: '/gallery-2.jpg',
    alt: 'Trekking Group Adventure',
    title: 'Adventure Together',
    description: 'Trekkers enjoying the mountain journey and camaraderie'
  },
  {
    id: 4,
    src: '/trek-mardi.jpg',
    alt: 'Mardi Himal Panorama',
    title: 'Mardi Himal Vista',
    description: 'Breathtaking panoramic views from Mardi Himal'
  },
  {
    id: 5,
    src: '/gallery-3.jpg',
    alt: 'Mountain Sunrise',
    title: 'Mountain Sunrise',
    description: 'First light illuminating the snowy mountain peaks'
  },
  {
    id: 6,
    src: '/gallery-4.jpg',
    alt: 'Nepali Village',
    title: 'Mountain Village',
    description: 'Traditional Nepali settlement nestled in the valley'
  }
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)

  return (
    <main className="w-full overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 text-center bg-gradient-to-b from-primary/5 to-background">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-primary mb-4"
        >
          Trek Photo Gallery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-foreground/70 max-w-2xl mx-auto"
        >
          Explore stunning moments from our mountain adventures
        </motion.p>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedImage(image)}
                className="cursor-pointer group"
              >
                <div className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                    <div className="p-4 w-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <h3 className="font-bold text-lg">{image.title}</h3>
                      <p className="text-sm text-white/90">{image.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="max-w-4xl w-full max-h-96 relative"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-50 bg-white/90 hover:bg-white rounded-full p-2 transition"
            >
              <X className="w-6 h-6 text-black" />
            </button>
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/95 p-6 rounded-b-xl"
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">{selectedImage.title}</h2>
              <p className="text-foreground/70">{selectedImage.description}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4 mt-20">
        <div className="max-w-6xl mx-auto text-center text-white/70">
          <p>&copy; 2024 Trek Adventures with Rahul Thapa. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
