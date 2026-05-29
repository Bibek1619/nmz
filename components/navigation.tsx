'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle, Home, User, Mountain, BookOpen, Image as ImageIcon, Star, HelpCircle, Phone, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: User },
    { href: '/treks', label: 'Treks', icon: Mountain },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/gallery', label: 'Gallery', icon: ImageIcon },
    { href: '/reviews', label: 'Reviews', icon: Star },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
    { href: '/contact', label: 'Contact', icon: Phone },
  ]

  // Main navigation items for bottom bar (mobile)
  const bottomNavLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: User },
    { href: '/treks', label: 'Treks', icon: Mountain },
    { href: '/reviews', label: 'Reviews', icon: Star },
  ]

  // More menu items
  const moreMenuLinks = [
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/gallery', label: 'Gallery', icon: ImageIcon },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
    { href: '/contact', label: 'Contact', icon: Phone },
  ]

  const whatsappNumber = '9779841234567'
  const whatsappMessage = 'Hello! I am interested in booking a trek with you.'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  const isActive = (href: string) => pathname === href
  const isMoreMenuActive = moreMenuLinks.some(link => isActive(link.href))

  // Close more menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowMoreMenu(false)
    if (showMoreMenu) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showMoreMenu])

  return (
    <>
      {/* Top Navigation - Desktop */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border lg:block hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0"
            >
              <Link href="/" className="text-xl font-bold tracking-wide">
                <span className="logo-gradient">
                  NMZ RAHUL
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1"
            >
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-muted ${
                    isActive(link.href) 
                      ? 'text-primary bg-muted' 
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/admin/dashboard"
                className="px-3 py-2 text-sm font-medium text-foreground/50 hover:text-primary/50 transition-colors rounded-md hover:bg-muted text-xs"
              >
                Admin
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Top Bar - Mobile (Logo + WhatsApp) */}
      <div className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border lg:hidden">
        <div className="h-14 flex items-center justify-between px-4">
          {/* Logo - Left */}
          <Link href="/" className="text-lg font-bold tracking-wide">
            <span className="logo-gradient">
              NMZ RAHUL
            </span>
          </Link>
          
          {/* WhatsApp Icon - Right */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 bg-[#25D366] hover:bg-[#20bb5a] text-white rounded-full transition-colors"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={20} />
          </a>
        </div>
      </div>

      {/* Bottom Navigation - Mobile/Tablet */}
      <nav className="fixed bottom-0 w-full z-50 bg-background/95 backdrop-blur-md border-t border-border lg:hidden">
        <div className="flex items-center justify-around h-16 px-2 relative">
          {bottomNavLinks.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                  active 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                <span className={`text-xs ${active ? 'font-semibold' : 'font-medium'}`}>
                  {link.label}
                </span>
              </Link>
            )
          })}
          
          {/* More Menu Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMoreMenu(!showMoreMenu)
            }}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
              isMoreMenuActive || showMoreMenu
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <MoreHorizontal size={22} strokeWidth={isMoreMenuActive || showMoreMenu ? 2.5 : 2} />
            <span className={`text-xs ${isMoreMenuActive || showMoreMenu ? 'font-semibold' : 'font-medium'}`}>
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
                {moreMenuLinks.map((link) => {
                  const Icon = link.icon
                  const active = isActive(link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setShowMoreMenu(false)}
                      className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                        active
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                      <span className={`text-sm ${active ? 'font-semibold' : 'font-medium'}`}>
                        {link.label}
                      </span>
                    </Link>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Spacer for bottom nav on mobile */}
      <div className="h-16 lg:hidden" />
    </>
  )
}
