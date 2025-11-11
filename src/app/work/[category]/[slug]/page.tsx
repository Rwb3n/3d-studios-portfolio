// Project detail page - Based on UI_COMPONENTS.md §8-9
// Two variants: Image projects (§8) and Video projects (§9)

import Link from 'next/link'
import Image from 'next/image'
import VideoPlayer from '@/components/ui/VideoPlayer'
import {
  getCategories,
  getProjectsByCategory,
  getProject,
  getAdjacentProjects,
  getCategory,
} from '@/lib/data'
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
          width: 1200,
          height: 630,
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

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Project Header - different for image vs video */}
      {isVideo ? (
        // Video Project - per UI_COMPONENTS.md §9
        <>
          <h1 className="text-5xl font-bold text-center mb-12">{project.title}</h1>

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
          {/* Title */}
          <h1 className="text-5xl font-bold text-center mb-4">{project.title}</h1>

          {/* Subtitle/Client - H2 */}
          {project.client && (
            <h2 className="text-2xl text-center font-medium mb-3">
              {project.client}
            </h2>
          )}

          {/* Credits/Agency - Paragraph */}
          {project.agency && (
            <p className="text-center text-lg mb-12">
              Agency: {project.agency}
              {project.year && ` • ${project.year}`}
            </p>
          )}

          {/* Image Display - Using thumbnail since detail images don't exist */}
          <div className="mb-12">
            <div className="relative w-full aspect-[4/3] bg-gray-100">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>
          </div>
        </>
      )}

      {/* Previous/Next Navigation - per UI_COMPONENTS.md §8-9 */}
      <nav className="flex justify-between items-center border-t border-gray-300 pt-10 mt-16">
        {/* Previous Button */}
        {prev ? (
          <Link
            href={`/work/${categorySlug}/${prev.slug}`}
            className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-all duration-150 hover:scale-105 transform font-medium"
          >
            ← Previous
          </Link>
        ) : (
          <div className="px-8 py-3 bg-gray-300 text-gray-500 cursor-not-allowed font-medium">
            ← Previous
          </div>
        )}

        {/* Back to Category */}
        <Link
          href={`/work/${categorySlug}`}
          className="text-lg hover:underline uppercase tracking-wide"
        >
          Back to {categorySlug.replace(/-/g, ' ')}
        </Link>

        {/* Next Button */}
        {next ? (
          <Link
            href={`/work/${categorySlug}/${next.slug}`}
            className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-all duration-150 hover:scale-105 transform font-medium"
          >
            Next →
          </Link>
        ) : (
          <div className="px-8 py-3 bg-gray-300 text-gray-500 cursor-not-allowed font-medium">
            Next →
          </div>
        )}
      </nav>
    </div>
  )
}
