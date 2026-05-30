'use client'

import { useState, useEffect } from 'react'
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
  Phone, Star, User, Home, Save, ArrowLeft, TrendingUp, Loader2,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { TrekEditor } from '@/components/TrekEditor'
import { GalleryManager } from '@/components/GalleryManager'

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

type TrekItem = { 
  id: string; 
  name: string; 
  subtext?: string;
  difficulty: string; 
  days: string; 
  price: string;
  image?: string;
  description?: string;
  bestSeason?: string;
  height?: string;
  distance?: string;
  highlights?: string[];
  itinerary?: { day: string; title: string; description: string }[];
  included?: string[];
  notIncluded?: string[];
  featured?: boolean;
}
type FaqItem  = { id: number; question: string; answer: string }

export default function AdminDashboard() {
  const { toast } = useToast()
  const [activeSection, setActiveSection] = useState('overview')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const [heroData, setHeroData] = useState({
    title:    'Conquer the Himalayas',
    subtitle: 'Experience breathtaking mountain adventures with professional guide NMZ RAHUL',
    image:    '/hero-mountain.jpg',
  })

  const [aboutData, setAboutData] = useState({
    name: '',
    title: '',
    bio: '',
    profileImage: '',
    mainPageImage: '',
    stats: {
      happyTrekkers: 0,
      successfulTreks: 0,
      yearsExperience: 0,
      routes: 0,
    },
    email: '',
    phone: '',
    whatsapp: '',
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: '',
    },
    certifications: [] as string[],
    languages: [] as string[],
    specializations: [] as string[],
  })

  // Fetch about data on mount
  useEffect(() => {
    if (activeSection === 'about') {
      fetchAboutData()
    }
    if (activeSection === 'treks') {
      fetchTreks()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection])

  const fetchTreks = async () => {
    setLoadingTreks(true)
    try {
      const response = await fetch('/api/admin/treks')
      if (!response.ok) throw new Error('Failed to fetch treks')
      
      const data = await response.json()
      setTrekData(data)
    } catch (error) {
      console.error('Error fetching treks:', error)
      toast({
        title: 'Error',
        description: 'Failed to load treks',
        variant: 'destructive',
      })
    } finally {
      setLoadingTreks(false)
    }
  }

  const fetchAboutData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/about')
      if (!response.ok) throw new Error('Failed to fetch about data')
      
      const data = await response.json()
      setAboutData({
        name: data.name || '',
        title: data.title || '',
        bio: data.bio || '',
        profileImage: data.profileImage || '',
        mainPageImage: data.mainPageImage || '',
        stats: data.stats || { happyTrekkers: 0, successfulTreks: 0, yearsExperience: 0, routes: 0 },
        email: data.email || '',
        phone: data.phone || '',
        whatsapp: data.whatsapp || '',
        socialLinks: data.socialLinks || { facebook: '', instagram: '', twitter: '' },
        certifications: data.certifications || [],
        languages: data.languages || [],
        specializations: data.specializations || [],
      })
    } catch (error) {
      console.error('Error fetching about data:', error)
      toast({
        title: 'Error',
        description: 'Failed to load about data',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const saveAboutData = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutData),
      })
      
      if (!response.ok) throw new Error('Failed to save about data')
      
      const result = await response.json()
      toast({
        title: 'Success',
        description: 'About section updated successfully',
      })
    } catch (error) {
      console.error('Error saving about data:', error)
      toast({
        title: 'Error',
        description: 'Failed to save about data',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  const [trekData, setTrekData] = useState<TrekItem[]>([])
  const [loadingTreks, setLoadingTreks] = useState(false)

  const [editingTrekData, setEditingTrekData] = useState<TrekItem | null>(null)

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

  const [editingFaq,  setEditingFaq]  = useState<number | null>(null)
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
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">About Section</h2>
                {loading && <Loader2 className="animate-spin text-muted-foreground" size={20} />}
              </div>

              {loading ? (
                <Card className="p-6">
                  <p className="text-center text-muted-foreground">Loading...</p>
                </Card>
              ) : (
                <>
                  {/* Personal Information */}
                  <Card className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg">Personal Information</h3>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Name</label>
                      <Input 
                        value={aboutData.name} 
                        onChange={e => setAboutData({ ...aboutData, name: e.target.value })} 
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Title</label>
                      <Input 
                        value={aboutData.title} 
                        onChange={e => setAboutData({ ...aboutData, title: e.target.value })} 
                        placeholder="e.g., Professional Mountain Guide"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Bio (About Yourself)</label>
                      <Textarea 
                        rows={5} 
                        value={aboutData.bio} 
                        onChange={e => setAboutData({ ...aboutData, bio: e.target.value })} 
                        placeholder="Tell your story..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Profile Image Path (for /about page)</label>
                      <Input 
                        value={aboutData.profileImage} 
                        onChange={e => setAboutData({ ...aboutData, profileImage: e.target.value })} 
                        placeholder="/profile.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Main Page Image (for homepage animated image)</label>
                      <Input 
                        value={aboutData.mainPageImage} 
                        onChange={e => setAboutData({ ...aboutData, mainPageImage: e.target.value })} 
                        placeholder="/profile.jpg"
                      />
                      <p className="text-xs text-muted-foreground mt-1">This image appears in the animated circle on the homepage</p>
                    </div>
                  </Card>

                  {/* Statistics */}
                  <Card className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg">Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-1.5">Happy Trekkers</label>
                        <Input 
                          type="number" 
                          value={aboutData.stats.happyTrekkers} 
                          onChange={e => setAboutData({ 
                            ...aboutData, 
                            stats: { ...aboutData.stats, happyTrekkers: parseInt(e.target.value) || 0 }
                          })} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1.5">Successful Treks</label>
                        <Input 
                          type="number" 
                          value={aboutData.stats.successfulTreks} 
                          onChange={e => setAboutData({ 
                            ...aboutData, 
                            stats: { ...aboutData.stats, successfulTreks: parseInt(e.target.value) || 0 }
                          })} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1.5">Years of Experience</label>
                        <Input 
                          type="number" 
                          value={aboutData.stats.yearsExperience} 
                          onChange={e => setAboutData({ 
                            ...aboutData, 
                            stats: { ...aboutData.stats, yearsExperience: parseInt(e.target.value) || 0 }
                          })} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1.5">Routes</label>
                        <Input 
                          type="number" 
                          value={aboutData.stats.routes} 
                          onChange={e => setAboutData({ 
                            ...aboutData, 
                            stats: { ...aboutData.stats, routes: parseInt(e.target.value) || 0 }
                          })} 
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Contact Information */}
                  <Card className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg">Contact Information</h3>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Email</label>
                      <Input 
                        type="email" 
                        value={aboutData.email} 
                        onChange={e => setAboutData({ ...aboutData, email: e.target.value })} 
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Phone</label>
                      <Input 
                        value={aboutData.phone} 
                        onChange={e => setAboutData({ ...aboutData, phone: e.target.value })} 
                        placeholder="+977-9841234567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">WhatsApp</label>
                      <Input 
                        value={aboutData.whatsapp} 
                        onChange={e => setAboutData({ ...aboutData, whatsapp: e.target.value })} 
                        placeholder="+977-9841234567"
                      />
                    </div>
                  </Card>

                  {/* Social Links */}
                  <Card className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg">Social Media Links</h3>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Facebook</label>
                      <Input 
                        value={aboutData.socialLinks.facebook} 
                        onChange={e => setAboutData({ 
                          ...aboutData, 
                          socialLinks: { ...aboutData.socialLinks, facebook: e.target.value }
                        })} 
                        placeholder="https://facebook.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Instagram</label>
                      <Input 
                        value={aboutData.socialLinks.instagram} 
                        onChange={e => setAboutData({ 
                          ...aboutData, 
                          socialLinks: { ...aboutData.socialLinks, instagram: e.target.value }
                        })} 
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Twitter</label>
                      <Input 
                        value={aboutData.socialLinks.twitter} 
                        onChange={e => setAboutData({ 
                          ...aboutData, 
                          socialLinks: { ...aboutData.socialLinks, twitter: e.target.value }
                        })} 
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                  </Card>

                  {/* Additional Information */}
                  <Card className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg">Additional Information</h3>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Certifications (comma-separated)</label>
                      <Textarea 
                        rows={3} 
                        value={aboutData.certifications.join(', ')} 
                        onChange={e => setAboutData({ 
                          ...aboutData, 
                          certifications: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        })} 
                        placeholder="First Aid Certified, Mountain Guide License, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Languages (comma-separated)</label>
                      <Input 
                        value={aboutData.languages.join(', ')} 
                        onChange={e => setAboutData({ 
                          ...aboutData, 
                          languages: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        })} 
                        placeholder="English, Nepali, Hindi, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Specializations (comma-separated)</label>
                      <Input 
                        value={aboutData.specializations.join(', ')} 
                        onChange={e => setAboutData({ 
                          ...aboutData, 
                          specializations: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        })} 
                        placeholder="High Altitude Trekking, Cultural Tours, etc."
                      />
                    </div>
                  </Card>

                  {/* Save Button */}
                  <Button 
                    className="w-full gap-2" 
                    onClick={saveAboutData}
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Save Changes
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          )}

          {/* Treks */}
          {activeSection === 'treks' && (
            <div className="space-y-4">
              {editingTrekData === null ? (
                <>
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Treks</h2>
                    <Button size="sm" onClick={() => setEditingTrekData({} as TrekItem)}>
                      + Add Trek
                    </Button>
                  </div>

                  {loadingTreks ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="animate-spin" size={32} />
                    </div>
                  ) : trekData.length === 0 ? (
                    <Card className="p-12 text-center">
                      <Mountain size={48} className="mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No treks added yet</p>
                      <p className="text-sm text-muted-foreground mt-2">Click "Add Trek" to create your first trek</p>
                    </Card>
                  ) : (
                    <div className="space-y-3">
                      {trekData.map((trek, idx) => (
                        <Card key={idx} className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              {/* Star button for featuring */}
                              <Button
                                variant="ghost"
                                size="icon"
                                className={trek.featured ? 'text-green-600 hover:text-green-700' : 'text-muted-foreground hover:text-foreground'}
                                onClick={async () => {
                                  try {
                                    const updatedTrek = { ...trek, featured: !trek.featured }
                                    const response = await fetch('/api/admin/treks', {
                                      method: 'PUT',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify(updatedTrek),
                                    })
                                    
                                    if (!response.ok) throw new Error('Failed to update')
                                    
                                    fetchTreks()
                                    toast({
                                      title: trek.featured ? 'Removed from Featured' : 'Added to Featured',
                                      description: trek.featured 
                                        ? `${trek.name} is no longer featured` 
                                        : `${trek.name} is now featured on homepage`,
                                    })
                                  } catch (error) {
                                    toast({
                                      title: 'Error',
                                      description: 'Failed to update featured status',
                                      variant: 'destructive',
                                    })
                                  }
                                }}
                              >
                                <Star 
                                  size={20} 
                                  className={trek.featured ? 'fill-green-600' : ''} 
                                />
                              </Button>
                              <div>
                                <p className="font-semibold">{trek.name}</p>
                                {trek.subtext && (
                                  <p className="text-xs text-muted-foreground italic">{trek.subtext}</p>
                                )}
                                <p className="text-sm text-muted-foreground">
                                  {trek.difficulty} · {trek.days} · {trek.price}
                                  {trek.featured && (
                                    <span className="ml-2 text-xs text-green-600 font-medium">• Featured</span>
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingTrekData(trek)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={async () => {
                                  if (!confirm('Are you sure you want to delete this trek?')) return
                                  
                                  try {
                                    const response = await fetch(`/api/admin/treks?id=${trek.id}`, {
                                      method: 'DELETE',
                                    })
                                    
                                    if (!response.ok) throw new Error('Failed to delete')
                                    
                                    fetchTreks()
                                    toast({
                                      title: 'Success',
                                      description: 'Trek deleted successfully',
                                    })
                                  } catch (error) {
                                    toast({
                                      title: 'Error',
                                      description: 'Failed to delete trek',
                                      variant: 'destructive',
                                    })
                                  }
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <TrekEditor
                  trek={editingTrekData}
                  onSave={async (updatedTrek) => {
                    try {
                      const existingIndex = trekData.findIndex((t) => t.id === updatedTrek.id)
                      
                      if (existingIndex >= 0) {
                        // Update existing trek
                        const response = await fetch('/api/admin/treks', {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(updatedTrek),
                        })
                        
                        if (!response.ok) throw new Error('Failed to update trek')
                      } else {
                        // Add new trek
                        const response = await fetch('/api/admin/treks', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(updatedTrek),
                        })
                        
                        if (!response.ok) throw new Error('Failed to add trek')
                      }
                      
                      setEditingTrekData(null)
                      fetchTreks() // Refresh the list
                      toast({
                        title: 'Success',
                        description: 'Trek saved successfully',
                      })
                    } catch (error) {
                      console.error('Error saving trek:', error)
                      toast({
                        title: 'Error',
                        description: 'Failed to save trek',
                        variant: 'destructive',
                      })
                    }
                  }}
                  onCancel={() => setEditingTrekData(null)}
                />
              )}
            </div>
          )}

          {/* Gallery */}
          {activeSection === 'gallery' && (
            <GalleryManager />
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
