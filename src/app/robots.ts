// Robots.txt generation for 3D Studios portfolio
// Guides search engine crawlers

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://3d-studios.co.uk'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',       // Block API routes (if any added in future)
          '/_next/',     // Block Next.js internal files
        ],
      },
      // Optional: Block AI scrapers
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
