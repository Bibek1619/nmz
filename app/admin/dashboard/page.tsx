'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Image as ImageIcon, Save, X } from 'lucide-react'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('hero')
  const [heroData, setHeroData] = useState({
    title: 'Conquer the Himalayas',
    subtitle: 'Experience breathtaking mountain adventures with professional guide NMZ RAHUL',
    image: '/hero-mountain.jpg'
  })

  const [aboutData, setAboutData] = useState({
    title: 'Meet Your Guide',
    description: 'Hi, I\'m NMZ RAHUL, a professional mountain trekking guide with over 10 years of experience guiding adventurers through Nepal\'s most spectacular mountain ranges.',
    image: '/profile.jpg',
    achievements: [
      { icon: '🏆', title: '100+ Successful Treks', subtitle: 'Happy adventurers' },
      { icon: '⛰️', title: '15+ Routes', subtitle: 'Expert knowledge' },
      { icon: '⭐', title: '5 Star Rating', subtitle: 'Verified reviews' },
      { icon: '✓', title: 'Safety First', subtitle: 'Certified guide' }
    ]
  })

  const [trekData, setTrekData] = useState([
    { id: 'annapurna', name: 'Annapurna Base Camp', difficulty: 'Moderate', days: '7-8 days', price: '$1,200' },
    { id: 'mardi', name: 'Mardi Himal', difficulty: 'Easy', days: '5-6 days', price: '$900' },
    { id: 'everest', name: 'Everest Base Camp', difficulty: 'Hard', days: '14 days', price: '$2,500' }
  ])

  const [galleryData, setGalleryData] = useState([
    { id: 1, title: 'Mountain Sunrise', image: '/gallery-1.jpg' },
    { id: 2, title: 'Trek Adventure', image: '/gallery-2.jpg' },
    { id: 3, title: 'Peak View', image: '/gallery-3.jpg' },
    { id: 4, title: 'Village Culture', image: '/gallery-4.jpg' }
  ])

  const [faqData, setFaqData] = useState([
    { id: 1, question: 'What is the best time to trek?', answer: 'The best time to trek in Nepal is September to November (autumn) and March to May (spring).' },
    { id: 2, question: 'Do I need special fitness?', answer: 'Good fitness helps, but our guides pace the trek to your comfort level.' },
    { id: 3, question: 'What about altitude sickness?', answer: 'We follow proper acclimatization protocols and carry necessary medications.' }
  ])

  const [contactData, setContactData] = useState({
    phone: '+977-9841234567',
    whatsapp: '+977-9841234567',
    email: 'rahul@nmzrahul.com',
    location: 'Kathmandu, Nepal',
    address: 'Thamel, Kathmandu'
  })

  const [editingTrek, setEditingTrek] = useState(null)
  const [editingFaq, setEditingFaq] = useState(null)
  const [newTrek, setNewTrek] = useState(null)
  const [newFaq, setNewFaq] = useState(null)

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Admin Dashboard</h1>
          <p className="text-foreground/70">Manage all content for NMZ RAHUL</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="treks">Treks</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Hero Title</label>
                  <Input
                    value={heroData.title}
                    onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                    placeholder="Enter hero title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Hero Subtitle</label>
                  <Textarea
                    value={heroData.subtitle}
                    onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                    placeholder="Enter hero subtitle"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Hero Image</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <ImageIcon className="mx-auto mb-3 text-primary/50" size={40} />
                    <p className="text-sm text-foreground/60 mb-3">Current: {heroData.image}</p>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="hero-image"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setHeroData({ ...heroData, image: e.target.files[0].name })
                        }
                      }}
                    />
                    <label htmlFor="hero-image">
                      <Button variant="outline" asChild className="cursor-pointer">
                        <span>Upload Image</span>
                      </Button>
                    </label>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Save size={18} className="mr-2" />
                  Save Changes
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* About Section */}
          <TabsContent value="about" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">About Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">About Title</label>
                  <Input
                    value={aboutData.title}
                    onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
                    placeholder="Enter about title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">About Description</label>
                  <Textarea
                    value={aboutData.description}
                    onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
                    placeholder="Enter about description"
                    rows={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Profile Image</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <ImageIcon className="mx-auto mb-3 text-primary/50" size={40} />
                    <p className="text-sm text-foreground/60 mb-3">Current: {aboutData.image}</p>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="about-image"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setAboutData({ ...aboutData, image: e.target.files[0].name })
                        }
                      }}
                    />
                    <label htmlFor="about-image">
                      <Button variant="outline" asChild className="cursor-pointer">
                        <span>Upload Image</span>
                      </Button>
                    </label>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-lg font-bold mb-4">Achievements</h3>
                  {aboutData.achievements.map((achievement, idx) => (
                    <Card key={idx} className="p-4 mb-3 bg-card/50">
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <Input value={achievement.icon} className="text-center" disabled />
                        <Input
                          value={achievement.title}
                          onChange={(e) => {
                            const updated = [...aboutData.achievements]
                            updated[idx].title = e.target.value
                            setAboutData({ ...aboutData, achievements: updated })
                          }}
                          placeholder="Title"
                        />
                        <Input
                          value={achievement.subtitle}
                          onChange={(e) => {
                            const updated = [...aboutData.achievements]
                            updated[idx].subtitle = e.target.value
                            setAboutData({ ...aboutData, achievements: updated })
                          }}
                          placeholder="Subtitle"
                        />
                      </div>
                    </Card>
                  ))}
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Save size={18} className="mr-2" />
                  Save Changes
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Treks Section */}
          <TabsContent value="treks" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Treks</h2>
                <Button onClick={() => setNewTrek({})} className="bg-primary hover:bg-primary/90">
                  + Add Trek
                </Button>
              </div>

              {newTrek && (
                <Card className="p-6 mb-6 border-primary/50 bg-primary/5">
                  <h3 className="text-lg font-bold mb-4">New Trek</h3>
                  <div className="space-y-4">
                    <Input
                      placeholder="Trek ID"
                      value={newTrek.id || ''}
                      onChange={(e) => setNewTrek({ ...newTrek, id: e.target.value })}
                    />
                    <Input
                      placeholder="Trek Name"
                      value={newTrek.name || ''}
                      onChange={(e) => setNewTrek({ ...newTrek, name: e.target.value })}
                    />
                    <Input
                      placeholder="Difficulty (Easy/Moderate/Hard)"
                      value={newTrek.difficulty || ''}
                      onChange={(e) => setNewTrek({ ...newTrek, difficulty: e.target.value })}
                    />
                    <Input
                      placeholder="Duration"
                      value={newTrek.days || ''}
                      onChange={(e) => setNewTrek({ ...newTrek, days: e.target.value })}
                    />
                    <Input
                      placeholder="Price"
                      value={newTrek.price || ''}
                      onChange={(e) => setNewTrek({ ...newTrek, price: e.target.value })}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setTrekData([...trekData, newTrek])
                          setNewTrek(null)
                        }}
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        Add Trek
                      </Button>
                      <Button
                        onClick={() => setNewTrek(null)}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-4">
                {trekData.map((trek, idx) => (
                  <Card key={idx} className="p-4">
                    {editingTrek === idx ? (
                      <div className="space-y-3">
                        <Input
                          value={trek.name}
                          onChange={(e) => {
                            const updated = [...trekData]
                            updated[idx].name = e.target.value
                            setTrekData(updated)
                          }}
                          placeholder="Trek name"
                        />
                        <Input
                          value={trek.difficulty}
                          onChange={(e) => {
                            const updated = [...trekData]
                            updated[idx].difficulty = e.target.value
                            setTrekData(updated)
                          }}
                          placeholder="Difficulty"
                        />
                        <Input
                          value={trek.days}
                          onChange={(e) => {
                            const updated = [...trekData]
                            updated[idx].days = e.target.value
                            setTrekData(updated)
                          }}
                          placeholder="Duration"
                        />
                        <Input
                          value={trek.price}
                          onChange={(e) => {
                            const updated = [...trekData]
                            updated[idx].price = e.target.value
                            setTrekData(updated)
                          }}
                          placeholder="Price"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setEditingTrek(null)}
                            className="flex-1 bg-primary hover:bg-primary/90"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => setEditingTrek(null)}
                            variant="outline"
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{trek.name}</h3>
                          <p className="text-sm text-foreground/60">
                            {trek.difficulty} • {trek.days} • {trek.price}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setEditingTrek(idx)}
                            variant="outline"
                            size="sm"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => setTrekData(trekData.filter((_, i) => i !== idx))}
                            variant="destructive"
                            size="sm"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Gallery Section */}
          <TabsContent value="gallery" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Gallery Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {galleryData.map((item, idx) => (
                  <Card key={idx} className="overflow-hidden">
                    <div className="bg-muted h-40 flex items-center justify-center">
                      <ImageIcon size={40} className="text-foreground/30" />
                    </div>
                    <div className="p-4 space-y-3">
                      <Input
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...galleryData]
                          updated[idx].title = e.target.value
                          setGalleryData(updated)
                        }}
                        placeholder="Image title"
                      />
                      <Input
                        value={item.image}
                        disabled
                        placeholder="Image path"
                        className="text-xs"
                      />
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            const input = document.createElement('input')
                            input.type = 'file'
                            input.accept = 'image/*'
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0]
                              if (file) {
                                const updated = [...galleryData]
                                updated[idx].image = file.name
                                setGalleryData(updated)
                              }
                            }
                            input.click()
                          }}
                        >
                          <ImageIcon size={16} className="mr-2" />
                          Change
                        </Button>
                        <Button
                          onClick={() => setGalleryData(galleryData.filter((_, i) => i !== idx))}
                          variant="destructive"
                          className="flex-1"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                <ImageIcon size={18} className="mr-2" />
                Add Image
              </Button>
            </Card>
          </TabsContent>

          {/* FAQ Section */}
          <TabsContent value="faq" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">FAQ Management</h2>
                <Button onClick={() => setNewFaq({})} className="bg-primary hover:bg-primary/90">
                  + Add FAQ
                </Button>
              </div>

              {newFaq && (
                <Card className="p-6 mb-6 border-primary/50 bg-primary/5">
                  <h3 className="text-lg font-bold mb-4">New FAQ</h3>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Question"
                      value={newFaq.question || ''}
                      onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                      rows={2}
                    />
                    <Textarea
                      placeholder="Answer"
                      value={newFaq.answer || ''}
                      onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setFaqData([...faqData, { id: faqData.length + 1, ...newFaq }])
                          setNewFaq(null)
                        }}
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        Add FAQ
                      </Button>
                      <Button
                        onClick={() => setNewFaq(null)}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-4">
                {faqData.map((faq, idx) => (
                  <Card key={idx} className="p-4">
                    {editingFaq === idx ? (
                      <div className="space-y-3">
                        <Textarea
                          value={faq.question}
                          onChange={(e) => {
                            const updated = [...faqData]
                            updated[idx].question = e.target.value
                            setFaqData(updated)
                          }}
                          placeholder="Question"
                          rows={2}
                        />
                        <Textarea
                          value={faq.answer}
                          onChange={(e) => {
                            const updated = [...faqData]
                            updated[idx].answer = e.target.value
                            setFaqData(updated)
                          }}
                          placeholder="Answer"
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setEditingFaq(null)}
                            className="flex-1 bg-primary hover:bg-primary/90"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => setEditingFaq(null)}
                            variant="outline"
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-sm mb-2">{faq.question}</h3>
                          <p className="text-sm text-foreground/60">{faq.answer}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setEditingFaq(idx)}
                            variant="outline"
                            size="sm"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => setFaqData(faqData.filter((_, i) => i !== idx))}
                            variant="destructive"
                            size="sm"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Contact Section */}
          <TabsContent value="contact" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone</label>
                  <Input
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">WhatsApp</label>
                  <Input
                    value={contactData.whatsapp}
                    onChange={(e) => setContactData({ ...contactData, whatsapp: e.target.value })}
                    placeholder="Enter WhatsApp number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <Input
                    type="email"
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Location</label>
                  <Input
                    value={contactData.location}
                    onChange={(e) => setContactData({ ...contactData, location: e.target.value })}
                    placeholder="Enter location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Address</label>
                  <Textarea
                    value={contactData.address}
                    onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                    placeholder="Enter full address"
                    rows={3}
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Save size={18} className="mr-2" />
                  Save Changes
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Reviews Section */}
          <TabsContent value="reviews" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Reviews Management</h2>
              <div className="space-y-4">
                <Card className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold">Sarah Johnson</h3>
                      <p className="text-sm text-foreground/60">USA</p>
                      <div className="flex gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-primary text-lg">★</span>
                        ))}
                      </div>
                    </div>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </div>
                  <p className="text-sm text-foreground/80">
                    Rahul made our Annapurna trek unforgettable. Professional, friendly, and incredibly knowledgeable!
                  </p>
                </Card>

                <Card className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold">Michael Chen</h3>
                      <p className="text-sm text-foreground/60">Canada</p>
                      <div className="flex gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-primary text-lg">★</span>
                        ))}
                      </div>
                    </div>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </div>
                  <p className="text-sm text-foreground/80">
                    Best trekking experience of my life. The guides really care about safety and your experience.
                  </p>
                </Card>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-bold mb-4">Add New Review</h3>
                <div className="space-y-3">
                  <Input placeholder="Name" />
                  <Input placeholder="Location" />
                  <Textarea placeholder="Review text" rows={3} />
                  <div>
                    <label className="block text-sm font-semibold mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Button
                          key={i}
                          variant="outline"
                          className="w-10 h-10 p-0"
                        >
                          {i}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">Add Review</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
