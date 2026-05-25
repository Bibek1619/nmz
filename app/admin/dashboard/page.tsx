'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarGroupContent, SidebarGroupLabel, SidebarHeader,
  SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  LayoutDashboard, Mountain, Image as ImageIcon, HelpCircle,
  Phone, Star, User, Home, Save, ArrowLeft, TrendingUp,
} from 'lucide-react'

const navItems = [
  { id: 'overview', label: 'Overview',     icon: LayoutDashboard },
  { id: 'hero',     label: 'Hero Section', icon: Home            },
  { id: 'about',    label: 'About',        icon: User            },
  { id: 'treks',    label: 'Treks',        icon: Mountain        },
  { id: 'gallery',  label: 'Gallery',      icon: ImageIcon       },
  { id: 'faq',      label: 'FAQ',          icon: HelpCircle      },
  { id: 'contact',  label: 'Contact',      icon: Phone           },
  { id: 'reviews',  label: 'Reviews',      icon: Star            },
]

type TrekItem = { id: string; name: string; difficulty: string; days: string; price: string }
type FaqItem  = { id: number; question: string; answer: string }

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview')

  const [heroData, setHeroData] = useState({
    title:    'Conquer the Himalayas',
    subtitle: 'Experience breathtaking mountain adventures with professional guide NMZ RAHUL',
    image:    '/hero-mountain.jpg',
  })

  const [aboutData, setAboutData] = useState({
    title:       'Meet Your Guide',
    description: "Hi, I'm NMZ RAHUL, a professional mountain trekking guide with over 10 years of experience.",
    image:       '/profile.jpg',
  })

  const [trekData, setTrekData] = useState<TrekItem[]>([
    { id: 'annapurna', name: 'Annapurna Base Camp', difficulty: 'Moderate', days: '7-8 days', price: '$1,200' },
    { id: 'mardi',     name: 'Mardi Himal',         difficulty: 'Easy',     days: '5-6 days', price: '$900'   },
    { id: 'everest',   name: 'Everest Base Camp',   difficulty: 'Hard',     days: '14 days',  price: '$2,500' },
  ])

  const [galleryData, setGalleryData] = useState([
    { id: 1, title: 'Mountain Sunrise', image: '/gallery-1.jpg' },
    { id: 2, title: 'Trek Adventure',   image: '/gallery-2.jpg' },
    { id: 3, title: 'Peak View',        image: '/gallery-3.jpg' },
    { id: 4, title: 'Village Culture',  image: '/gallery-4.jpg' },
  ])

  const [faqData, setFaqData] = useState<FaqItem[]>([
    { id: 1, question: 'What is the best time to trek?', answer: 'September to November and March to May.'          },
    { id: 2, question: 'Do I need special fitness?',     answer: 'Good fitness helps, but we pace to your comfort.' },
    { id: 3, question: 'What about altitude sickness?',  answer: 'We follow proper acclimatization protocols.'      },
  ])

  const [contactData, setContactData] = useState({
    phone:    '+977-9841234567',
    whatsapp: '+977-9841234567',
    email:    'rahul@nmzrahul.com',
    location: 'Kathmandu, Nepal',
    address:  'Thamel, Kathmandu',
  })

  const [editingTrek, setEditingTrek] = useState<number | null>(null)
  const [editingFaq,  setEditingFaq]  = useState<number | null>(null)
  const [newTrek, setNewTrek] = useState<Partial<TrekItem> | null>(null)
  const [newFaq,  setNewFaq]  = useState<Partial<FaqItem>  | null>(null)

  const currentNav = navItems.find(n => n.id === activeSection)

  return (
    <div className="flex min-h-screen w-full">

      {/* Sidebar */}
      <Sidebar collapsible="icon">
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="px-2 py-3">
            <span className="text-base font-bold tracking-wide logo-gradient">NMZ RAHUL</span>
            <p className="text-xs text-muted-foreground mt-0.5">Admin Panel</p>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={activeSection === item.id}
                      onClick={() => setActiveSection(item.id)}
                      tooltip={item.label}
                    >
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Back to site">
                <Link href="/">
                  <ArrowLeft size={16} />
                  <span>Back to Site</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Main Area */}
      <SidebarInset>
        <header className="flex h-14 items-center gap-3 border-b border-border px-6 bg-background/80 backdrop-blur sticky top-0 z-10">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />
          <p className="text-sm text-muted-foreground">
            Admin / <span className="text-foreground font-medium">{currentNav?.label}</span>
          </p>
        </header>

        <div className="p-6 max-w-4xl space-y-6">

          {/* Overview */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Overview</h2>
                <p className="text-muted-foreground text-sm mt-1">Welcome back, Rahul. Here&apos;s your site summary.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Treks', value: trekData.length,    icon: Mountain,   color: 'text-primary'    },
                  { label: 'Gallery',     value: galleryData.length, icon: ImageIcon,  color: 'text-accent'     },
                  { label: 'Reviews',     value: 2,                  icon: Star,       color: 'text-yellow-500' },
                  { label: 'FAQs',        value: faqData.length,     icon: HelpCircle, color: 'text-secondary'  },
                ].map((s) => (
                  <Card key={s.label} className="p-4 flex items-center gap-3">
                    <s.icon className={s.color} size={26} />
                    <div>
                      <p className="text-2xl font-bold">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  </Card>
                ))}
              </div>
              <Card className="p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp size={16} className="text-primary" /> Quick Actions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {navItems.filter(n => n.id !== 'overview').map(n => (
                    <Button key={n.id} variant="outline" size="sm" onClick={() => setActiveSection(n.id)} className="gap-2">
                      <n.icon size={13} />{n.label}
                    </Button>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Hero */}
          {activeSection === 'hero' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Hero Section</h2>
              <Card className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Title</label>
                  <Input value={heroData.title} onChange={e => setHeroData({ ...heroData, title: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Subtitle</label>
                  <Textarea rows={3} value={heroData.subtitle} onChange={e => setHeroData({ ...heroData, subtitle: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Hero Image Path</label>
                  <Input value={heroData.image} onChange={e => setHeroData({ ...heroData, image: e.target.value })} />
                </div>
                <Button className="w-full gap-2"><Save size={16} />Save Changes</Button>
              </Card>
            </div>
          )}

          {/* About */}
          {activeSection === 'about' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">About Section</h2>
              <Card className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Title</label>
                  <Input value={aboutData.title} onChange={e => setAboutData({ ...aboutData, title: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Description</label>
                  <Textarea rows={5} value={aboutData.description} onChange={e => setAboutData({ ...aboutData, description: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Profile Image Path</label>
                  <Input value={aboutData.image} onChange={e => setAboutData({ ...aboutData, image: e.target.value })} />
                </div>
                <Button className="w-full gap-2"><Save size={16} />Save Changes</Button>
              </Card>
            </div>
          )}

          {/* Treks */}
          {activeSection === 'treks' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Treks</h2>
                <Button size="sm" onClick={() => setNewTrek({})}>+ Add Trek</Button>
              </div>

              {newTrek !== null && (
                <Card className="p-5 border-primary/40 bg-primary/5 space-y-3">
                  <h3 className="font-semibold">New Trek</h3>
                  {(['id', 'name', 'difficulty', 'days', 'price'] as const).map(field => (
                    <Input key={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={(newTrek as Record<string, string>)[field] ?? ''}
                      onChange={e => setNewTrek({ ...newTrek, [field]: e.target.value })} />
                  ))}
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => { setTrekData([...trekData, newTrek as TrekItem]); setNewTrek(null) }}>Add</Button>
                    <Button variant="outline" className="flex-1" onClick={() => setNewTrek(null)}>Cancel</Button>
                  </div>
                </Card>
              )}

              <div className="space-y-3">
                {trekData.map((trek, idx) => (
                  <Card key={idx} className="p-4">
                    {editingTrek === idx ? (
                      <div className="space-y-3">
                        {(['name', 'difficulty', 'days', 'price'] as const).map(field => (
                          <Input key={field} placeholder={field} value={trek[field]}
                            onChange={e => { const u = [...trekData]; u[idx] = { ...u[idx], [field]: e.target.value }; setTrekData(u) }} />
                        ))}
                        <div className="flex gap-2">
                          <Button className="flex-1" onClick={() => setEditingTrek(null)}>Save</Button>
                          <Button variant="outline" className="flex-1" onClick={() => setEditingTrek(null)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{trek.name}</p>
                          <p className="text-sm text-muted-foreground">{trek.difficulty} · {trek.days} · {trek.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setEditingTrek(idx)}>Edit</Button>
                          <Button variant="destructive" size="sm" onClick={() => setTrekData(trekData.filter((_, i) => i !== idx))}>Delete</Button>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {activeSection === 'gallery' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Gallery</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {galleryData.map((item, idx) => (
                  <Card key={idx} className="overflow-hidden">
                    <div className="bg-muted h-36 flex items-center justify-center text-muted-foreground">
                      <ImageIcon size={36} />
                    </div>
                    <div className="p-4 space-y-2">
                      <Input value={item.title} placeholder="Title"
                        onChange={e => { const u = [...galleryData]; u[idx] = { ...u[idx], title: e.target.value }; setGalleryData(u) }} />
                      <Input value={item.image} placeholder="Image path" className="text-xs"
                        onChange={e => { const u = [...galleryData]; u[idx] = { ...u[idx], image: e.target.value }; setGalleryData(u) }} />
                      <Button variant="destructive" size="sm" className="w-full"
                        onClick={() => setGalleryData(galleryData.filter((_, i) => i !== idx))}>Delete</Button>
                    </div>
                  </Card>
                ))}
              </div>
              <Button variant="outline" className="w-full"
                onClick={() => setGalleryData([...galleryData, { id: Date.now(), title: 'New Photo', image: '' }])}>
                + Add Photo
              </Button>
            </div>
          )}

          {/* FAQ */}
          {activeSection === 'faq' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">FAQ</h2>
                <Button size="sm" onClick={() => setNewFaq({})}>+ Add FAQ</Button>
              </div>

              {newFaq !== null && (
                <Card className="p-5 border-primary/40 bg-primary/5 space-y-3">
                  <h3 className="font-semibold">New FAQ</h3>
                  <Textarea placeholder="Question" rows={2}
                    value={newFaq.question ?? ''}
                    onChange={e => setNewFaq({ ...newFaq, question: e.target.value })} />
                  <Textarea placeholder="Answer" rows={3}
                    value={newFaq.answer ?? ''}
                    onChange={e => setNewFaq({ ...newFaq, answer: e.target.value })} />
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => {
                      setFaqData([...faqData, { id: Date.now(), question: newFaq.question ?? '', answer: newFaq.answer ?? '' }])
                      setNewFaq(null)
                    }}>Add</Button>
                    <Button variant="outline" className="flex-1" onClick={() => setNewFaq(null)}>Cancel</Button>
                  </div>
                </Card>
              )}

              <div className="space-y-3">
                {faqData.map((faq, idx) => (
                  <Card key={idx} className="p-4">
                    {editingFaq === idx ? (
                      <div className="space-y-3">
                        <Textarea rows={2} value={faq.question}
                          onChange={e => { const u = [...faqData]; u[idx] = { ...u[idx], question: e.target.value }; setFaqData(u) }} />
                        <Textarea rows={3} value={faq.answer}
                          onChange={e => { const u = [...faqData]; u[idx] = { ...u[idx], answer: e.target.value }; setFaqData(u) }} />
                        <div className="flex gap-2">
                          <Button className="flex-1" onClick={() => setEditingFaq(null)}>Save</Button>
                          <Button variant="outline" className="flex-1" onClick={() => setEditingFaq(null)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <p className="font-semibold text-sm">{faq.question}</p>
                          <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button variant="outline" size="sm" onClick={() => setEditingFaq(idx)}>Edit</Button>
                          <Button variant="destructive" size="sm" onClick={() => setFaqData(faqData.filter((_, i) => i !== idx))}>Delete</Button>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Contact */}
          {activeSection === 'contact' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Contact Info</h2>
              <Card className="p-6 space-y-4">
                {([
                  { label: 'Phone',    key: 'phone'    },
                  { label: 'WhatsApp', key: 'whatsapp' },
                  { label: 'Email',    key: 'email'    },
                  { label: 'Location', key: 'location' },
                ] as { label: string; key: keyof typeof contactData }[]).map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold mb-1.5">{label}</label>
                    <Input value={contactData[key]} onChange={e => setContactData({ ...contactData, [key]: e.target.value })} />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Full Address</label>
                  <Textarea rows={3} value={contactData.address}
                    onChange={e => setContactData({ ...contactData, address: e.target.value })} />
                </div>
                <Button className="w-full gap-2"><Save size={16} />Save Changes</Button>
              </Card>
            </div>
          )}

          {/* Reviews */}
          {activeSection === 'reviews' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Reviews</h2>
              {[
                { name: 'Sarah Johnson', location: 'USA',    rating: 5, text: 'Rahul made our Annapurna trek unforgettable. Professional and knowledgeable!' },
                { name: 'Michael Chen',  location: 'Canada', rating: 5, text: 'Best trekking experience of my life. Safety first!'                          },
              ].map((r, i) => (
                <Card key={i} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.location}</p>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(r.rating)].map((_, j) => <Star key={j} size={13} className="fill-primary text-primary" />)}
                      </div>
                    </div>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{r.text}</p>
                </Card>
              ))}
              <Card className="p-5 space-y-3">
                <h3 className="font-semibold">Add Review</h3>
                <Input placeholder="Name" />
                <Input placeholder="Location" />
                <Textarea placeholder="Review text" rows={3} />
                <Button className="w-full">Add Review</Button>
              </Card>
            </div>
          )}

        </div>
      </SidebarInset>
    </div>
  )
}
