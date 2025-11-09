// Biography page - Placeholder for H.G. Wells biography
// Content to be added by client

import Link from 'next/link'

export const metadata = {
  title: 'Biography | 3D Studios',
  description: 'Biography of Paul Baker, written by H.G. Wells',
  openGraph: {
    title: 'Biography of Paul Baker - 3D Studios',
    description: 'A brief biography of Paul Baker, professional modelmaker, written by H.G. Wells.',
    url: 'https://3d-studios.co.uk/bio',
    siteName: '3D Studios',
    images: [
      {
        url: 'https://3d-studios.co.uk/images/about/paul-baker.jpg',
        width: 1200,
        height: 630,
        alt: 'Paul Baker Biography',
      },
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biography of Paul Baker',
    description: 'A brief biography written by H.G. Wells.',
    images: ['https://3d-studios.co.uk/images/about/paul-baker.jpg'],
  },
}

export default function BioPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-8">
        <Link
          href="/about"
          className="text-gray-600 hover:text-black transition-colors"
        >
          ← Back to About
        </Link>
      </div>

      <h1 className="text-5xl font-bold mb-8">
        A Brief Biography
      </h1>

      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-lg leading-relaxed text-gray-600 italic">
          Biography content by H.G. Wells to be added.
        </p>

        <p className="text-lg leading-relaxed">
          This page is a placeholder for the biography content. The actual
          biography text written by H.G. Wells will be added here.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-300">
        <Link
          href="/about"
          className="text-gray-600 hover:text-black transition-colors"
        >
          ← Back to About
        </Link>
      </div>
    </div>
  )
}
