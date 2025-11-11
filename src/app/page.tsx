// Homepage - Based on SITE_ANALYSIS.md
// Structure: Hero Carousel → Introduction → Email CTA

import { getFeaturedProjects } from '@/lib/data'
import HeroCarousel from '@/components/ui/HeroCarousel'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '3D Studios - Professional Modelmakers | Paul Baker',
  description: 'For over 40 years, 3D Studios has crafted award-winning models for global brands including Unilever, Cadbury, and Walls. Specializing in ice cream and chocolate that never melts.',
  keywords: 'modelmaking, food models, ice cream models, chocolate models, advertising models, product displays, Paul Baker, 3D Studios, professional modelmaker',
  openGraph: {
    title: '3D Studios - Professional Modelmakers',
    description: 'For over 40 years, 3D Studios has crafted award-winning models for global brands. Specializing in ice cream and chocolate that never melts.',
    url: 'https://3d-studios.co.uk',
    siteName: '3D Studios',
    images: [
      {
        url: 'https://3d-studios.co.uk/images/food-scenics/taj-mahal/thumbnail.jpg',
        width: 1200,
        height: 630,
        alt: '3D Studios - Professional Modelmaking Portfolio',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3D Studios - Professional Modelmakers',
    description: 'For over 40 years, 3D Studios has crafted award-winning models for global brands.',
    images: ['https://3d-studios.co.uk/images/food-scenics/taj-mahal/thumbnail.jpg'],
  },
}

export default function HomePage() {
  const featuredProjects = getFeaturedProjects(4) // Get 4 for carousel

  return (
    <div>
      {/* Hero Carousel - UI_COMPONENTS.md §3 */}
      <HeroCarousel projects={featuredProjects} autoScrollInterval={5000} />
    </div>
  )
}
