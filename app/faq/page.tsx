'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { Footer } from '@/components/footer'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const whatsappLink = 'https://wa.me/9779841234567?text=I have a question about the treks.'

  const faqs = [
    {
      question: 'What is the best time to trek?',
      answer: 'The best time for trekking in Nepal is during the clear seasons: September to November (autumn) and February to May (spring). These periods offer the best visibility of mountain peaks and pleasant weather conditions. Avoid monsoon season (June-August) and heavy snow seasons.'
    },
    {
      question: 'Do I need to be physically fit?',
      answer: 'While basic fitness is helpful, our treks cater to various fitness levels. We have easy, moderate, and challenging options. The key is regular walking practice 2-3 months before your trek. We adjust the pace based on group fitness and take regular breaks.'
    },
    {
      question: 'What is included in the package?',
      answer: 'Our packages typically include: guided trekking services, accommodation in tea houses or lodges, all meals during the trek, porter services, first aid, and emergency support. Specific inclusions vary by package. Check individual trek details for complete information.'
    },
    {
      question: 'What about altitude sickness?',
      answer: 'We follow proper acclimatization protocols with gradual altitude gain and rest days. Drinking plenty of water, eating well, and getting good sleep help prevent altitude sickness. Our guides monitor your health continuously and can adjust the itinerary if needed.'
    },
    {
      question: 'Is travel insurance required?',
      answer: 'Yes, we strongly recommend travel insurance that covers high-altitude trekking, medical emergencies, and evacuation. This is mandatory for Everest Base Camp trek. Your insurance provides important protection during your adventure.'
    },
    {
      question: 'What should I pack?',
      answer: 'Essential items include: comfortable trekking shoes, warm layers, rain jacket, hat, sunscreen, water bottle, basic medicines, and personal toiletries. We provide a detailed packing list for each specific trek. Most treks involve carrying only a daypack; porters carry your main luggage.'
    },
    {
      question: 'How many people are in a typical group?',
      answer: 'Our groups typically range from 4-8 people to ensure personalized attention and a good group experience. Private group treks are also available for families or corporate teams. Larger groups can be accommodated with advance notice.'
    },
    {
      question: 'What is the accommodation like?',
      answer: 'Accommodation varies from basic but comfortable tea house lodges to more upscale mountain hotels. Most places have attached bathrooms, heating, and are clean and well-maintained. Don&apos;t expect luxury, but comfort is prioritized for a good trekking experience.'
    },
    {
      question: 'Can I cancel or reschedule my trek?',
      answer: 'Yes, we offer flexible cancellation policies. Cancellation up to 30 days before your trek receives a full refund. Within 30 days, a 50% refund is provided. Rescheduling is usually possible with a 2-week notice, subject to availability.'
    },
    {
      question: 'How do I book and what are the payment options?',
      answer: 'You can book through our website, WhatsApp, or email. We accept bank transfers, online payments, and credit cards. A 30% deposit secures your booking, with the remaining balance due 2 weeks before your trek. Flexible payment plans are available.'
    },
    {
      question: 'What languages do your guides speak?',
      answer: 'Most guides are fluent in English. Guides who speak other languages (German, Spanish, French) are available upon request. We aim to provide guides who can communicate effectively with all trekkers to enhance the experience.'
    },
    {
      question: 'Is vegetarian/vegan food available?',
      answer: 'Yes, absolutely! We cater to all dietary preferences including vegetarian, vegan, and other special dietary requirements. Please inform us in advance so we can arrange appropriate meals. Nepal has excellent vegetarian cuisine options.'
    },
  ]

  return (
    <main className="w-full pt-16">
      <Navigation />

      {/* Breadcrumb */}
      <section className="pt-4 pb-6 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <nav className="text-sm text-muted-foreground mb-6">
            <a href="/" className="hover:text-foreground">Home</a>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">FAQ</span>
          </nav>
          <h1 className="text-4xl font-bold text-center text-primary">Frequently Asked Questions</h1>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">Frequently Asked Questions</h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <Card 
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <div className="p-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="text-primary" size={24} />
                    </motion.div>
                  </div>
                  
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 border-t border-border"
                    >
                      <p className="text-foreground/80 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Still Have Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 bg-primary text-primary-foreground rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg mb-8 opacity-90">
              Our team is ready to help! Reach out via WhatsApp for immediate assistance with any inquiries.
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-8 py-3 text-lg">
                Chat with Us
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
