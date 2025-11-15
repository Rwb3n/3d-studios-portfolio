// Biography page - H.G. Wells style biography of Paul Baker
// Content extracted from original Wix site

import Link from 'next/link'

export const metadata = {
  title: 'Biography | 3D Studios',
  description: 'The Extraordinary Voyages of Paul Baker - A brief biography written in the style of H.G. Wells',
  openGraph: {
    title: 'Biography of Paul Baker - 3D Studios',
    description: 'The Extraordinary Voyages of Paul Baker - Master of Miniature Marvels',
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
    description: 'The Extraordinary Voyages of Paul Baker - Master of Miniature Marvels',
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

      <h1 className="text-4xl md:text-5xl font-light mb-12">
        The Extraordinary Voyages of Paul Baker - Master of Miniature Marvels
      </h1>

      <div className="prose prose-lg max-w-none space-y-12">
        {/* Introduction */}
        <div className="space-y-4">
          <p className="text-lg leading-relaxed">
            In the grand annals of human ingenuity, there are those rare individuals
            whose creations defy the very boundaries of imagination.
          </p>
          <p className="text-lg leading-relaxed">
            Such a man is Paul Baker, the intrepid founder of that most curious
            establishment known as 3D Studios. For nigh on forty years, this singular
            gentleman has embarked upon a remarkable odyssey through the realms of
            model making, design, and the hitherto unexplored frontiers of food sculpture.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-medium">
            The Genesis of a Visionary
          </h2>
          <p className="text-lg leading-relaxed">
            It was in the halcyon days of yore, when the world still marveled at the
            simple pleasure of a frozen confection, that young Baker first set his
            hand to the craft that would define his legacy. With the precision of a
            master horologist and the vision of a true artiste, he sculpted ice creams
            for the now-legendary &quot;Just one Cornetto&quot; moving pictures, captivating
            audiences across the British Empire and beyond.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-medium">
            Voyages into the Miniature Unknown
          </h2>
          <p className="text-lg leading-relaxed">
            As his reputation grew, so too did the scope of Baker&apos;s ambitions. No
            challenge was too great, no commission too fantastical for this pioneer
            of the diminutive. From the bustling bazaars of Selfridges, where his
            window displays drew gasps of wonder from passersby, to the very streets
            of Lisbon, where a colossal insect of his own devising strode forth to
            the amazement of all, Baker&apos;s creations knew no bounds.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-medium">
            Culinary Landscapes and Sweeter Subjects
          </h2>
          <p className="text-lg leading-relaxed">
            But it was in the realm of comestible recreation that Baker truly found
            his métier. With the skill of a master painter and the precision of a
            surgeon, he brought forth visions of epicurean delight that defied belief.
            Witness his rendition of Constable&apos;s &quot;Hay Wain,&quot; rendered not in oils
            but in the very victuals that grace our tables! Marvel at his portrait
            of Her Late Majesty, crafted entirely from the confectionery delights of
            Haribo!
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-medium">
            Accolades and Honors
          </h2>
          <p className="text-lg leading-relaxed">
            The world, dear reader, has not been blind to Baker&apos;s genius. The esteemed
            Royal Horticultural Society bestowed upon him their highest honor for his
            Plasticine garden, a verdant paradise wrought entirely from modeling clay.
            The hallowed halls of D&amp;AD echoed with applause as he was presented with
            a silver award for his &quot;football hooligan&quot; kit, a creation of such
            verisimilitude as to deceive the very eyes of those who beheld it.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-medium">
            Global Expeditions and Frozen Frontiers
          </h2>
          <p className="text-lg leading-relaxed">
            From the scorching sands of the Sahara to the icy wastes of the Arctic
            (though perhaps not quite reaching Antarctica), Baker&apos;s ice cream models
            have graced every corner of our globe. These frozen marvels, impervious
            to heat and time, stand as testament to his mastery over the very laws
            of nature.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-medium">
            The Ongoing Saga
          </h2>
          <p className="text-lg leading-relaxed">
            As we speak, dear friends, the indefatigable Paul Baker continues his
            ceaseless explorations. New horizons beckon, new challenges arise, and
            with them, new triumphs surely await. For in the world of Paul Baker and
            3D Studios, the only limit is the boundary of human imagination itself.
          </p>
        </section>

        {/* Closing */}
        <div className="space-y-4 pt-8">
          <p className="text-lg leading-relaxed italic">
            And so, gentle reader, we leave our hero poised upon the brink of his
            next great adventure. What wonders will he unveil next? What hitherto
            unimagined marvels will spring forth from his workshop? Only time will
            tell, but of one thing we can be certain: the extraordinary voyages of
            Paul Baker are far from over.
          </p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-16 mb-12">
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
