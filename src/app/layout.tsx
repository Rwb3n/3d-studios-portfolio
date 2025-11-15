import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-archivo',
})

export const metadata: Metadata = {
  title: '3D Studios - Professional Modelmakers',
  description:
    'Probably the best modelmakers in the world. Over 40 years of experience creating model food, props, and displays for advertising and retail.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
