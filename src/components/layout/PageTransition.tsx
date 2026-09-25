'use client'

// Fades each route in on navigation (see .page-enter in globals.css).
// Keyed on pathname: app/template.tsx would only remount when the top-level
// segment changes, missing e.g. /work -> /work/still-life.

import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  )
}
