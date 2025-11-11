// About page - Based on UI_COMPONENTS.md §10-12
// Layout: Hero section + long-form content + CTA buttons

import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Paul Baker - 3D Studios',
  description: 'Meet Paul Baker, professional modelmaker and sculptor with over 40 years of experience. From the iconic Cornetto commercials to award-winning projects for Unilever, Cadbury, and global brands.',
  keywords: 'Paul Baker, modelmaker, sculptor, food sculptor, 3D Studios, ice cream models, advertising models, commercial modelmaking, food photography',
  openGraph: {
    title: 'About Paul Baker - 3D Studios',
    description: 'Meet Paul Baker, professional modelmaker with over 40 years of experience. From the iconic Cornetto commercials to award-winning projects.',
    url: 'https://3d-studios.co.uk/about',
    siteName: '3D Studios',
    images: [
      {
        url: 'https://3d-studios.co.uk/images/about/paul-baker.jpg',
        width: 1200,
        height: 630,
        alt: 'Paul Baker - Professional Modelmaker and Sculptor',
      },
    ],
    locale: 'en_GB',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Paul Baker - 3D Studios',
    description: 'Professional modelmaker with over 40 years of experience creating award-winning models for global brands.',
    images: ['https://3d-studios.co.uk/images/about/paul-baker.jpg'],
  },
}

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Hero Section - per UI_COMPONENTS.md §10 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
        {/* Profile Photo - Responsive within grid */}
        <div className="w-full max-w-md mx-auto md:mx-0">
          <div className="relative w-full aspect-square">
            <Image
              src="/images/about/paul-baker.jpg"
              alt="Paul Baker, Modelmaker"
              fill
              className="object-cover rounded-lg shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Name and Titles - Aligned top with image */}
        <div className="flex flex-col justify-start text-center md:text-left pt-0 md:pt-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">PAUL BAKER</h1>
          <div className="text-xl md:text-2xl text-gray-700 space-y-3">
            <p>Modelmaker</p>
            <p>Designer</p>
            <p>Food Sculptor</p>
            <p>Sculptor</p>
          </div>
        </div>
      </div>

      {/* Long-form Content Sections - per UI_COMPONENTS.md §11 */}
      <div className="max-w-3xl mx-auto space-y-16 mb-16">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-medium mb-6">
            Crafting perfection for over 40 years
          </h2>
          <p className="text-lg leading-relaxed">
            For more than four decades, 3D Studios has been the silent artist
            behind some of the world&apos;s most memorable advertising campaigns and
            product displays. We don&apos;t just create models; we bring ideas to
            life.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-medium mb-6">
            Our specialty: Ice cream and chocolate that never melts
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Our journey began with a single scoop - crafting the ice creams for
            the iconic &apos;Just one Cornetto&apos; commercials. Today, we&apos;re the go-to
            studio for global giants like Unilever, Walls, Mondelez, Cadbury,
            Milka, plus many others worldwide.
          </p>
          <h3 className="text-xl font-medium mb-4">Why our models work:</h3>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>They never melt</li>
            <li>They&apos;re always camera-ready</li>
            <li>They&apos;re completely inedible (yes, that&apos;s a plus in our world!)</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-medium mb-6">
            Global Reach with the local touch
          </h2>
          <p className="text-lg leading-relaxed">
            From America to Asia, our ice cream models have graced nearly every
            continent. We don&apos;t just create models; we produce visual experiences
            that tickle the taste buds globally.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-medium mb-6">
            Beyond food: Expanding our creative palette
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            While food is our &apos;staple diet&apos;, we also love and thrive at making a
            huge range of models and props.
          </p>
          <p className="text-lg leading-relaxed">Examples:</p>
          <ul className="list-disc list-inside text-lg space-y-2 mt-2">
            <li>Window displays for high-end retailers such as Selfridges</li>
            <li>
              Visual merchandise displays for flagship stores such as Nike,
              Adidas, etc...
            </li>
            <li>
              Food scenics that turn edibles into art produce, including our
              take on John Constable&apos;s &apos;The Hay Wain&apos;
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-medium mb-6">
            Pushing the boundaries of creativity
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Our studio thrives on challenges. Some of our most notable projects
            include:
          </p>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>
              D&amp;AD Pencil for Mother London&apos;s &apos;football hooligans&apos; kit model.
            </li>
            <li>
              Winning a &apos;Gold Medal&apos; at the Chelsea Flower Show for James May&apos;s
              Toy Story Plasticine Garden.
            </li>
            <li>
              A portrait of the late Queen, sweetly crafted from Haribo
              candies.
            </li>
            <li>The Abbey Road crossing, reimagined in breakfast foods.</li>
            <li>A colossal insect monster, brought to life in Lisbon.</li>
            <li>A eco-friendly pirate ship that cleans rivers as it sails.</li>
            <li>A literal dragon, sculpted from Canon-printed pages.</li>
          </ul>
        </section>

        {/* Section 6 - Closing */}
        <section>
          <p className="text-lg leading-relaxed mb-4">
            We pride ourselves at 3D Studios that we can create
            anything................. if you have the budget!
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Also....... don&apos;t try to eat our creations unless you know a very
            good dentist!!
          </p>
          <p className="text-lg leading-relaxed">
            For more info about Paul, you may wish to{' '}
            <Link
              href="/bio"
              className="underline hover:text-gray-600 transition-colors"
            >
              read a brief biography kindly penned by his good friend H.G. Wells (here)
            </Link>
            ........
          </p>
        </section>
      </div>

      {/* CTA Button Group - per UI_COMPONENTS.md §12 */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
        <a
          href="mailto:paul@3d-studios.co.uk"
          className="px-8 py-4 bg-black text-white text-lg font-medium hover:bg-gray-800 transition-all duration-150 hover:scale-105 transform text-center"
        >
          Get in touch
        </a>
        <Link
          href="/work"
          className="px-8 py-4 border-2 border-black hover:bg-gray-100 transition-all duration-150 hover:scale-105 transform text-center text-lg font-medium"
        >
          See our work
        </Link>
      </div>
    </div>
  )
}
