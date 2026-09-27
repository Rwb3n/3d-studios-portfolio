// Infinite Horizontal Scroll - Featured Work Showcase
// Continuously scrolls featured project images horizontally (marquee/ticker style)
// Pure CSS animation: pauses on hover, stops under prefers-reduced-motion
// Homepage intro: reveals from bottom on first visit (see intro script in layout.tsx)

import Image from 'next/image'
import Link from 'next/link'
import type { ProjectWithCategory } from '@/types'

interface HeroCarouselProps {
  projects: ProjectWithCategory[]
}

const SLIDE_SIZES =
  '(max-width: 640px) 85vw, (max-width: 768px) 70vw, (max-width: 1024px) 60vw, (max-width: 1280px) 55vw, 50vw'

function ProjectList({
  projects,
  duplicate = false,
}: {
  projects: ProjectWithCategory[]
  duplicate?: boolean
}) {
  return (
    <div className="flex flex-shrink-0" aria-hidden={duplicate || undefined}>
      {projects.map((project, index) => (
        <Link
          key={project.id}
          href={`/work/${project.categorySlug}/${project.slug}`}
          tabIndex={duplicate ? -1 : undefined}
          className="relative flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[55vw] xl:w-[50vw] h-full group"
        >
          <Image
            src={project.thumbnail}
            alt={duplicate ? '' : project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={!duplicate && index < 2}
            sizes={SLIDE_SIZES}
          />
          {/* Subtle hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </Link>
      ))}
    </div>
  )
}

export default function HeroCarousel({ projects }: HeroCarouselProps) {
  if (projects.length === 0) {
    return null
  }

  return (
    <div className="intro-carousel relative w-full bg-gray-900 overflow-hidden">
      <div className="relative w-full aspect-[16/9] md:aspect-[24/9] lg:aspect-[30/9]">
        {/* Two identical lists; the track moves by exactly one list width (-50%) per cycle */}
        <div
          className="marquee-track absolute inset-y-0 left-0 flex w-max"
          style={{ animationDuration: `${projects.length * 20}s` }}
        >
          <ProjectList projects={projects} />
          <ProjectList projects={projects} duplicate />
        </div>
      </div>
    </div>
  )
}
