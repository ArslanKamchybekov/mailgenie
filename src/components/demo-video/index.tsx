"use client"

import { useRef, useEffect } from "react"

interface AutoplayVideoProps {
  src: string
  className?: string
}

export default function AutoplayVideo({ src, className = "" }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Autoplay was prevented:", error)
      })
    }
  }, [])

  return (
    <div className={`relative ${className} aspect-video`}>
      <video
        ref={videoRef}
        className="w-full h-full rounded-lg shadow-lg object-cover"
        autoPlay
        muted
        loop
        playsInline
        controls
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

