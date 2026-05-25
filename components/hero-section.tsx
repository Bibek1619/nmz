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
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-border text-foreground hover:bg-muted"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Meet Your Guide
              </Button>
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
