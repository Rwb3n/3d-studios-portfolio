'use client'

// Infinite Horizontal Scroll - Featured Work Showcase
// Using Embla Carousel for truly seamless infinite loop
// Pauses on hover, clickable images, responsive design
// Library: https://www.embla-carousel.com/

import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'
import type { ProjectWithCategory } from '@/types'

interface HeroCarouselProps {
  projects: ProjectWithCategory[]
}

export default function HeroCarousel({ projects }: HeroCarouselProps) {
  if (projects.length === 0) {
    return null
  }

  // Autoplay plugin for continuous scrolling
  const autoplay = useRef(
    Autoplay({
      delay: 3000, // Time per slide (adjust for speed - 3s per slide)
      stopOnInteraction: false, // Continue after user interaction
      stopOnMouseEnter: true, // Pause on hover
      playOnInit: true, // Start immediately
    })
  )

  // Initialize Embla with infinite loop configuration
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true, // Seamless infinite loop
      align: 'start',
      containScroll: false,
      skipSnaps: false,
      dragFree: false,
    },
    [autoplay.current]
  )

  return (
    <div className="relative w-full bg-gray-900 overflow-hidden">
      {/* Embla Viewport */}
      <div className="relative w-full aspect-[16/9] md:aspect-[24/9] lg:aspect-[30/9]">
        <div ref={emblaRef} className="overflow-hidden h-full">
          <div className="flex h-full">
            {/* Render each project as a slide */}
            {projects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="flex-shrink-0 relative w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[55vw] xl:w-[50vw] h-full"
              >
                <Link
                  href={`/work/${project.categorySlug}/${project.slug}`}
                  className="relative block w-full h-full group"
                >
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={index < 4}
                    loading={index < 4 ? undefined : 'lazy'}
                    sizes="(max-width: 640px) 85vw, (max-width: 768px) 70vw, (max-width: 1024px) 60vw, (max-width: 1280px) 55vw, 50vw"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
