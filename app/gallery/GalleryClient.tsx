'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { X, ImageIcon } from 'lucide-react'
import { IGallery } from '@/models/Gallery'
import { Footer } from '@/components/footer'

interface GalleryClientProps {
  images: IGallery[]
}

export default function GalleryClient({ images }: GalleryClientProps) {
  const [selectedImage, setSelectedImage] = useState<IGallery | null>(null)

  return (
    <>
      {/* Breadcrumb */}
      <section className="pt-4 pb-6 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <nav className="text-sm text-muted-foreground mb-6">
            <a href="/" className="hover:text-foreground">Home</a>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Gallery</span>
          </nav>
          <h1 className="text-4xl font-bold text-center text-primary bg-gradient-to-br from-primary/10 to-accent/10">Trek Photo Gallery</h1>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-4 min-h-[50vh]">
        <div className="max-w-6xl mx-auto">
          {images.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <ImageIcon size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold text-foreground mb-2">No Images Yet</h3>
              <p className="text-foreground/60">
                Gallery images will appear here once uploaded by the admin
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {images.map((image, index) => (
                <motion.div
                  key={image._id?.toString() || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedImage(image)}
                  className="cursor-pointer group"
                >
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                    <Image
                      src={image.image}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                      <div className="p-4 w-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <h3 className="font-bold text-lg">{image.title}</h3>
                        {image.description && (
                          <p className="text-sm text-white/90 line-clamp-2">{image.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="max-w-5xl w-full relative"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 z-50 bg-white/90 hover:bg-white rounded-full p-2 transition"
              >
                <X className="w-6 h-6 text-black" />
              </button>
              <div className="relative w-full h-[70vh] rounded-xl overflow-hidden bg-black">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/95 backdrop-blur p-6 rounded-b-xl mt-2"
              >
                <h2 className="text-2xl font-bold text-foreground mb-2">{selectedImage.title}</h2>
                {selectedImage.description && (
                  <p className="text-foreground/70">{selectedImage.description}</p>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  )
}
