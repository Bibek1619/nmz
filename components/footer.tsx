'use client'

import { Facebook, Instagram, MessageCircle, Music } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com',
      color: 'hover:text-blue-500'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com',
      color: 'hover:text-pink-500'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/9779841234567',
      color: 'hover:text-green-500'
    },
    {
      name: 'TikTok',
      icon: Music,
      url: 'https://tiktok.com',
      color: 'hover:text-purple-500'
    }
  ]

  return (
    <footer className="bg-foreground text-primary-foreground py-12 px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold mb-4 text-lg">NMZ RAHUL</h3>
            <p className="opacity-70 text-sm">
              Your gateway to unforgettable mountain experiences in Nepal.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>
                <a href="/" className="hover:opacity-100 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/treks" className="hover:opacity-100 transition">
                  Treks
                </a>
              </li>
              <li>
                <a href="/about" className="hover:opacity-100 transition">
                  About
                </a>
              </li>
              <li>
                <a href="/reviews" className="hover:opacity-100 transition">
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>+977-984-1234567</li>
              <li>rahul@nmztrek.com</li>
              <li>Kathmandu, Nepal</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`opacity-70 hover:opacity-100 transition ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon size={24} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-60">
          <p>&copy; {currentYear} NMZ RAHUL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
