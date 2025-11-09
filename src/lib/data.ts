// Data fetching utilities for 3D Studios portfolio

import type { Category, Project, ProjectWithCategory } from '@/types'
import categoriesData from '@/data/categories.json'

// Import all project data files
import artProjectsData from '@/data/projects/art-projects.json'
import foodScenesData from '@/data/projects/food-scenics.json'
import modelFoodData from '@/data/projects/model-food.json'
import movingImageData from '@/data/projects/moving-image.json'
import realFoodData from '@/data/projects/real-food.json'
import stillLifeData from '@/data/projects/still-life.json'
import windowDisplaysData from '@/data/projects/window-displays.json'

// Type assertion for JSON imports
const categories = (categoriesData as { categories: Category[] }).categories

// Map of category slugs to their project data
const projectsByCategory: Record<string, Project[]> = {
  'art-projects': (artProjectsData as { projects: Project[] }).projects,
  'food-scenics': (foodScenesData as { projects: Project[] }).projects,
  'model-food': (modelFoodData as { projects: Project[] }).projects,
  'moving-image': (movingImageData as { projects: Project[] }).projects,
  'real-food': (realFoodData as { projects: Project[] }).projects,
  'still-life': (stillLifeData as { projects: Project[] }).projects,
  'window-displays': (windowDisplaysData as { projects: Project[] }).projects,
}

/**
 * Get all categories, optionally sorted by order
 */
export function getCategories(sortByOrder = true): Category[] {
  if (sortByOrder) {
    return [...categories].sort((a, b) => a.order - b.order)
  }
  return categories
}

/**
 * Get a single category by slug
 */
export function getCategory(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug)
}

/**
 * Get all projects for a category
 */
export function getProjectsByCategory(categorySlug: string, sortByOrder = true): Project[] {
  const projects = projectsByCategory[categorySlug] || []

  if (sortByOrder) {
    return [...projects].sort((a, b) => a.order - b.order)
  }

  return projects
}

/**
 * Get a single project by category and slug
 */
export function getProject(categorySlug: string, projectSlug: string): Project | undefined {
  const projects = projectsByCategory[categorySlug] || []
  return projects.find((project) => project.slug === projectSlug)
}

/**
 * Get all featured projects across all categories (with category info)
 */
export function getFeaturedProjects(limit?: number): ProjectWithCategory[] {
  const allProjectsWithCategory: ProjectWithCategory[] = []

  // Flatten all projects and add category slug
  Object.entries(projectsByCategory).forEach(([categorySlug, projects]) => {
    projects.forEach((project) => {
      allProjectsWithCategory.push({
        ...project,
        categorySlug,
      })
    })
  })

  const featured = allProjectsWithCategory.filter((project) => project.featured)

  // Sort by order
  featured.sort((a, b) => a.order - b.order)

  if (limit) {
    return featured.slice(0, limit)
  }

  return featured
}

/**
 * Get the previous and next projects for navigation
 */
export function getAdjacentProjects(
  categorySlug: string,
  currentSlug: string
): { prev: Project | null; next: Project | null } {
  const projects = getProjectsByCategory(categorySlug, true)
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug)

  if (currentIndex === -1) {
    return { prev: null, next: null }
  }

  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null,
  }
}

/**
 * Get total project count
 */
export function getTotalProjectCount(): number {
  return Object.values(projectsByCategory).reduce(
    (total, projects) => total + projects.length,
    0
  )
}

/**
 * Get project count for a specific category
 */
export function getCategoryProjectCount(categorySlug: string): number {
  return (projectsByCategory[categorySlug] || []).length
}
