'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useParams } from 'next/navigation'
import { MapPin, Clock, Gauge, Users, AlertCircle, Check, MessageCircle } from 'lucide-react'
import { Navigation } from '@/components/navigation'

const treks = {
  'annapurna': {
    name: 'Annapurna Base Camp Trek',
    difficulty: 'Moderate',
    days: '7-8 days',
    altitude: '4,130 m',
    distance: '39 km',
    price: '$1,200',
    image: '/trek-annapurna.jpg',
    bestSeason: 'September - November, March - May',
    description: 'Experience the stunning Annapurna Base Camp trek, one of Nepal\'s most iconic mountain routes. Trek through lush forests, charming villages, and reach the breathtaking base camp surrounded by prayer flags and panoramic mountain views.',
    highlights: [
      'Visit the picturesque Annapurna Base Camp',
      'Sleep in local tea houses along the route',
      'Experience traditional Nepali hospitality',
      'Witness incredible sunrise and sunset views',
      'Photo opportunities at prayer flag locations',
      'Meet local Sherpa communities'
    ],
    itinerary: [
      { day: 1, title: 'Pokhara to Nayapul', description: 'Arrive in Pokhara and drive to Nayapul. Start trekking to Birethanti (1,025m).' },
      { day: 2, title: 'Birethanti to Ghorepani', description: 'Trek through rhododendron forests to Ghorepani (2,680m).' },
      { day: 3, title: 'Poon Hill Sunrise Trek', description: 'Early morning trek to Poon Hill for stunning sunrise views, then trek to Tadapani.' },
      { day: 4, title: 'Tadapani to Chhile', description: 'Descend through forests and reach Chhile (2,580m).' },
      { day: 5, title: 'Chhile to Sinuwa to Deurali', description: 'Trek to Sinuwa and continue to Deurali (2,700m).' },
      { day: 6, title: 'Deurali to Annapurna Base Camp', description: 'Reach the stunning Annapurna Base Camp (4,130m) with incredible panoramic views.' },
      { day: 7, title: 'Annapurna Base Camp to Bamboo', description: 'Trek back down to Bamboo (2,310m).' },
      { day: 8, title: 'Bamboo to Pokhara', description: 'Final descent to Pokhara, transfer to hotel.' }
    ],
    included: [
      'Experienced mountain guide',
      '7 nights in tea houses',
      'All meals during trekking',
      'Basic travel insurance',
      'Trekking permits',
      'Transportation from Pokhara'
    ],
    notIncluded: [
      'International flights',
      'Pokhara accommodation',
      'Travel insurance (optional)',
      'Personal trekking gear',
      'Tips for guides'
    ]
  },
  'mardi': {
    name: 'Mardi Himal Trek',
    difficulty: 'Easy',
    days: '5-6 days',
    altitude: '4,500 m',
    distance: '30 km',
    price: '$900',
    image: '/trek-mardi.jpg',
    bestSeason: 'October - November, March - April',
    description: 'The perfect beginner-friendly trek offering incredible mountain panoramas. Mardi Himal provides stunning views of Machhapuchare, Annapurna, and Dhaulagiri without the crowds of other popular routes.',
    highlights: [
      'Panoramic mountain views',
      'Less crowded than Annapurna routes',
      'Perfect for beginners',
      'Visit charming Nepali villages',
      'Experience authentic mountain life',
      'Excellent value for money'
    ],
    itinerary: [
      { day: 1, title: 'Pokhara to Kande', description: 'Drive to Kande and start trekking to Forest Camp.' },
      { day: 2, title: 'Forest Camp to Mardi Himal Base Camp', description: 'Trek through forests to reach Mardi Himal Base Camp.' },
      { day: 3, title: 'Mardi Himal Base Camp Summit', description: 'Early morning trek to Mardi Himal (4,500m) for panoramic views.' },
      { day: 4, title: 'Descent to Sangda', description: 'Trek down to the village of Sangda.' },
      { day: 5, title: 'Sangda to Pokhara', description: 'Final descent and drive back to Pokhara.' }
    ],
    included: [
      'Professional mountain guide',
      '4 nights accommodation',
      'All meals included',
      'Trekking permits',
      'Porter service',
      'Transportation'
    ],
    notIncluded: [
      'International flights',
      'Pre-trek accommodation',
      'Personal equipment',
      'Travel insurance',
      'Tips'
    ]
  },
  'everest': {
    name: 'Everest Base Camp Trek',
    difficulty: 'Hard',
    days: '14 days',
    altitude: '5,364 m',
    distance: '130 km',
    price: '$2,500',
    image: '/trek-annapurna.jpg',
    bestSeason: 'September - November, March - May',
    description: 'The ultimate trekking challenge. Trek to the base camp of the world\'s highest mountain, experiencing stunning Himalayan scenery, meeting Sherpa communities, and standing at the foot of Mount Everest.',
    highlights: [
      'Trek to Everest Base Camp (5,364m)',
      'Witness Mount Everest up close',
      'Meet legendary Sherpa communities',
      'Experience high-altitude trekking',
      'Visit Buddhist monasteries',
      'Incredible mountain photography'
    ],
    itinerary: [
      { day: '1-2', title: 'Kathmandu to Lukla', description: 'Fly to Lukla and trek to Phakding.' },
      { day: '3-4', title: 'Phakding to Namche Bazaar', description: 'Trek to Namche Bazaar with acclimatization day.' },
      { day: '5-6', title: 'Namche to Tengboche', description: 'Trek to Tengboche monastery (3,867m).' },
      { day: '7-8', title: 'Tengboche to Pheriche', description: 'Trek to Pheriche with acclimatization.' },
      { day: '9-10', title: 'Pheriche to Gorak Shep', description: 'Trek to Gorak Shep (5,164m).' },
      { day: 11, title: 'Everest Base Camp', description: 'Trek to Everest Base Camp (5,364m) - the pinnacle!' },
      { day: '12-14', title: 'Return Trek', description: 'Trek back down to Lukla and fly to Kathmandu.' }
    ],
    included: [
      'Expert Everest guide',
      'All trekking permits',
      'All accommodations',
      'Meals during trek',
      'Domestic flights',
      'Porter and guide'
    ],
    notIncluded: [
      'International flights',
      'International travel insurance',
      'Personal climbing gear',
      'Oxygen and climbing equipment',
      'Pre-trek accommodation'
    ]
  }
}

export default function TrekDetail() {
  const params = useParams()
  const id = params.id as string
  const trek = treks[id as keyof typeof treks]

  if (!trek) {
    return (
      <div className="min-h-screen pt-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Trek Not Found</h1>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <main className="w-full overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-96 w-full pt-32 overflow-hidden">
        <Image
          src={trek.image}
          alt={trek.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-end">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full p-8 text-white"
          >
            <h1 className="text-5xl font-bold mb-4">{trek.name}</h1>
            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>{trek.days}</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge size={20} />
                <span>{trek.difficulty}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                <span>{trek.altitude}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-4">Overview</h2>
              <p className="text-foreground/80 leading-relaxed text-lg mb-6">{trek.description}</p>
              
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">Best Season to Trek</h3>
                <p className="text-foreground/80">{trek.bestSeason}</p>
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-4">Trek Highlights</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {trek.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-3">
                    <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                    <p className="text-foreground/80">{highlight}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Itinerary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-4">Detailed Itinerary</h2>
              <div className="space-y-4">
                {trek.itinerary.map((item, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="font-bold text-lg text-primary mb-2">
                      Day {item.day}: {item.title}
                    </h3>
                    <p className="text-foreground/80">{item.description}</p>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Inclusions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {trek.included.map((item, index) => (
                    <li key={index} className="flex gap-3">
                      <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">Not Included</h3>
                <ul className="space-y-3">
                  {trek.notIncluded.map((item, index) => (
                    <li key={index} className="flex gap-3">
                      <AlertCircle className="text-orange-500 flex-shrink-0 mt-1" size={20} />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="sticky top-24"
            >
              <Card className="p-8 space-y-6">
                <div>
                  <p className="text-foreground/60 text-sm mb-2">Starting from</p>
                  <p className="text-4xl font-bold text-primary">{trek.price}</p>
                  <p className="text-foreground/60 text-sm">per person</p>
                </div>

                <div className="border-t pt-6 space-y-4">
                  <div>
                    <p className="text-foreground/60 text-sm">Duration</p>
                    <p className="font-semibold">{trek.days}</p>
                  </div>
                  <div>
                    <p className="text-foreground/60 text-sm">Max Altitude</p>
                    <p className="font-semibold">{trek.altitude}</p>
                  </div>
                  <div>
                    <p className="text-foreground/60 text-sm">Distance</p>
                    <p className="font-semibold">{trek.distance}</p>
                  </div>
                  <div>
                    <p className="text-foreground/60 text-sm">Difficulty</p>
                    <p className="font-semibold text-primary">{trek.difficulty}</p>
                  </div>
                </div>

                <a 
                  href={`https://wa.me/9779841234567?text=Hi! I'm interested in booking the ${trek.name} for ${trek.days}. What's available?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                    <MessageCircle size={18} className="mr-2" />
                    WhatsApp to Book
                  </Button>
                </a>
                <a 
                  href="https://wa.me/9779841234567?text=Hi! I have questions about the trek. Can we chat?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button size="lg" variant="outline" className="w-full">
                    <MessageCircle size={18} className="mr-2" />
                    Chat with Guide
                  </Button>
                </a>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4 mt-20">
        <div className="max-w-6xl mx-auto text-center text-white/70">
          <p>&copy; 2024 NMZ RAHUL. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
