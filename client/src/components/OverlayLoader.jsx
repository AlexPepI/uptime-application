import React from 'react'
import { Loader } from './Loader'

export function OverlayLoader({
  loading,
  children,
  blurAmount = 'blur-sm',     // Tailwind: blur-sm | blur-md | etc.
  backdropOpacity = 'bg--[var(--background)]',
}) {
  const bgClass = `bg-[var(--background)${backdropOpacity}]`
  return (
    <div className="relative">
      {/* Overlay + spinner */}
      {loading && (
        <div
          className={`
            absolute inset-0
            ${bgClass}
            flex items-center justify-center
            z-10
          `}
        >
           <Loader size={40} color="var(--custom-accent)" />
        </div>
      )}

      {/* Your content, blurred when loading */}
      <div className={loading ? `filter ${blurAmount}` : ''}>
        {children}
      </div>
    </div>
  )
}
