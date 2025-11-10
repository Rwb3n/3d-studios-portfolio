// Work overview page - Based on UI_COMPONENTS.md §5 (Category Grid)
// Layout: 2-3 col grid, image cards with overlay, hover effects

import Link from 'next/link'
import Image from 'next/image'
import { getCategories } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Work - 3D Studios Portfolio',
  description: 'Browse 96 professional modelmaking projects across 7 categories. Featuring ice cream models, food scenics, window displays, and art projects created for leading global brands.',
  keywords: 'portfolio, modelmaking projects, food models, ice cream, chocolate, window displays, food scenics, still life, art projects, commercial photography',
  openGraph: {
    title: 'Our Work - 3D Studios Portfolio',
    description: 'Browse 96 professional modelmaking projects across 7 categories. Award-winning models for leading global brands.',
    url: 'https://3d-studios.co.uk/work',
    siteName: '3D Studios',
    images: [
      {
        url: 'https://3d-studios.co.uk/images/model-food/alpro/thumbnail.jpg',
        width: 1200,
        height: 630,
        alt: '3D Studios Portfolio - Modelmaking Projects',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Work - 3D Studios Portfolio',
    description: 'Browse 96 professional modelmaking projects across 7 categories.',
    images: ['https://3d-studios.co.uk/images/model-food/alpro/thumbnail.jpg'],
  },
}

export default function WorkPage() {
  const categories = getCategories() // Already sorted by order

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Category Grid - per UI_COMPONENTS.md §5 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/work/${category.slug}`}
            className="group relative overflow-hidden"
          >
            {/* Category Image (4:3 aspect ratio) with overlay text */}
            <div className="relative w-full aspect-[4/3] bg-gray-300 overflow-hidden">
              <Image
                src={category.thumbnail}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />

              {/* Semi-transparent overlay (always visible, darkens on hover) */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 z-10" />

              {/* Category name overlay with white pill background */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <h2 className="text-black text-2xl md:text-3xl font-bold text-center px-8 py-4 bg-white/90 rounded-lg shadow-lg uppercase tracking-wide">
                  {category.name}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
