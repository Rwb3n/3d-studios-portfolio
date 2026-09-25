// Project detail page - Based on UI_COMPONENTS.md §8-9
// Two variants: Image projects (§8) and Video projects (§9)

import Link from 'next/link'
import VideoPlayer from '@/components/ui/VideoPlayer'
import JobTicket from '@/components/ui/JobTicket'
import ZoomableImage from '@/components/ui/ZoomableImage'
import {
  getCategories,
  getProjectsByCategory,
  getProject,
  getAdjacentProjects,
  getCategory,
} from '@/lib/data'
import { getImageSize } from '@/lib/images'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Generate static params for all 96 projects across 7 categories
export async function generateStaticParams() {
  const categories = getCategories()
  const params: { category: string; slug: string }[] = []

  for (const category of categories) {
    const projects = getProjectsByCategory(category.slug)
    for (const project of projects) {
      params.push({
        category: category.slug,
        slug: project.slug,
      })
    }
  }

  return params
}

// Generate metadata for each project page
export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { category: categorySlug, slug: projectSlug } = await params
  const project = getProject(categorySlug, projectSlug)
  const category = getCategory(categorySlug)

  if (!project) {
    return {
      title: 'Project Not Found - 3D Studios',
      description: 'The requested project could not be found.',
    }
  }

  // Build description from project metadata
  const descParts = [`${project.title} by 3D Studios`]
  if (project.client) descParts.push(`Client: ${project.client}`)
  if (project.agency) descParts.push(`Agency: ${project.agency}`)
  if (project.year) descParts.push(`Year: ${project.year}`)
  descParts.push('Professional modelmaking for advertising and product displays.')

  // Use project thumbnail for OG image (convert to absolute URL)
  const imageUrl = project.thumbnail.startsWith('http')
    ? project.thumbnail
    : `https://3d-studios.co.uk${project.thumbnail}`

  return {
    title: `${project.title} - ${category?.name || 'Portfolio'} - 3D Studios`,
    description: descParts.join('. '),
    keywords: `${project.title}, ${category?.name || 'modelmaking'}, 3D Studios, ${projectSlug}, commercial photography, advertising models`,
    openGraph: {
      title: `${project.title} - 3D Studios`,
      description: `${project.title} by 3D Studios. ${project.client ? `Client: ${project.client}. ` : ''}Professional modelmaking.`,
      url: `https://3d-studios.co.uk/work/${categorySlug}/${projectSlug}`,
      siteName: '3D Studios',
      images: [
        {
          url: imageUrl,
          alt: project.title,
        },
      ],
      locale: 'en_GB',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - 3D Studios`,
      description: `${project.title} by 3D Studios${project.client ? ` for ${project.client}` : ''}.`,
      images: [imageUrl],
    },
  }
}

interface ProjectPageProps {
  params: Promise<{
    category: string
    slug: string
  }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // Next.js 16: params is Promise, must await
  const { category: categorySlug, slug: projectSlug } = await params

  // Get project data
  const project = getProject(categorySlug, projectSlug)
  if (!project) {
    notFound()
  }

  // Get previous/next projects for navigation
  const { prev, next } = getAdjacentProjects(categorySlug, projectSlug)

  // Determine if this is an image or video project
  const isVideo = project.type === 'video'
  const imageSize = getImageSize(project.thumbnail) ?? { width: 4, height: 3 }

  // Job ticket: position within the category, like a workshop docket number
  const categoryProjects = getProjectsByCategory(categorySlug)
  const ticket = (
    <JobTicket
      jobNumber={categoryProjects.findIndex((p) => p.slug === projectSlug) + 1}
      jobCount={categoryProjects.length}
      department={getCategory(categorySlug)?.name ?? categorySlug}
      client={project.client}
      agency={project.agency}
      year={project.year}
    />
  )

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Project Header - different for image vs video */}
      {isVideo ? (
        // Video Project - per UI_COMPONENTS.md §9
        <>
          <h1 className="text-center text-balance mb-8">{project.title}</h1>
          {ticket}

          {/* Video Player */}
          <div className="mb-12">
            {project.video && (
              <VideoPlayer
                src={project.video.url}
                poster={project.video.poster || project.thumbnail}
                title={project.title}
              />
            )}
          </div>
        </>
      ) : (
        // Image Project - per UI_COMPONENTS.md §8
        <>
          <h1 className="text-center text-balance mb-8">{project.title}</h1>
          {ticket}

          {/* Image - real aspect ratio, capped at 75vh; opens a full-screen zoom view */}
          <div className="mb-12">
            <ZoomableImage
              src={project.thumbnail}
              alt={project.title}
              width={imageSize.width}
              height={imageSize.height}
            />
          </div>
        </>
      )}

      {/* Previous/Next Navigation - per UI_COMPONENTS.md §8-9
          Mobile: back link on its own row above equal-width Prev/Next buttons */}
      <nav className="grid grid-cols-2 md:flex md:justify-between md:items-center gap-4 border-t border-gray-300 pt-10 mt-16">
        {/* Back to Category */}
        <Link
          href={`/work/${categorySlug}`}
          className="col-span-2 md:order-2 text-center text-base md:text-lg hover:underline uppercase tracking-wide"
        >
          Back to {categorySlug.replace(/-/g, ' ')}
        </Link>

        {/* Previous Button */}
        {prev ? (
          <Link
            href={`/work/${categorySlug}/${prev.slug}`}
            className="md:order-1 text-center px-4 md:px-8 py-3 bg-black text-white hover:bg-gray-800 transition-all duration-150 hover:scale-105 transform font-medium"
          >
            ← Previous
          </Link>
        ) : (
          <div className="md:order-1 text-center px-4 md:px-8 py-3 bg-gray-300 text-gray-500 cursor-not-allowed font-medium" aria-disabled="true">
            ← Previous
          </div>
        )}

        {/* Next Button */}
        {next ? (
          <Link
            href={`/work/${categorySlug}/${next.slug}`}
            className="md:order-3 text-center px-4 md:px-8 py-3 bg-black text-white hover:bg-gray-800 transition-all duration-150 hover:scale-105 transform font-medium"
          >
            Next →
          </Link>
        ) : (
          <div className="md:order-3 text-center px-4 md:px-8 py-3 bg-gray-300 text-gray-500 cursor-not-allowed font-medium" aria-disabled="true">
            Next →
          </div>
        )}
      </nav>
    </div>
  )
}
