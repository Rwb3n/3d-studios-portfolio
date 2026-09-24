// Server-only: read intrinsic dimensions of images in /public at build time
// so layouts can use the real aspect ratio instead of a fixed letterbox

import fs from 'node:fs'
import path from 'node:path'

export interface ImageSize {
  width: number
  height: number
}

// JPEG start-of-frame markers (baseline, extended, progressive, lossless...)
const SOF_MARKERS = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf])

function readJpegSize(buf: Buffer): ImageSize | null {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null
  let offset = 2
  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) return null
    const marker = buf[offset + 1]
    if (marker === 0xff) {
      offset += 1 // fill byte
      continue
    }
    if (SOF_MARKERS.has(marker)) {
      return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) }
    }
    offset += 2 + buf.readUInt16BE(offset + 2)
  }
  return null
}

function readPngSize(buf: Buffer): ImageSize | null {
  if (buf.toString('ascii', 1, 4) !== 'PNG') return null
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
}

const cache = new Map<string, ImageSize | null>()

/** Dimensions of an image under /public, e.g. getImageSize('/images/a.jpg') */
export function getImageSize(publicPath: string): ImageSize | null {
  if (cache.has(publicPath)) return cache.get(publicPath)!
  let size: ImageSize | null = null
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), 'public', publicPath))
    size = readJpegSize(buf) ?? readPngSize(buf)
  } catch {
    size = null
  }
  cache.set(publicPath, size)
  return size
}
