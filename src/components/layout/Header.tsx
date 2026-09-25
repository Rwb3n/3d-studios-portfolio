// Header component with logo and navigation
// Based on SITE_ANALYSIS.md - Logo left, Nav right, WORK dropdown
// Mobile: Hamburger menu with slide-in drawer (UI_COMPONENTS.md §15)

'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import Logo from './Logo'
import type { Category } from '@/types'

interface HeaderProps {
  categories: Pick<Category, 'id' | 'name' | 'slug'>[]
}

export default function Header({ categories }: HeaderProps) {
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileWorkExpanded, setMobileWorkExpanded] = useState(false)
  const workDropdownRef = useRef<HTMLDivElement>(null)

  // Close WORK dropdown on outside click or Escape
  useEffect(() => {
    if (!workDropdownOpen) return

    const handleClick = (e: MouseEvent) => {
      if (!workDropdownRef.current?.contains(e.target as Node)) {
        setWorkDropdownOpen(false)
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setWorkDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [workDropdownOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setMobileWorkExpanded(false)
  }

  return (
    <header className="w-full bg-white border-b border-gray-300 relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-0">
        <div className="flex items-center justify-between">
          {/* Logo - Left aligned */}
          <div className="intro-logo">
            <Link href="/">
              <Logo width={240} height={166} />
            </Link>
          </div>

          {/* Hamburger Button - Mobile only (< 1024px) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 transition-colors rounded"
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Navigation - Hidden on mobile (< 1024px) */}
          <nav className="hidden lg:flex items-center gap-8 intro-nav">
            {/* WORK Dropdown */}
            <div className="relative" ref={workDropdownRef}>
              <button
                onClick={() => setWorkDropdownOpen(!workDropdownOpen)}
                aria-expanded={workDropdownOpen}
                aria-haspopup="true"
                className="text-black font-medium flex items-center gap-1 relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
              >
                WORK
                <span className={`text-xs transition-transform duration-300 ${workDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {/* Dropdown - display:none when closed (links not focusable or prefetched);
                  transition-discrete + starting: animate it in and out of display:none */}
              <div className={`absolute top-full left-0 mt-2 bg-white border border-gray-300 shadow-lg min-w-[200px] z-50
                               transition-[opacity,translate,display] duration-200 ease-out transition-discrete
                               starting:opacity-0 starting:-translate-y-1
                               ${workDropdownOpen ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 -translate-y-1'}`}>
                  <Link
                    href="/work"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors text-sm uppercase"
                    onClick={() => setWorkDropdownOpen(false)}
                  >
                    All Work
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/work/${cat.slug}`}
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors text-sm uppercase"
                      onClick={() => setWorkDropdownOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
            </div>

            <Link
              href="/about"
              className="text-black font-medium uppercase relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
            >
              About
            </Link>

            <a
              href="mailto:paul@3d-studios.co.uk"
              className="text-black font-medium uppercase relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu - Slide-in drawer from right. Always rendered; display:none
              when closed, animated in and out via transition-discrete + starting: */}
          <>
              {/* Backdrop */}
              <div
                className={`fixed inset-0 bg-black/50 z-40 lg:hidden
                            transition-[opacity,display] duration-300 transition-discrete starting:opacity-0
                            ${mobileMenuOpen ? 'block opacity-100' : 'hidden opacity-0'}`}
                onClick={closeMobileMenu}
                aria-hidden="true"
              />

              {/* Drawer */}
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                className={`fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white z-50 overflow-y-auto shadow-2xl lg:hidden
                            transition-[translate,display] duration-300 ease-out transition-discrete starting:translate-x-full
                            ${mobileMenuOpen ? 'block translate-x-0' : 'hidden translate-x-full'}`}
              >
                {/* Header with Close Button */}
                <div className="flex items-center justify-between p-4 border-b border-gray-300">
                  <span className="text-lg font-bold">MENU</span>
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    aria-label="Close menu"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="py-4">
                  {/* WORK Accordion */}
                  <div className="border-b border-gray-200">
                    <button
                      onClick={() => setMobileWorkExpanded(!mobileWorkExpanded)}
                      aria-expanded={mobileWorkExpanded}
                      className="w-full flex items-center justify-between px-6 py-4 text-left font-medium uppercase hover:bg-gray-50 transition-colors min-h-[44px]"
                    >
                      WORK
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${
                          mobileWorkExpanded ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* WORK Submenu - animated height via grid rows; inert while collapsed */}
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        mobileWorkExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                      inert={!mobileWorkExpanded}
                    >
                      <div className="overflow-hidden bg-gray-50">
                        <Link
                          href="/work"
                          className="block px-8 py-3 text-sm uppercase hover:bg-gray-100 transition-colors min-h-[44px] flex items-center"
                          onClick={closeMobileMenu}
                        >
                          All Work
                        </Link>
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/work/${cat.slug}`}
                            className="block px-8 py-3 text-sm uppercase hover:bg-gray-100 transition-colors min-h-[44px] flex items-center"
                            onClick={closeMobileMenu}
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ABOUT Link */}
                  <Link
                    href="/about"
                    className="block px-6 py-4 font-medium uppercase hover:bg-gray-50 transition-colors border-b border-gray-200 min-h-[44px] flex items-center"
                    onClick={closeMobileMenu}
                  >
                    ABOUT
                  </Link>

                  {/* CONTACT Link */}
                  <a
                    href="mailto:paul@3d-studios.co.uk"
                    className="block px-6 py-4 font-medium uppercase hover:bg-gray-50 transition-colors border-b border-gray-200 min-h-[44px] flex items-center"
                    onClick={closeMobileMenu}
                  >
                    CONTACT
                  </a>
                </nav>
              </div>
          </>
        </div>
      </div>
    </header>
  )
}
