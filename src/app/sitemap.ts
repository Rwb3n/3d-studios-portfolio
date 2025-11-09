// Sitemap generation for 3D Studios portfolio
// Generates XML sitemap for all 109 routes

import { MetadataRoute } from 'next'
import { getCategories, getProjectsByCategory } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://3d-studios.co.uk'

  // Static pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bio`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // Category pages (7 categories)
  const categories = getCategories()
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/work/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Project pages (96 projects across all categories)
  const projectRoutes: MetadataRoute.Sitemap = []
  categories.forEach((cat) => {
    const projects = getProjectsByCategory(cat.slug)
    projects.forEach((project) => {
      projectRoutes.push({
        url: `${baseUrl}/work/${cat.slug}/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    })
  })

  return [...routes, ...categoryRoutes, ...projectRoutes]
}
