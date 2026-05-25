'use client'

import { motion } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'

export default function Contact() {
  const whatsappLink = 'https://wa.me/9779841234567?text=Hello, I would like to inquire about your trekking services.'

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+977-984-1234567',
      action: 'tel:+9779841234567'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'rahul@trekadventures.com',
      action: 'mailto:rahul@trekadventures.com'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kathmandu, Nepal',
      action: '#'
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: 'Within 2 hours',
      action: '#'
    },
  ]

  return (
    <main className="w-full pt-16">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-primary mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-foreground/80"
          >
            Have questions? We&apos;re here to help plan your perfect trek!
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-8">Contact Information</h2>
              
              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <motion.a
                      key={index}
                      href={info.action}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="flex gap-4 items-start group"
                    >
                      <Card className="p-4 flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon size={24} />
                      </Card>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{info.label}</p>
                        <p className="text-foreground/80">{info.value}</p>
                      </div>
                    </motion.a>
                  )
                })}
              </div>

              {/* WhatsApp Button */}
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg flex items-center justify-center gap-2">
                  <MessageCircle size={24} />
                  Chat on WhatsApp
                </Button>
              </motion.a>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-8"
              >
                <p className="font-semibold text-foreground mb-4">Follow Us</p>
                <div className="flex gap-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-card hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors">
                    f
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-card hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors">
                    📷
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-card hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors">
                    ▶
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-6">Send us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Trek Interest
                    </label>
                    <select className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Select a trek...</option>
                      <option>Annapurna Base Camp</option>
                      <option>Mardi Himal</option>
                      <option>Everest Base Camp</option>
                      <option>Custom Trek</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Preferred Dates
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      placeholder="Tell us about your trekking goals..."
                      rows={4}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3">
                    Send Message
                  </Button>
                </form>

                <p className="text-xs text-foreground/60 mt-4 text-center">
                  Or connect directly via WhatsApp for faster response times.
                </p>
              </Card>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">Visit Us in Kathmandu</h2>
            <div className="bg-gradient-to-b from-primary/20 to-accent/20 rounded-2xl overflow-hidden h-96">
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-foreground/60">Map location coming soon</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-12 px-4 mt-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4 text-lg">Trek Adventures</h3>
            <p className="opacity-70">Your gateway to unforgettable mountain experiences in Nepal.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="/" className="hover:opacity-100 transition">Home</a></li>
              <li><a href="/about" className="hover:opacity-100 transition">About</a></li>
              <li><a href="/services" className="hover:opacity-100 transition">Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>+977-984-1234567</li>
              <li>rahul@trekadventures.com</li>
              <li>Kathmandu, Nepal</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="#" className="hover:opacity-100 transition">Facebook</a></li>
              <li><a href="#" className="hover:opacity-100 transition">Instagram</a></li>
              <li><a href="#" className="hover:opacity-100 transition">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm opacity-60">
          <p>&copy; 2024 Trek Adventures with Rahul Thapa. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
