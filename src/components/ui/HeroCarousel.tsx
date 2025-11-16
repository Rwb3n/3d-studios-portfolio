'use client'

// Infinite Horizontal Scroll - Featured Work Showcase
// Continuously scrolls featured project images horizontally (marquee/ticker style)
// Pauses on hover, clickable images, responsive design

import Image from 'next/image'
import Link from 'next/link'
import type { ProjectWithCategory } from '@/types'

interface HeroCarouselProps {
  projects: ProjectWithCategory[]
}

export default function HeroCarousel({ projects }: HeroCarouselProps) {
  if (projects.length === 0) {
    return null
  }

  // Duplicate projects array for seamless infinite loop
  // We'll render the array 3 times to ensure smooth continuous scroll
  const duplicatedProjects = [...projects, ...projects, ...projects]

  return (
    <div className="relative w-full bg-gray-900 overflow-hidden">
      {/* Infinite Scroll Container */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9]">
        {/* Scrolling Images */}
        <div className="absolute inset-0 flex animate-infinite-scroll hover:pause-animation">
          {duplicatedProjects.map((project, index) => (
            <Link
              key={`${project.id}-${index}`}
              href={`/work/${project.categorySlug}/${project.slug}`}
              className="relative flex-shrink-0 w-[90vw] sm:w-[60vw] md:w-[45vw] lg:w-[33vw] xl:w-[28vw] h-full group"
            >
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority={index < 6}
                loading={index < 6 ? undefined : 'lazy'}
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 60vw, (max-width: 1024px) 45vw, (max-width: 1280px) 33vw, 28vw"
              />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
