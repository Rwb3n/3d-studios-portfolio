// Image Skeleton Loader - Based on UI_COMPONENTS.md §13
// Animated placeholder that matches image aspect ratio

interface ImageSkeletonProps {
  aspectRatio?: string // e.g., '4/3', '16/9', '1/1'
  className?: string
}

export default function ImageSkeleton({
  aspectRatio = '4/3',
  className = '',
}: ImageSkeletonProps) {
  return (
    <div
      className={`relative w-full bg-gray-200 overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {/* Animated shimmer gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />

      {/* Optional: Additional shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  )
}
