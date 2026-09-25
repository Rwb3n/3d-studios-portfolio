'use client'

// Project image with a full-screen zoom view for inspecting the craftsmanship.
// Native <dialog>: focus handling, Esc to close and backdrop for free.
// In the dialog, click/tap toggles 2x zoom at that point; pointer movement pans.
// 2x is roughly the most the source files (1280-1900px wide) can support.

import Image from 'next/image'
import { useRef, useState } from 'react'

interface ZoomableImageProps {
  src: string
  alt: string
  width: number
  height: number
}

const ZOOM = 2

export default function ZoomableImage({ src, alt, width, height }: ZoomableImageProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [zoomed, setZoomed] = useState(false)
  const [origin, setOrigin] = useState('50% 50%')

  const originFromPointer = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    return `${Math.min(100, Math.max(0, x))}% ${Math.min(100, Math.max(0, y))}%`
  }

  const open = () => dialogRef.current?.showModal()
  const close = () => {
    dialogRef.current?.close()
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="group relative mx-auto block cursor-zoom-in bg-gray-100"
        style={{
          aspectRatio: `${width} / ${height}`,
          width: `min(100%, calc(75vh * ${width / height}))`,
        }}
        aria-label={`View ${alt} full screen`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 976px"
          priority
        />
        <span className="pointer-events-none absolute bottom-3 right-3 bg-surface/90 px-2.5 py-1 font-mono text-xs uppercase tracking-[0.2em] text-gray-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          Inspect
        </span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setZoomed(false)}
        onClick={(e) => {
          // Click on the backdrop area (the dialog itself, not its contents) closes
          if (e.target === e.currentTarget) close()
        }}
        className="m-0 h-dvh border-0 max-h-none w-screen max-w-none bg-[#0d0c0b] p-0 backdrop:bg-black/60"
        aria-label={alt}
      >
        <div className="flex h-full w-full items-center justify-center overflow-hidden p-4 md:p-12">
          {/* Frame sized to the image's aspect ratio so the zoom origin maps onto the picture */}
          <div
            className={`relative overflow-hidden ${zoomed ? 'cursor-zoom-out touch-none' : 'cursor-zoom-in'}`}
            style={{
              aspectRatio: `${width} / ${height}`,
              width: `min(100%, calc((100dvh - 6rem) * ${width / height}))`,
            }}
            onPointerDown={(e) => {
              setOrigin(originFromPointer(e))
              setZoomed((z) => !z)
            }}
            onPointerMove={(e) => {
              if (zoomed) setOrigin(originFromPointer(e))
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              quality={90}
              className="object-cover transition-transform duration-300 ease-out select-none"
              style={{ transform: zoomed ? `scale(${ZOOM})` : 'none', transformOrigin: origin }}
              draggable={false}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={close}
          className="absolute right-4 top-4 bg-surface/90 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-gray-900 hover:bg-surface"
        >
          Close ✕
        </button>
        <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.2em] text-white/70">
          {zoomed ? 'Move to pan · tap to zoom out' : 'Tap to zoom'}
        </p>
      </dialog>
    </>
  )
}
