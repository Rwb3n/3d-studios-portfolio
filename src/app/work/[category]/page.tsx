// Category list page - Based on UI_COMPONENTS.md §6-7
// Layout: 3-col grid + bottom navigation filter

import Link from 'next/link'
import Image from 'next/image'
import { getCategories, getProjectsByCategory, getCategory, getCategoryProjectCount } from '@/lib/data'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Generate static params for all 7 categories
export async function generateStaticParams() {
  const categories = getCategories()
  return categories.map((cat) => ({
    category: cat.slug,
  }))
}

// Generate metadata for each category page
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: categorySlug } = await params
  const category = getCategory(categorySlug)

  if (!category) {
    return {
      title: 'Category Not Found - 3D Studios',
      description: 'The requested category could not be found.',
    }
  }

  const projectCount = getCategoryProjectCount(categorySlug)
  const imageUrl = category.thumbnail.startsWith('http')
    ? category.thumbnail
    : `https://3d-studios.co.uk${category.thumbnail}`

  return {
    title: `${category.name} - 3D Studios Portfolio`,
    description: `Browse ${projectCount} ${category.name.toLowerCase()} projects by 3D Studios. ${category.description || 'Award-winning professional modelmaking for over 40 years.'}`,
    keywords: `${category.name}, modelmaking, 3D Studios, ${categorySlug}, professional models, commercial photography`,
    openGraph: {
      title: `${category.name} - 3D Studios`,
      description: `Browse ${projectCount} ${category.name.toLowerCase()} projects. Professional modelmaking for advertising and product displays.`,
      url: `https://3d-studios.co.uk/work/${categorySlug}`,
      siteName: '3D Studios',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${category.name} Portfolio - 3D Studios`,
        },
      ],
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} - 3D Studios`,
      description: `Browse ${projectCount} ${category.name.toLowerCase()} projects by 3D Studios.`,
      images: [imageUrl],
    },
  }
}

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Next.js 16: params is Promise, must await
  const { category: categorySlug } = await params

  // Get category and projects
  const category = getCategory(categorySlug)
  if (!category) {
    notFound()
  }

  const projects = getProjectsByCategory(categorySlug)
  const allCategories = getCategories()

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Category Title */}
      <h1 className="text-5xl font-bold text-center mb-16 uppercase tracking-wide">{category.name}</h1>

      {/* Portfolio Grid - per UI_COMPONENTS.md §6 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/work/${categorySlug}/${project.slug}`}
            className="group"
          >
            {/* Project Image (4:3 aspect ratio) */}
            <div className="relative w-full aspect-[4/3] bg-gray-200 overflow-hidden mb-3">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />
            </div>

            {/* Project Title - Below image, centered, H3 */}
            <h3 className="text-center text-lg font-medium group-hover:text-gray-600 transition-colors">
              {project.title}
            </h3>
          </Link>
        ))}
      </div>

      {/* Bottom Navigation Filter - per UI_COMPONENTS.md §7 */}
      <nav className="border-t border-gray-300 pt-8">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {/* ALL WORK link */}
          <Link
            href="/work"
            className="text-sm uppercase text-black hover:underline"
          >
            All Work
          </Link>

          {/* Category links */}
          {allCategories.map((cat) => {
            const isActive = cat.slug === categorySlug
            return (
              <Link
                key={cat.id}
                href={`/work/${cat.slug}`}
                className={`text-sm uppercase hover:underline ${
                  isActive
                    ? 'font-bold text-black'
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                {cat.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
