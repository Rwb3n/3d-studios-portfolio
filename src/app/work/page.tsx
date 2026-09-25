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
        {categories.map((category, index) => {
          // Odd count: first tile spans both columns so the grid has no orphan
          const isWide = index === 0 && categories.length % 2 === 1
          return (
            <Link
              key={category.id}
              href={`/work/${category.slug}`}
              className={`group reveal relative overflow-hidden ${isWide ? 'md:col-span-2' : ''}`}
            >
              {/* Category Image (4:3, or wide banner for the spanning tile) with overlay text */}
              <div className={`relative w-full aspect-[4/3] bg-gray-300 overflow-hidden ${isWide ? 'md:aspect-[21/9]' : ''}`}>
                <Image
                  src={category.thumbnail}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes={isWide ? '(max-width: 1280px) 100vw, 1232px' : '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px'}
                  priority={index === 0}
                />

                {/* Bottom gradient keeps the label legible without dulling the whole image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Category label - bottom left, arrow slides in on hover */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-7 text-white">
                  <h2 className="text-xl md:text-2xl font-normal uppercase tracking-[0.15em] leading-tight">
                    {category.name}
                  </h2>
                  <span
                    aria-hidden="true"
                    className="text-xl md:text-2xl font-light opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0"
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
