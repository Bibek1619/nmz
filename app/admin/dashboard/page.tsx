'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  Phone, Star, User, Home, Save, ArrowLeft, TrendingUp, Loader2, Upload, X, MoreHorizontal,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { TrekEditor } from '@/components/TrekEditor'
import { GalleryManager } from '@/components/GalleryManager'
import { BlogEditor } from '@/components/BlogEditor'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { id: 'overview', label: 'Overview',     icon: LayoutDashboard },
  { id: 'hero',     label: 'Hero Section', icon: Home            },
  { id: 'about',    label: 'About',        icon: User            },
  { id: 'treks',    label: 'Treks',        icon: Mountain        },
  { id: 'blog',     label: 'Blog',         icon: TrendingUp      },
  { id: 'gallery',  label: 'Gallery',      icon: ImageIcon       },
  { id: 'faq',      label: 'FAQ',          icon: HelpCircle      },
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
type BlogItem = {
  id: string
  title: string
  subtext: string
  category: string
  content: string
  coverImage?: string
  featured?: boolean
  published?: boolean
}

export default function AdminDashboard() {
  const { toast } = useToast()
  const [activeSection, setActiveSection] = useState('overview')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  
  // Image upload refs and states
  const heroImageInputRef = useRef<HTMLInputElement>(null)
  const profileImageInputRef = useRef<HTMLInputElement>(null)
  const mainPageImageInputRef = useRef<HTMLInputElement>(null)
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false)
  const [uploadingProfileImage, setUploadingProfileImage] = useState(false)
  const [uploadingMainPageImage, setUploadingMainPageImage] = useState(false)

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
  })

  // Close more menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowMoreMenu(false)
    if (showMoreMenu) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showMoreMenu])

  const fetchHeroData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/hero')
      if (!response.ok) throw new Error('Failed to fetch hero data')
      
      const data = await response.json()
      if (data) {
        setHeroData({
          title: data.title || '',
          subtitle: data.subtitle || '',
          image: data.backgroundImage || '',
        })
      }
    } catch (error) {
      console.error('Error fetching hero data:', error)
      toast({
        title: 'Error',
        description: 'Failed to load hero data',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const saveHeroData = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroData),
      })
      
      if (!response.ok) throw new Error('Failed to save hero data')
      
      toast({
        title: 'Success',
        description: 'Hero section updated successfully',
      })
    } catch (error) {
      console.error('Error saving hero data:', error)
      toast({
        title: 'Error',
        description: 'Failed to save hero data',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  // Fetch about data on mount
  useEffect(() => {
    if (activeSection === 'hero') {
      fetchHeroData()
    }
    if (activeSection === 'about') {
      fetchAboutData()
    }
    if (activeSection === 'treks') {
      fetchTreks()
    }
    if (activeSection === 'blog') {
      fetchBlogs()
    }
    if (activeSection === 'reviews') {
      fetchReviews()
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

  const fetchReviews = async () => {
    setLoadingReviews(true)
    try {
      const response = await fetch('/api/admin/reviews')
      if (!response.ok) throw new Error('Failed to fetch reviews')
      
      const data = await response.json()
      setReviewsData(data)
    } catch (error) {
      console.error('Error fetching reviews:', error)
      toast({
        title: 'Error',
        description: 'Failed to load reviews',
        variant: 'destructive',
      })
    } finally {
      setLoadingReviews(false)
    }
  }

  const fetchBlogs = async () => {
    setLoadingBlogs(true)
    try {
      const response = await fetch('/api/admin/blog')
      if (!response.ok) throw new Error('Failed to fetch blogs')
      
      const data = await response.json()
      setBlogData(data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
      toast({
        title: 'Error',
        description: 'Failed to load blogs',
        variant: 'destructive',
      })
    } finally {
      setLoadingBlogs(false)
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

  // Image upload handler
  const handleImageUpload = async (
    file: File,
    folder: string,
    setUploading: (val: boolean) => void,
    onSuccess: (url: string) => void
  ) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid File',
        description: 'Please select an image file',
        variant: 'destructive',
      })
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'Please select an image smaller than 10MB',
        variant: 'destructive',
      })
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      const data = await response.json()
      onSuccess(data.url)
      
      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      })
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
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

  const saveBlog = async (blog: BlogItem) => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog),
      })
      
      if (!response.ok) throw new Error('Failed to save blog')
      
      toast({
        title: 'Success',
        description: 'Blog saved successfully',
      })
      
      setEditingBlogData(null)
      fetchBlogs()
    } catch (error) {
      console.error('Error saving blog:', error)
      toast({
        title: 'Error',
        description: 'Failed to save blog',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  const deleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return
    
    setSaving(true)
    try {
      const response = await fetch(`/api/admin/blog?id=${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete blog')
      
      toast({
        title: 'Success',
        description: 'Blog deleted successfully',
      })
      
      fetchBlogs()
    } catch (error) {
      console.error('Error deleting blog:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete blog',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  const [trekData, setTrekData] = useState<TrekItem[]>([])
  const [loadingTreks, setLoadingTreks] = useState(false)

  const [editingTrekData, setEditingTrekData] = useState<TrekItem | null>(null)

  const [blogData, setBlogData] = useState<BlogItem[]>([])
  const [loadingBlogs, setLoadingBlogs] = useState(false)
  const [editingBlogData, setEditingBlogData] = useState<BlogItem | null>(null)

  const [reviewsData, setReviewsData] = useState<any[]>([])
  const [loadingReviews, setLoadingReviews] = useState(false)

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

  const [editingFaq,  setEditingFaq]  = useState<number | null>(null)
  const [newFaq,  setNewFaq]  = useState<Partial<FaqItem>  | null>(null)

  const currentNav = navItems.find(n => n.id === activeSection)

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">

      {/* Sidebar - Desktop (left side) */}
      <Sidebar collapsible="icon" className="hidden lg:flex">
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

      {/* Top Bar - Mobile/Tablet (Logo) */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border lg:hidden">
        <div className="h-14 flex items-center px-4">
          <span className="text-lg font-bold tracking-wide logo-gradient">NMZ RAHUL</span>
        </div>
      </div>

      {/* Bottom Navigation - Mobile/Tablet */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border lg:hidden">
        <div className="flex items-center justify-around h-16 px-2 relative">
          {/* Main nav items */}
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon
            const active = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                  active 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                <span className={`text-xs ${active ? 'font-semibold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </button>
            )
          })}
          
          {/* More Menu Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMoreMenu(!showMoreMenu)
            }}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
              showMoreMenu || navItems.slice(4).some(item => activeSection === item.id)
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <MoreHorizontal size={20} strokeWidth={showMoreMenu || navItems.slice(4).some(item => activeSection === item.id) ? 2.5 : 2} />
            <span className={`text-xs ${showMoreMenu || navItems.slice(4).some(item => activeSection === item.id) ? 'font-semibold' : 'font-medium'}`}>
              More
            </span>
          </button>

          {/* More Menu Popup */}
          <AnimatePresence>
            {showMoreMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full right-2 mb-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden min-w-[160px]"
                onClick={(e) => e.stopPropagation()}
              >
                {navItems.slice(4).map((item) => {
                  const Icon = item.icon
                  const active = activeSection === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id)
                        setShowMoreMenu(false)
                      }}
                      className={`flex items-center gap-3 px-4 py-3 w-full transition-colors ${
                        active
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                      <span className={`text-sm ${active ? 'font-semibold' : 'font-medium'}`}>
                        {item.label}
                      </span>
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Spacers for mobile */}
      <div className="h-14 lg:hidden" />

      {/* Main Area */}
      <SidebarInset className="flex-1">
        <header className="flex h-14 items-center gap-3 border-b border-border px-6 bg-background/80 backdrop-blur sticky top-0 z-10 lg:mt-0 mt-14">
          <SidebarTrigger className="lg:block hidden" />
          <Separator orientation="vertical" className="h-5 lg:block hidden" />
          <p className="text-sm text-muted-foreground">
            Admin / <span className="text-foreground font-medium">{currentNav?.label}</span>
          </p>
        </header>

        <div className="p-6 max-w-4xl space-y-6 pb-24 lg:pb-6">

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
                
                {/* Hero Image Upload */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Hero Background Image</label>
                  <input
                    ref={heroImageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        handleImageUpload(
                          file,
                          'nmz-rahul/hero',
                          setUploadingHeroImage,
                          (url) => setHeroData({ ...heroData, image: url })
                        )
                      }
                    }}
                    className="hidden"
                  />
                  
                  {heroData.image ? (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                      <Image
                        src={heroData.image}
                        alt="Hero background"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => heroImageInputRef.current?.click()}
                          disabled={uploadingHeroImage}
                        >
                          {uploadingHeroImage ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setHeroData({ ...heroData, image: '' })}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full h-32 border-dashed"
                      onClick={() => heroImageInputRef.current?.click()}
                      disabled={uploadingHeroImage}
                    >
                      {uploadingHeroImage ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Upload size={24} />
                          <span>Click to upload hero image</span>
                        </div>
                      )}
                    </Button>
                  )}
                </div>
                
                <Button 
                  className="w-full gap-2"
                  onClick={saveHeroData}
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
                    {/* Profile Image Upload */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">Profile Image (for /about page)</label>
                      <input
                        ref={profileImageInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleImageUpload(
                              file,
                              'nmz-rahul/profile',
                              setUploadingProfileImage,
                              (url) => setAboutData({ ...aboutData, profileImage: url })
                            )
                          }
                        }}
                        className="hidden"
                      />
                      
                      {aboutData.profileImage ? (
                        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                          <Image
                            src={aboutData.profileImage}
                            alt="Profile"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2 flex gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => profileImageInputRef.current?.click()}
                              disabled={uploadingProfileImage}
                            >
                              {uploadingProfileImage ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => setAboutData({ ...aboutData, profileImage: '' })}
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full h-32 border-dashed"
                          onClick={() => profileImageInputRef.current?.click()}
                          disabled={uploadingProfileImage}
                        >
                          {uploadingProfileImage ? (
                            <Loader2 className="animate-spin" size={24} />
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <Upload size={24} />
                              <span>Click to upload profile image</span>
                            </div>
                          )}
                        </Button>
                      )}
                    </div>
                    
                    {/* Main Page Image Upload */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">Main Page Image (for homepage animated image)</label>
                      <input
                        ref={mainPageImageInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleImageUpload(
                              file,
                              'nmz-rahul/profile',
                              setUploadingMainPageImage,
                              (url) => setAboutData({ ...aboutData, mainPageImage: url })
                            )
                          }
                        }}
                        className="hidden"
                      />
                      
                      {aboutData.mainPageImage ? (
                        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                          <Image
                            src={aboutData.mainPageImage}
                            alt="Main page"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2 flex gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => mainPageImageInputRef.current?.click()}
                              disabled={uploadingMainPageImage}
                            >
                              {uploadingMainPageImage ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => setAboutData({ ...aboutData, mainPageImage: '' })}
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full h-32 border-dashed"
                          onClick={() => mainPageImageInputRef.current?.click()}
                          disabled={uploadingMainPageImage}
                        >
                          {uploadingMainPageImage ? (
                            <Loader2 className="animate-spin" size={24} />
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <Upload size={24} />
                              <span>Click to upload main page image</span>
                            </div>
                          )}
                        </Button>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">This image appears in the animated circle on the homepage</p>
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

          {/* Blog */}
          {activeSection === 'blog' && (
            <div className="space-y-4">
              {editingBlogData === null ? (
                <>
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Blog Management</h2>
                    <Button onClick={() => setEditingBlogData({
                      id: '',
                      title: '',
                      subtext: '',
                      category: '',
                      content: '',
                      coverImage: '',
                      featured: false,
                      published: false,
                    })}>
                      + Add New Blog
                    </Button>
                  </div>

                  {loadingBlogs ? (
                    <Card className="p-12 text-center">
                      <Loader2 className="animate-spin mx-auto mb-4" size={32} />
                      <p className="text-muted-foreground">Loading blogs...</p>
                    </Card>
                  ) : blogData.length === 0 ? (
                    <Card className="p-12 text-center">
                      <TrendingUp size={48} className="mx-auto text-muted-foreground mb-4" />
                      <p className="text-lg font-semibold mb-2">No blogs yet</p>
                      <p className="text-muted-foreground mb-4">Create your first blog post to get started</p>
                      <Button onClick={() => setEditingBlogData({
                        id: '',
                        title: '',
                        subtext: '',
                        category: '',
                        content: '',
                        coverImage: '',
                        featured: false,
                        published: false,
                      })}>
                        + Add New Blog
                      </Button>
                    </Card>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {blogData.map((blog) => (
                        <Card key={blog.id} className="p-4 flex flex-col gap-3">
                          {blog.coverImage && (
                            <div className="relative w-full h-40 rounded-lg overflow-hidden">
                              <Image
                                src={blog.coverImage}
                                alt={blog.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex-1">
                                <p className="font-semibold text-lg line-clamp-2">{blog.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">{blog.category}</p>
                              </div>
                              <div className="flex gap-1 flex-wrap">
                                {blog.featured && (
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    ⭐ Featured
                                  </span>
                                )}
                                {blog.published ? (
                                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                    Published
                                  </span>
                                ) : (
                                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                    Draft
                                  </span>
                                )}
                              </div>
                            </div>
                            {blog.subtext && (
                              <p className="text-sm text-muted-foreground line-clamp-2">{blog.subtext}</p>
                            )}
                          </div>
                          <div className="flex gap-2 pt-2 border-t">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => setEditingBlogData(blog)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="flex-1"
                              onClick={() => deleteBlog(blog.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <BlogEditor
                  blog={editingBlogData}
                  onSave={saveBlog}
                  onCancel={() => setEditingBlogData(null)}
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

          {/* Reviews */}
          {activeSection === 'reviews' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Reviews Management</h2>
                {loadingReviews && <Loader2 className="animate-spin" size={20} />}
              </div>

              {loadingReviews ? (
                <Card className="p-12 text-center">
                  <Loader2 className="animate-spin mx-auto mb-4" size={32} />
                  <p className="text-muted-foreground">Loading reviews...</p>
                </Card>
              ) : reviewsData.length === 0 ? (
                <Card className="p-12 text-center">
                  <Star size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No reviews yet</p>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {reviewsData.map((review) => (
                    <Card key={review._id?.toString()} className="p-4 md:p-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <p className="font-semibold text-base md:text-lg">{review.fullName}</p>
                            {!review.approved && (
                              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                Pending
                              </span>
                            )}
                            {review.approved && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Approved
                              </span>
                            )}
                            {review.featured && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                ⭐ Featured
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{review.address}</p>
                          <p className="text-sm font-medium text-primary mt-1">{review.trekName}</p>
                          <div className="flex gap-1 mt-2">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} size={14} className="fill-primary text-primary" />
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-sm text-foreground/80 line-clamp-3">&quot;{review.comment}&quot;</p>
                        
                        {review.images && review.images.length > 0 && (
                          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                            {review.images.slice(0, 4).map((img, i) => (
                              <div key={i} className="relative h-16 md:h-20 rounded overflow-hidden">
                                <Image
                                  src={img}
                                  alt={`Review image ${i + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2 pt-2 border-t">
                          {!review.approved && (
                            <Button
                              size="sm"
                              className="flex-1 min-w-[100px]"
                              onClick={async () => {
                                try {
                                  const response = await fetch('/api/admin/reviews', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ ...review, approved: true }),
                                  })
                                  
                                  if (!response.ok) throw new Error('Failed to approve')
                                  
                                  fetchReviews()
                                  toast({
                                    title: 'Success',
                                    description: 'Review approved',
                                  })
                                } catch (error) {
                                  toast({
                                    title: 'Error',
                                    description: 'Failed to approve review',
                                    variant: 'destructive',
                                  })
                                }
                              }}
                            >
                              Approve
                            </Button>
                          )}
                          {review.approved && (
                            <Button
                              size="sm"
                              variant={review.featured ? "default" : "outline"}
                              className="flex-1 min-w-[100px]"
                              onClick={async () => {
                                try {
                                  const response = await fetch('/api/admin/reviews', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ ...review, featured: !review.featured }),
                                  })
                                  
                                  if (!response.ok) throw new Error('Failed to toggle featured')
                                  
                                  fetchReviews()
                                  toast({
                                    title: 'Success',
                                    description: review.featured ? 'Removed from featured' : 'Added to featured',
                                  })
                                } catch (error) {
                                  toast({
                                    title: 'Error',
                                    description: 'Failed to toggle featured',
                                    variant: 'destructive',
                                  })
                                }
                              }}
                            >
                              {review.featured ? '⭐ Featured' : 'Feature'}
                            </Button>
                          )}
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex-1 min-w-[100px]"
                            onClick={async () => {
                              if (!confirm('Delete this review?')) return
                              
                              try {
                                const response = await fetch(`/api/admin/reviews?id=${review._id}`, {
                                  method: 'DELETE',
                                })
                                
                                if (!response.ok) throw new Error('Failed to delete')
                                
                                fetchReviews()
                                toast({
                                  title: 'Success',
                                  description: 'Review deleted',
                                })
                              } catch (error) {
                                toast({
                                  title: 'Error',
                                  description: 'Failed to delete review',
                                  variant: 'destructive',
                                })
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                        
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </SidebarInset>
    </div>
  )
}
