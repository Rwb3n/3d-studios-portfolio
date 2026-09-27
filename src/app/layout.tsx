import type { Metadata } from 'next'
import { Archivo, Courier_Prime } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/layout/PageTransition'
import { getCategories } from '@/lib/data'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-archivo',
})

// Typewriter face for job-ticket credits on project pages
const courier = Courier_Prime({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-courier',
})

export const metadata: Metadata = {
  title: '3D Studios - Professional Modelmakers',
  description:
    'Probably the best modelmakers in the world. Over 40 years of experience creating model food, props, and displays for advertising and retail.',
}

// First homepage visit per session: flag <html> before first paint so the
// intro animations in globals.css run without a flash of visible content.
// The flag is removed once the animations have finished.
const introScript = `try{if(location.pathname==='/'&&!sessionStorage.getItem('homepage-animated')){sessionStorage.setItem('homepage-animated','true');var d=document.documentElement;d.setAttribute('data-intro','');setTimeout(function(){d.removeAttribute('data-intro')},4000)}}catch(e){}`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Only the fields the nav needs - keeps project data out of the client bundle
  const navCategories = getCategories().map(({ id, name, slug }) => ({ id, name, slug }))

  return (
    <html lang="en" className={`${archivo.variable} ${courier.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header categories={navCategories} />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  )
}
