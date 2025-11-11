'use client'

// Hero Carousel - Based on UI_COMPONENTS.md §3
// Features: Auto-scroll, manual navigation, smooth transitions, 4 featured images

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { ProjectWithCategory } from '@/types'

interface HeroCarouselProps {
  projects: ProjectWithCategory[]
  autoScrollInterval?: number // milliseconds
}

export default function HeroCarousel({
  projects,
  autoScrollInterval = 5000,
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(1) // Start at 1 (first real slide)
  const [isTransitioning, setIsTransitioning] = useState(true)

  // Create extended array with duplicates for seamless loop
  // [last, ...projects, first]
  const extendedProjects =
    projects.length > 1
      ? [projects[projects.length - 1], ...projects, projects[0]]
      : projects

  // Auto-scroll effect with seamless loop
  useEffect(() => {
    if (projects.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1)
    }, autoScrollInterval)

    return () => clearInterval(interval)
  }, [projects.length, autoScrollInterval])

  // Handle seamless loop transitions
  useEffect(() => {
    if (projects.length <= 1) return

    // If we're at the cloned last slide (index 0), snap to real last slide
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(projects.length)
      }, 700) // After transition completes
    }
    // If we're at the cloned first slide, snap to real first slide
    else if (currentIndex === projects.length + 1) {
      setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(1)
      }, 700) // After transition completes
    } else {
      setIsTransitioning(true)
    }
  }, [currentIndex, projects.length])

  const goToSlide = (index: number) => {
    setIsTransitioning(true)
    setCurrentIndex(index + 1) // +1 to account for cloned slide at start
  }

  const goToPrevious = () => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev - 1)
  }

  const goToNext = () => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
  }

  if (projects.length === 0) {
    return null
  }

  // Use extendedProjects directly - it already has the right structure
  const currentProject = extendedProjects[currentIndex]

  // Safety check - should never happen but prevents crashes
  if (!currentProject) {
    return null
  }

  return (
    <div className="relative w-full bg-gray-900 overflow-hidden">
      {/* Main Carousel */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9]">
        {/* Images - Horizontal sliding carousel with seamless loop */}
        <div className="relative w-full h-full overflow-hidden">
          <div
            className="flex h-full"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: isTransitioning ? 'transform 700ms ease-in-out' : 'none',
            }}
          >
            {extendedProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="min-w-full h-full flex-shrink-0 relative"
              >
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority={index <= 2}
                  loading={index <= 2 ? undefined : 'lazy'}
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Overlay (bottom) */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent z-20" />

        {/* Project Title Overlay */}
        <div className="absolute inset-x-0 bottom-0 z-30 p-6 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <Link
              href={`/work/${currentProject.categorySlug}/${currentProject.slug}`}
              className="inline-block group"
            >
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-2 group-hover:underline">
                {currentProject.title}
              </h2>
              {currentProject.client && (
                <p className="text-white/90 text-lg md:text-xl">
                  {currentProject.client}
                </p>
              )}
            </Link>
          </div>
        </div>

        {/* Navigation Buttons */}
        {projects.length > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-3 md:p-4 transition-all duration-150 hover:scale-110 transform"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-3 md:p-4 transition-all duration-150 hover:scale-110 transform"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {projects.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
