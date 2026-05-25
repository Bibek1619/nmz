'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, User, ArrowLeft, Share2, MessageCircle } from 'lucide-react'
import Link from 'next/link'

const blogPosts = {
  'altitude-sickness': {
    title: 'Understanding Altitude Sickness: Prevention and Treatment',
    date: '2024-03-15',
    author: 'Rahul Thapa',
    image: '/trek-annapurna.jpg',
    category: 'Health & Safety',
    readTime: '5 min read',
    content: `
# Understanding Altitude Sickness: Prevention and Treatment

Altitude sickness is one of the most common concerns for trekkers visiting high-altitude destinations. Also known as Acute Mountain Sickness (AMS), it occurs when your body doesn't get enough oxygen at higher elevations.

## Symptoms of Altitude Sickness

- Headache
- Nausea and loss of appetite
- Fatigue and weakness
- Shortness of breath
- Sleep disturbances
- Dizziness or lightheadedness

## Prevention Tips

### 1. **Acclimatization**
The best prevention is to allow your body time to adjust. Spend extra days at intermediate altitudes before heading to higher elevations. This helps your body produce more red blood cells to carry oxygen.

### 2. **Hydration**
Drink plenty of water - aim for 3-4 liters per day. Dehydration worsens altitude sickness symptoms. Avoid caffeine and alcohol which increase dehydration.

### 3. **Avoid Rushing**
Don't push yourself too hard on the first days. Take it slow and let your body adjust. Remember, there's no prize for speed at altitude.

### 4. **Nutrition**
Maintain energy levels with a balanced diet. High-carbohydrate meals are easier to digest at altitude. Eat small, frequent meals rather than large ones.

### 5. **Take Rest Days**
Don't hesitate to take rest days. This is not a race. One extra day at an intermediate elevation can make all the difference.

## When to Seek Help

If symptoms persist or worsen, descend immediately and consult a medical professional. Some important signs to watch for:

- Severe headache that doesn't respond to pain medication
- Confusion or difficulty walking
- Fluid in lungs (crackling sounds)
- Extreme fatigue

It's always better to be safe. Your health is more important than reaching a destination.

## Natural Remedies

While not scientifically proven, some trekkers report benefits from:
- Ginger tea for nausea
- Honey and lemon water for energy
- Coca tea in Peru (though we don't have this in Nepal!)
- Early morning walks for light activity

## Medications

Consult with your doctor before trekking. Some medications like acetazolamide (Diamox) can help with acclimatization if taken before altitude gain.

## Conclusion

Altitude sickness is manageable with proper preparation and attitude. Listen to your body, acclimatize properly, and don't hesitate to descent if needed. Happy and healthy trekking!
    `
  },
  'packing-essentials': {
    title: '10 Essential Items You Must Pack for Your Nepal Trek',
    date: '2024-03-10',
    author: 'Rahul Thapa',
    image: '/trek-mardi.jpg',
    category: 'Preparation',
    readTime: '7 min read',
    content: `
# 10 Essential Items You Must Pack for Your Nepal Trek

Proper packing can make or break your trekking experience. I've guided hundreds of trekkers, and the ones who packed smart are always the happiest. Here's my comprehensive guide to what you really need.

## The Essential 10

### 1. **Quality Hiking Boots**
Your feet are precious on a trek. Invest in good hiking boots that are:
- Waterproof and breathable
- Broken in before the trek (never wear brand new boots!)
- Have good ankle support
- Medium weight, not too heavy

### 2. **Warm Layers**
Nepal's mountains get cold, especially at night and at higher elevations. A down jacket is worth its weight in gold.

### 3. **Sleeping Bag**
Rate it for temperatures 10°C below your expected minimum. A quality sleeping bag ensures good sleep and recovery.

### 4. **Trekking Poles**
These save your knees on descent and help maintain rhythm while walking uphill.

### 5. **Headlamp**
Essential for early morning starts. Many sunrise hikes require starting in darkness.

### 6. **Water Bottle**
2-liter capacity minimum. Hydration is critical at altitude.

### 7. **Sun Protection**
- High SPF sunscreen (mountain sun is intense)
- Hat or cap
- Sunglasses

### 8. **First Aid Kit**
Don't overlook this. Important items:
- Blister treatment (crucial!)
- Pain medication
- Antihistamine
- Antiseptic cream
- Bandages

### 9. **Toilet Paper and Hand Sanitizer**
You might not always find toilet paper in remote areas. Hand sanitizer keeps you healthy.

### 10. **Cash in Small Denominations**
ATMs are rare in mountain areas. Keep USD or local currency in small notes for teahouse payments.

## Weight Considerations

Keep your backpack under 12kg if possible. Less weight means:
- More energy for the trek
- Less strain on joints
- More enjoyment of the experience

## Don't Bring

Some things that weight you down unnecessarily:
- Guidebooks (use your phone)
- Heavy clothing you won't wear
- Multiple pairs of shoes
- Expensive jewelry or watches
- Heavy toiletries (get small travel sizes)

## Final Thoughts

Pack smart, hike happy! Remember, you can always hire a porter to carry extra weight, but you can't replace your health and enjoyment.
    `
  },
  'best-time-to-trek': {
    title: 'The Best Time to Trek in Nepal: A Month-by-Month Guide',
    date: '2024-03-05',
    author: 'Rahul Thapa',
    image: '/gallery-1.jpg',
    category: 'Planning',
    readTime: '6 min read',
    content: `
# The Best Time to Trek in Nepal: A Month-by-Month Guide

Timing is everything when it comes to trekking in Nepal. Each season offers unique advantages and challenges. Let me break it down month by month.

## Peak Season: September-November

This is the best time for most trekkers.

**Advantages:**
- Clear skies and excellent visibility
- Mild, comfortable temperatures
- Plenty of sunshine for photography
- Teahouses fully stocked and operating

**Disadvantages:**
- Many trekkers on trails (can be crowded)
- Higher prices for accommodation
- More booked guides

**Best for:** First-time trekkers, those seeking clear views

## Spring Season: March-May

A magical time when flowers bloom.

**Advantages:**
- Rhododendrons in full bloom (March-April)
- Gradually improving weather
- Fewer trekkers than autumn
- Lower prices
- Morning mist creates dramatic landscapes

**Disadvantages:**
- Some high passes may still have snow (April-May)
- Afternoon clouds can develop
- Unpredictable weather

**Best for:** Photography enthusiasts, experienced trekkers

## Monsoon: June-August

The wet season, but not without rewards.

**Advantages:**
- Lush green landscapes
- Fewer tourists
- Lower prices
- Waterfalls at their best
- Dramatically fewer trekkers

**Disadvantages:**
- Heavy rain and landslide risks
- Cloud cover reduces visibility
- Poor trail conditions
- Many teahouses close

**Best for:** Budget travelers, those seeking solitude (not recommended for beginners)

## Winter: December-February

Beautiful views but challenging conditions.

**Advantages:**
- Crisp, clear air
- Stunning views from lower elevations
- Minimal tourists
- Very cheap prices

**Disadvantages:**
- Cold temperatures at high altitudes
- Snow on high passes
- Many teahouses closed
- Short daylight hours

**Best for:** Experienced trekkers, photography

## My Recommendation

**October and November are ideal** - perfect weather, moderate crowds, and stunning views. This is when I personally recommend trekking.

If you want to avoid crowds, come in **April-May** for spring flowers or **September** for pre-monsoon clarity.

## Quick Reference Table

| Season | Weather | Crowds | Prices | Best For |
|--------|---------|--------|--------|----------|
| Sept-Nov | Excellent | High | High | All trekkers |
| Dec-Feb | Cold | Very Low | Low | Experience |
| Mar-May | Good | Moderate | Moderate | Flowers |
| Jun-Aug | Wet | Very Low | Low | Budget |

Choose based on your preferences, experience level, and schedule!
    `
  },
  'local-culture': {
    title: 'Experiencing Authentic Nepali Culture on Your Trek',
    date: '2024-02-28',
    author: 'Rahul Thapa',
    image: '/gallery-2.jpg',
    category: 'Culture',
    readTime: '8 min read',
    content: `
# Experiencing Authentic Nepali Culture on Your Trek

One of the greatest rewards of trekking in Nepal is experiencing the authentic culture of mountain communities. As a guide for over a decade, I've witnessed how respectful cultural engagement enriches the trek experience.

## Respectful Engagement

### Learn Basic Nepali Phrases
Simple words go a long way:
- "Namaste" (hello/goodbye)
- "Dhanyabad" (thank you)
- "Kasto chha?" (How are you?)
- "Mero naam... ho" (My name is...)

### Ask Permission Before Taking Photos
Always ask before photographing people. Many villagers appreciate being asked and often become friendly after.

### Support Local Businesses
- Hire local guides and porters
- Buy from local shops
- Eat at family-run teahouses
- Use local services

### Respect Religious Sites
- Remove shoes when entering temples and monasteries
- Don't touch religious objects
- Be quiet in prayer areas
- Respect prayer flags and mani walls

## The Homestay Experience

Consider staying in homestays during your trek. Benefits include:
- Personal interaction with families
- Home-cooked meals (better than teahouse food!)
- Understanding daily mountain life
- Supporting local economy directly
- More authentic experience

I often arrange homestays for my groups. The memories made here are often the trek highlights.

## Giving Back Responsibly

### Bring Supplies
Ask locals what schools need. Supplies are often requested rather than money.

### Fair Wages
Ensure guides and porters are fairly compensated. This supports their families and educates their children.

### Sustainable Practices
- Take all trash with you
- Use water responsibly
- Support businesses using renewable energy
- Don't encourage wildlife feeding

## What You'll Learn

Mountain people have wisdom modern society has forgotten:
- Traditional farming methods adapted to terrain
- Himalayan hospitality and kindness
- Buddhist and Hindu spiritual traditions
- Sustainable living practices
- Mountain survival techniques

## Cultural Sensitivity Tips

1. **Dress appropriately** - Cover shoulders and knees
2. **Eat with locals** - Accept tea and food offered with grace
3. **Ask questions** - People love sharing their culture
4. **Listen more, talk less** - You learn more by listening
5. **Be patient** - Different pace of life is a feature, not a bug

## The Deeper Connection

The memories and connections you make with local people often become the highlight of the trek. I've seen trekkers return years later to visit their "tea house family."

These connections transform a physical journey into a meaningful cultural exchange.

Trekking in Nepal isn't just about summits and views—it's about connecting with people and places in a way that modern travel rarely allows.
    `
  },
  'trek-fitness': {
    title: 'Getting Fit for Your Trek: A 12-Week Training Plan',
    date: '2024-02-20',
    author: 'Rahul Thapa',
    image: '/gallery-3.jpg',
    category: 'Fitness',
    readTime: '9 min read',
    content: `
# Getting Fit for Your Trek: A 12-Week Training Plan

Physical preparation is key to enjoying your trek without excessive fatigue or pain. I've seen the difference proper training makes—trained trekkers enjoy their trek; unprepared ones struggle.

## The 12-Week Training Plan

### Weeks 1-4: Building Base Fitness

Start gently and build gradually.

**Weekly Schedule:**
- 3 days cardio (30-45 minutes each): Running, cycling, or fast walking
- 2 days strength training (30 minutes each)
- 1 day long walk (60-90 minutes), flat terrain
- 1 day rest

**Focus:** Building endurance and strength base

### Weeks 5-8: Increasing Intensity

Now we add hills and load.

**Weekly Schedule:**
- 2 days hill running/hiking (45-60 minutes)
- 1 day flat cardio (45 minutes)
- 2 days strength training (30-40 minutes)
- 1 day long hike (2-3 hours) wearing a weighted backpack
- 1 day rest

**Focus:** Hill strength, endurance with load

### Weeks 9-12: Trek Simulation

Final phase before your trek.

**Weekly Schedule:**
- 1 long trek (4-6 hours) with weighted backpack
- 2 hill hikes (1-2 hours each)
- 2 days strength training (20-30 minutes)
- 1 day easy cardio (30 minutes)
- 1 day rest

**Focus:** Trek-specific conditioning, injury prevention, recovery

## Key Exercises

### For Leg Strength
- Lunges (20 per leg, 3 sets)
- Squats (25 reps, 3 sets)
- Calf raises (30 reps, 3 sets)
- Step-ups on stairs (20 per leg, 3 sets)

### For Core Strength
- Planks (30-60 seconds, 3 sets)
- Side planks (20-30 seconds each side, 2 sets)
- Leg raises (15 reps, 3 sets)

### For Cardio
- Stair climbing (10-15 minutes)
- Incline treadmill walking (15-20 minutes)
- Trail running on hills (when available)

## Important Training Principles

### Progressive Overload
Gradually increase:
- Duration of exercise
- Intensity of hills
- Weight in backpack
- Frequency of workouts

### Injury Prevention
- Warm up before every session (5 minutes)
- Cool down and stretch after (5-10 minutes)
- Don't skip rest days (essential!)
- Listen to your body

### Nutrition During Training
- Eat protein after strength training
- Carbs before cardio sessions
- Stay hydrated throughout
- Maintain balanced diet

## Special Considerations

### For Overweight Trekkers
Start with walking and swimming (low impact). Build up gradually. Consider a porter to reduce load on joints.

### For Older Trekkers
Focus on flexibility and balance. Slow, steady progression is better than intense training.

### For Desk Workers
Pay special attention to core and leg strength. Consider yoga for flexibility.

## The Week Before Trek

**Important:** Don't do strenuous training 1 week before trekking!

- Light walks only (30 minutes, easy pace)
- Stretching and yoga
- Rest and sleep
- Ensure fitness, not fatigue

## Signs You're Ready

- You can hike 4-6 hours in hills without excessive fatigue
- You can carry 12kg backpack comfortably
- Your knees don't hurt after 2+ hour hikes
- You have good aerobic fitness
- You feel confident about the trek

## Final Thoughts

Start early and be consistent. Your future self on the trail will thank you! Remember, the goal is to feel strong and confident on the trek, not to be in Olympic condition.

A motivated, trained trekker has 10x more fun than an unprepared one.
    `
  },
  'photography-tips': {
    title: 'Capturing the Perfect Trek Photos: A Photographer\'s Guide',
    date: '2024-02-15',
    author: 'Rahul Thapa',
    image: '/gallery-4.jpg',
    category: 'Photography',
    readTime: '7 min read',
    content: `
# Capturing the Perfect Trek Photos: A Photographer's Guide

Your trek will present incredible photo opportunities. As someone who's guided thousands of trekkers, I've learned what photos truly capture the essence of these mountains. Here's how to do it like a pro.

## Camera Gear for Trekking

### Primary Camera
- **Smartphone** (lightweight, practical, most versatile)
- **Mirrorless camera** (if serious about photography)

### Essential Accessories
- **Spare batteries** (essential at altitude—batteries drain faster)
- **Phone battery pack** (10,000+ mAh)
- **Lens cleaning cloth** (mountain dust is relentless)
- **Waterproof bag** (monsoon protection)

### Optional But Useful
- Wide-angle lens (10-24mm)
- Telephoto lens (70-200mm)
- Lightweight tripod (for selfies and sunsets)
- Polarizing filter (reduces reflections)

## Photography Tips

### Golden Hour Magic

Shoot during the first and last hour of daylight.

**Why it works:**
- Warm, flattering light
- Long shadows add depth
- Colors are vibrant
- Creates dramatic atmosphere

**Pro tip:** Wake up early for sunrises—the best hour of the day!

### Composition Techniques

**Rule of Thirds:**
Don't center your subject. Place it off-center for more dynamic photos.

**Leading Lines:**
Use trails, rivers, and ridges to guide the viewer's eye through the photo.

**Foreground Interest:**
Include trekkers, flowers, or rocks in the foreground to add depth.

**Layering:**
Create depth with foreground (close objects), midground (trekkers), and background (mountains).

## Special Conditions

### Mountain Light Intensity
- Mountain sun is intense—exposures calculate differently
- Test your settings early
- Shadows change rapidly (5-10 minutes)
- Altitude affects color saturation

### Managing Altitude Effects
- Air is clearer at altitude
- Colors seem more vivid
- Adjust ISO accordingly
- White balance may shift

## Practical Photography Tips

### Protection & Maintenance
- Protect gear from rain using waterproof bags
- Clean lenses daily (dust accumulates)
- Keep batteries warm (cold drains them)
- Back up photos regularly
- Consider cloud backup for safety

### Camera Settings

**For Landscapes:**
- Small aperture (f/5.6-f/16) for depth of field
- ISO 100-400
- Shutter speed: 1/100th or faster

**For People/Groups:**
- Aperture f/4-f/5.6 for decent depth
- Faster shutter (1/250th+) for movement
- ISO: as low as possible

### Important Reminders
- Always ask permission before photographing people
- Respect cultural sensitivity
- Back up important photos—don't lose them!
- Don't become a photo zombie—enjoy the moment!

## Beyond Technical Skills

Remember: **the best camera is the one you have with you.**

Some of my favorite trek photos were taken on iPhones. Focus on:
- Capturing moments of connection
- Genuine emotions and reactions
- Landscape that tells a story
- The experience, not just the image

## Photo Story Ideas

### What to Capture
- Sunrise and sunset views
- Local people and culture
- Details: flowers, insects, architecture
- Group dynamics and friendships
- Challenge moments (steep climbs, fatigue)
- Rest and reflection moments
- Food and meals
- Morning mist and weather changes

### Telling Your Story
Create a visual narrative:
1. Pre-trek preparation
2. Getting to trailhead
3. Initial challenges
4. Beautiful moments
5. Summit/peak emotions
6. Friendships formed
7. Return and reflection

## Final Thoughts

The trek itself is the greatest photography subject. Your authentic experience, genuine emotions, and real connections will shine through your photos.

Take lots of photos. Many will be technically imperfect but emotionally perfect. Those are the ones you'll treasure.

Now go capture your adventure!
    `
  }
}

export default function BlogArticle() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const post = blogPosts[id as keyof typeof blogPosts]

  if (!post) {
    return (
      <div className="min-h-screen pt-32 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Article Not Found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <main className="w-full min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-96 w-full pt-32 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 max-w-4xl mx-auto px-4 h-full flex items-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <p className="inline-block bg-primary px-4 py-1 rounded-full text-sm font-semibold mb-4">
              {post.category}
            </p>
            <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-6 mb-12 flex-wrap text-foreground/60 border-b border-border pb-8"
          >
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div>{post.readTime}</div>
          </motion.div>

          {/* Article Body */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-invert max-w-none mb-16 text-foreground"
          >
            <div className="space-y-6 text-lg leading-relaxed">
              {post.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('#')) {
                  const level = paragraph.match(/^#+/)?.[0].length || 1
                  const text = paragraph.replace(/^#+\s/, '')
                  const sizes = ['text-4xl', 'text-3xl', 'text-2xl', 'text-xl']
                  return (
                    <h2 key={i} className={`${sizes[level - 1]} font-bold text-primary mt-8 mb-4`}>
                      {text}
                    </h2>
                  )
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(l => l.startsWith('- '))
                  return (
                    <ul key={i} className="space-y-2 ml-4">
                      {items.map((item, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="text-primary">•</span>
                          <span>{item.replace('- ', '')}</span>
                        </li>
                      ))}
                    </ul>
                  )
                }
                if (paragraph.startsWith('|')) {
                  return null
                }
                return <p key={i}>{paragraph}</p>
              })}
            </div>
          </motion.article>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-t border-b border-border py-8 my-8"
          >
            <h3 className="text-lg font-semibold mb-4">Share This Article</h3>
            <div className="flex gap-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Facebook
              </a>
              <a
                href={`https://wa.me/?text=${post.title} ${typeof window !== 'undefined' ? window.location.href : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Related Links */}
          <div className="mt-12">
            <Link href="/blog">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft size={18} />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Trek?</h2>
          <p className="text-lg mb-8">Get expert guidance and book your adventure today</p>
          <a
            href="https://wa.me/9779841234567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 font-semibold"
          >
            WhatsApp Us
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center text-white/70">
          <p>&copy; 2024 NMZ RAHUL. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
