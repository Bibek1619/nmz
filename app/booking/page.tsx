'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

export default function BookingPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    trek: '',
    startDate: '',
    numPeople: '',
    experience: '',
    dietary: '',
    specialRequests: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Booking submitted:', formData)
    setSubmitted(true)
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        trek: '',
        startDate: '',
        numPeople: '',
        experience: '',
        dietary: '',
        specialRequests: ''
      })
    }, 3000)
  }

  if (submitted) {
    return (
      <main className="w-full min-h-screen pt-20 px-4 bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <CheckCircle className="w-24 h-24 text-primary mx-auto" />
          </motion.div>
          <h1 className="text-4xl font-bold text-primary mb-4">Booking Submitted!</h1>
          <p className="text-foreground/70 mb-8">
            Thank you for your interest! We&apos;ll get back to you shortly with confirmation details.
          </p>
          <a href="/">
            <Button className="bg-primary hover:bg-primary/90">Back to Home</Button>
          </a>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="w-full overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-primary">Trek Adventures</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-primary mb-4"
          >
            Book Your Trek Adventure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-foreground/70"
          >
            Fill out the form below and we&apos;ll help you plan the adventure of a lifetime
          </motion.p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Country *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="United States"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Trek Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Select Trek *</label>
                  <select
                    name="trek"
                    value={formData.trek}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Choose a trek</option>
                    <option value="annapurna">Annapurna Base Camp (7-8 days)</option>
                    <option value="mardi">Mardi Himal (5-6 days)</option>
                    <option value="everest">Everest Base Camp (14 days)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Preferred Start Date *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Number of People *</label>
                  <input
                    type="number"
                    name="numPeople"
                    value={formData.numPeople}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Trekking Experience *</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Additional Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Dietary Requirements</label>
                  <input
                    type="text"
                    name="dietary"
                    value={formData.dietary}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Vegetarian, Vegan, Nut Allergy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Special Requests or Questions</label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Let us know about any special requirements or questions..."
                  />
                </div>
              </div>
            </Card>

            <div className="flex gap-4 justify-center pt-6">
              <a href="/">
                <Button variant="outline" size="lg">
                  Cancel
                </Button>
              </a>
              <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 px-12">
                Submit Booking Request
              </Button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4 mt-20">
        <div className="max-w-6xl mx-auto text-center text-white/70">
          <p>&copy; 2024 Trek Adventures with Rahul Thapa. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
