'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Mountain, ChevronDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden pt-16 bg-background">
      {/* Gradient base */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-muted/40 to-background" />

      {/* Glow blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary text-sm font-medium mb-6">
              <Mountain size={14} />
              Professional Trekking Guide · Nepal
            </span>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight mb-6 leading-tight">
              Conquer the <br />
              <span className="text-primary">Himalayas.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              I&apos;m Rahul Thapa, a certified mountain guide with 10+ years leading adventurers through Nepal&apos;s most breathtaking routes.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Button
                size="lg"
                className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Treks
              </Button>
              <a
                href="https://wa.me/9779841234567?text=Hello!%20I%20want%20to%20book%20a%20trek."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-8 h-11 border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 transition-colors text-sm font-medium"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Book via WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right: Person Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 md:w-[400px] md:h-[400px]">
              {/* Spinning dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-primary"
              />

              {/* Circular profile image */}
              <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl z-10">
                <Image
                  src="/profile.jpg"
                  alt="Guide Rahul Thapa"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Floating: Available badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                className="absolute -top-4 right-6 bg-card/80 backdrop-blur-md p-3 rounded-2xl border border-border z-20 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-medium text-card-foreground">Available for Treks</span>
                </div>
              </motion.div>

              {/* Floating: Experience badge */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                className="absolute -bottom-4 left-4 bg-card/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-border z-20 shadow-xl"
              >
                <p className="text-2xl font-bold text-primary leading-none">10+</p>
                <p className="text-xs text-muted-foreground mt-0.5">Years Experience</p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="text-muted-foreground" size={32} />
      </motion.div>
    </section>
  )
}
