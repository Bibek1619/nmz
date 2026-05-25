'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, User, ArrowRight } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const blogPosts = [
  {
    id: 'altitude-sickness',
    title: 'Understanding Altitude Sickness: Prevention and Treatment',
    excerpt: 'Learn how to prevent and manage altitude sickness during your Himalayan trek with practical tips and expert advice.',
    date: '2024-03-15',
    author: 'Rahul Thapa',
    image: '/trek-annapurna.jpg',
    category: 'Health & Safety',
    readTime: '5 min read',
    content: `Altitude sickness is one of the most common concerns for trekkers visiting high-altitude destinations. Also known as Acute Mountain Sickness (AMS), it occurs when your body doesn't get enough oxygen at higher elevations.

## Symptoms of Altitude Sickness
- Headache
- Nausea and loss of appetite
- Fatigue and weakness
- Shortness of breath
- Sleep disturbances

## Prevention Tips
1. **Acclimatization**: Spend extra days at intermediate altitudes to allow your body to adjust.
2. **Hydration**: Drink plenty of water - aim for 3-4 liters per day.
3. **Avoid alcohol and smoking**: These can worsen symptoms.
4. **Eat nutritious meals**: Maintain energy levels with balanced diet.
5. **Take rest days**: Don't rush your trek.

## When to Seek Help
If symptoms persist or worsen, descend immediately and consult a medical professional. It's always better to be safe.`
  },
  {
    id: 'packing-essentials',
    title: '10 Essential Items You Must Pack for Your Nepal Trek',
    excerpt: 'Complete packing guide for trekking in Nepal. Learn what gear you absolutely need and what you can leave behind.',
    date: '2024-03-10',
    author: 'Rahul Thapa',
    image: '/trek-mardi.jpg',
    category: 'Preparation',
    readTime: '7 min read',
    content: `Proper packing can make or break your trekking experience. Here's my comprehensive guide to what you really need.

## The Essential 10
1. **Quality hiking boots**: Waterproof and broken in before the trek.
2. **Warm layers**: Down jacket is worth its weight in gold.
3. **Sleeping bag**: Rated for temperatures 10°C below your expected minimum.
4. **Trekking poles**: Save your knees on descent.
5. **Headlamp**: Essential for early morning starts.
6. **Water bottle**: 2-liter capacity minimum.
7. **Sun protection**: Sunscreen, hat, and sunglasses.
8. **First aid kit**: Blister treatment is critical.
9. **Toilet paper and hand sanitizer**: Not always available.
10. **Cash in small denominations**: Credit cards don't work everywhere.

## Weight Considerations
Keep your backpack under 12kg if possible. Less weight means more energy for the trek.`
  },
  {
    id: 'best-time-to-trek',
    title: 'The Best Time to Trek in Nepal: A Month-by-Month Guide',
    excerpt: 'Discover the optimal seasons for trekking in Nepal and plan your adventure accordingly.',
    date: '2024-03-05',
    author: 'Rahul Thapa',
    image: '/gallery-1.jpg',
    category: 'Planning',
    readTime: '6 min read',
    content: `Timing is everything when it comes to trekking in Nepal. Each season offers unique advantages and challenges.

## Peak Season (September-November)
- Clear skies and excellent visibility
- Mild temperatures
- Many trekkers on trails
- Higher prices and more crowded teahouses

## Spring Season (March-May)
- Rhododendrons in full bloom
- Gradually improving weather
- Fewer trekkers than autumn
- Some high passes may still have snow

## Monsoon (June-August)
- Lush green landscapes
- Fewer tourists
- Lower prices
- Heavy rain and landslide risks

## Winter (December-February)
- Cold temperatures at high altitudes
- Snow on high passes
- Sparse tourism
- Clear views from lower elevations

## My Recommendation
October and November are ideal - perfect weather, moderate crowds, and stunning views.`
  },
  {
    id: 'local-culture',
    title: 'Experiencing Authentic Nepali Culture on Your Trek',
    excerpt: 'How to respectfully engage with local communities and experience genuine Himalayan culture.',
    date: '2024-02-28',
    author: 'Rahul Thapa',
    image: '/gallery-2.jpg',
    category: 'Culture',
    readTime: '8 min read',
    content: `One of the greatest rewards of trekking is experiencing the authentic culture of mountain communities.

## Respectful Engagement
- Learn basic Nepali phrases
- Ask permission before taking photos
- Support local businesses
- Respect religious sites and customs

## Homestay Experience
Consider staying in homestays to better understand local life. These accommodations often include home-cooked meals and personal interaction with families.

## Giving Back
- Bring supplies requested by local schools
- Hire local guides and porters
- Use local services and products
- Consider sustainable travel practices

## What You'll Learn
- Traditional farming methods
- Himalayan hospitality
- Buddhist and Hindu traditions
- Mountain survival techniques

The memories and connections you make with local people often become the highlight of the trek.`
  },
  {
    id: 'trek-fitness',
    title: 'Getting Fit for Your Trek: A 12-Week Training Plan',
    excerpt: 'Prepare your body for the demands of high-altitude trekking with this comprehensive training guide.',
    date: '2024-02-20',
    author: 'Rahul Thapa',
    image: '/gallery-3.jpg',
    category: 'Fitness',
    readTime: '9 min read',
    content: `Physical preparation is key to enjoying your trek without excessive fatigue or pain.

## 12-Week Training Plan

### Weeks 1-4: Building Base Fitness
- 3 days cardio (30-45 minutes each)
- 2 days strength training
- 1 day long walk (progressively longer)

### Weeks 5-8: Increasing Intensity
- Add hills to your runs/walks
- Increase long walk to 2-3 hours
- Wear a weighted backpack on long walks
- Add stair climbing

### Weeks 9-12: Trek Simulation
- Mimic your actual trek terrain
- Practice altitude training if possible
- Test all gear in real conditions
- Focus on recovery and injury prevention

## Key Exercises
- Lunges and squats for leg strength
- Planks and core work
- Calf raises and ankle strengthening
- Walking with weighted backpack

Start early and be consistent. Your future self on the trail will thank you!`
  },
  {
    id: 'photography-tips',
    title: 'Capturing the Perfect Trek Photos: A Photographer\'s Guide',
    excerpt: 'Learn professional photography tips to preserve your trekking memories beautifully.',
    date: '2024-02-15',
    author: 'Rahul Thapa',
    image: '/gallery-4.jpg',
    category: 'Photography',
    readTime: '7 min read',
    content: `Your trek will present incredible photo opportunities. Here's how to capture them professionally.

## Camera Gear for Trekking
- Smartphone (lightweight and practical)
- Mirrorless camera (if serious about photography)
- Spare batteries (essential at altitude)
- Wide-angle lens (captures landscape grandeur)
- Telephoto lens (for wildlife and distance)
- Tripod (optional but useful)

## Photography Tips

### Golden Hour Magic
Shoot during first and last hour of daylight for warm, flattering light. These are the best times for landscape photography.

### Composition Techniques
- Rule of thirds: Place subject off-center
- Leading lines: Use trails and rivers to guide viewer
- Foreground interest: Include elements that add depth
- Layers: Use distant mountains, mid-ground trekkers, foreground vegetation

### Special Conditions
- Sunrise shoots require early starts
- Mountain shadows change rapidly
- Altitude affects sun intensity
- Clear skies offer dramatic photos

### Practical Tips
- Protect gear from rain and dust
- Batteries drain faster in cold
- Always ask permission for portraits
- Backup important photos
- Enjoy the moment without camera

Remember, the best camera is the one you have with you. Focus on capturing what moves you.`
  }
]

export default function BlogPage() {
  return (
    <main className="w-full min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-primary mb-4">Trek Adventures Blog</h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Expert tips, guides, and stories from the Himalayan trails
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
              >
                <Link href={`/blog/${post.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col cursor-pointer group">
                    {/* Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary/80 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-foreground/70 mb-6 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="space-y-3 mb-6 border-t border-border pt-4">
                        <div className="flex items-center gap-2 text-sm text-foreground/60">
                          <Calendar size={16} />
                          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-foreground/60">
                          <User size={16} />
                          <span>{post.author}</span>
                        </div>
                        <p className="text-sm text-foreground/60">{post.readTime}</p>
                      </div>

                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                        Read More
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 bg-primary text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Get Trek Tips & Updates</h2>
          <p className="text-lg mb-8 text-white/90">
            Subscribe to get expert tips, trek guides, and special offers delivered to your WhatsApp
          </p>
          <a
            href="https://wa.me/9779841234567?text=Hi! I'd like to subscribe to trek tips and updates."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Subscribe via WhatsApp
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4 text-lg">NMZ RAHUL</h3>
            <p className="text-white/70">Expert mountain guides and unforgettable Himalayan experiences</p>
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
    </main>
  )
}
