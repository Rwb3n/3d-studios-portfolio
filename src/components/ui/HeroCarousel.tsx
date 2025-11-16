'use client'

// Infinite Horizontal Scroll - Featured Work Showcase
// Continuously scrolls featured project images horizontally (marquee/ticker style)
// Pauses on hover, clickable images, responsive design

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { ProjectWithCategory } from '@/types'

interface HeroCarouselProps {
  projects: ProjectWithCategory[]
}

export default function HeroCarousel({ projects }: HeroCarouselProps) {
  if (projects.length === 0) {
    return null
  }

  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollPositionRef = useRef(0)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const animate = () => {
      if (!isPaused && container.firstElementChild) {
        // Move 0.5 pixels per frame (smooth continuous scroll, ~13s cycle)
        scrollPositionRef.current += 0.5

        // Get the width of the first list (half of total since we duplicate)
        const firstChild = container.firstElementChild as HTMLElement
        const scrollWidth = firstChild.scrollWidth

        // Reset position when we've scrolled past one full list width
        if (scrollPositionRef.current >= scrollWidth) {
          scrollPositionRef.current = 0
        }

        // Apply transform
        container.style.transform = `translateX(-${scrollPositionRef.current}px)`
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPaused])

  // Render project list component
  const ProjectList = () => (
    <>
      {projects.map((project, index) => (
        <Link
          key={`${project.id}-${index}`}
          href={`/work/${project.categorySlug}/${project.slug}`}
          className="relative flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[55vw] xl:w-[50vw] h-full group"
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
      ))}
    </>
  )

  return (
    <div className="relative w-full bg-gray-900 overflow-hidden">
      {/* Infinite Scroll Container */}
      <div className="relative w-full aspect-[16/9] md:aspect-[24/9] lg:aspect-[30/9]">
        {/* Scrolling Images - Two identical lists for seamless loop */}
        <div
          ref={containerRef}
          className="absolute inset-0 flex will-change-transform"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ transition: 'none' }}
        >
          {/* First list */}
          <div className="flex flex-shrink-0">
            <ProjectList />
          </div>
          {/* Duplicate list for seamless loop (hidden from screen readers) */}
          <div className="flex flex-shrink-0" aria-hidden="true">
            <ProjectList />
          </div>
        </div>
      </div>
    </div>
  )
}
