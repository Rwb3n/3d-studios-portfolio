// TypeScript interfaces for 3D Studios portfolio data

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  thumbnail: string
  order: number
  featured: boolean
}

export interface Project {
  id: string
  slug: string
  title: string
  client?: string
  agency?: string
  year?: number
  type: 'image' | 'video'
  thumbnail: string
  images?: ProjectImage[]
  video?: ProjectVideo
  tags: string[]
  featured: boolean
  order: number
}

export interface ProjectImage {
  url: string
  alt: string
  width: number
  height: number
}

export interface ProjectVideo {
  url: string
  poster?: string
  duration?: number
}

// Extended type for projects that includes category information
export interface ProjectWithCategory extends Project {
  categorySlug: string
}
