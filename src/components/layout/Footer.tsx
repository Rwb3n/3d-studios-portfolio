// Footer component with contact info and copyright
// Based on UI_COMPONENTS.md - Centered layout, email CTA prominent

'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [hasAnimated, setHasAnimated] = useState(true) // Default to no animation
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  // Check if intro animation should play (homepage only, once per session)
  useEffect(() => {
    if (isHomepage && typeof window !== 'undefined') {
      const animated = sessionStorage.getItem('homepage-animated')
      if (!animated) {
        setHasAnimated(false) // Will animate
      }
    }
  }, [isHomepage])

  return (
    <footer className={`w-full bg-white border-t border-gray-300 mt-auto ${isHomepage && !hasAnimated ? 'animate-footer-in' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        {/* Email CTA - Large and prominent */}
        <div className="mb-8">
          <a
            href="mailto:paul@3d-studios.co.uk"
            className="text-2xl md:text-3xl font-medium text-black hover:text-gray-600 inline-flex items-center gap-2"
          >
            <span>✉</span>
            paul@3d-studios.co.uk
          </a>
        </div>

        {/* Logo - Centered */}
        <div className="flex justify-center mb-8">
          <Logo width={150} height={100} />
        </div>

        {/* Social Links */}
        <div className="space-y-2 mb-6">
          <div>
            <a
              href="https://www.instagram.com/paulbaker3d/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600"
            >
              Instagram
            </a>
          </div>
          <div>
            <a
              href="https://uk.linkedin.com/in/paul-baker-3b4b1716"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-1 mb-8 text-sm text-gray-700">
          <p>
            <a href="tel:07710809692" className="hover:text-gray-900">
              Tel. 07710 809 692
            </a>
          </p>
          <p>2 Bedlam Mews, London SE11 6DF</p>
        </div>

        {/* Credits */}
        <div className="text-sm text-gray-600">
          <p>&copy; {currentYear} Site built by Ruben Pires</p>
        </div>
      </div>
    </footer>
  )
}
