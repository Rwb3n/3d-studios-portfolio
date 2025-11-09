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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/work/${category.slug}`}
            className="group relative overflow-hidden"
          >
            {/* Category Image (4:3 aspect ratio) */}
            <div className="relative w-full aspect-[4/3] bg-gray-300 overflow-hidden">
              <Image
                src={category.thumbnail}
                alt={category.name}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />

              {/* Overlay with category name - appears on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                <h2 className="text-white text-2xl font-medium uppercase">
                  {category.name}
                </h2>
              </div>
            </div>

            {/* Category name below (always visible) */}
            <div className="mt-4 text-center">
              <h3 className="text-xl font-medium uppercase tracking-wide group-hover:text-gray-600 transition-colors">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
