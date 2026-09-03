'use client'

import { parseVideoUrl } from '@/lib/video-utils'

interface VideoPlayerProps {
  url: string
  title?: string
  className?: string
}

export default function VideoPlayer({ url, title, className = '' }: VideoPlayerProps) {
  const videoInfo = parseVideoUrl(url)

  if (videoInfo.type === 'unknown') {
    return (
      <div className={`flex h-full w-full items-center justify-center rounded-lg bg-background-200 ${className}`}>
        <p className="text-white/40">Invalid video URL</p>
      </div>
    )
  }

  if (videoInfo.type === 'youtube') {
    return (
      <div className={`h-full w-full overflow-hidden rounded-lg ${className}`}>
        <iframe
          src={`${videoInfo.embedUrl}?rel=0&modestbranding=1`}
          title={title || 'Video player'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    )
  }

  if (videoInfo.type === 'vimeo') {
    return (
      <div className={`h-full w-full overflow-hidden rounded-lg ${className}`}>
        <iframe
          src={videoInfo.embedUrl}
          title={title || 'Video player'}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    )
  }

  if (videoInfo.type === 'instagram' || videoInfo.type === 'facebook') {
    return (
      <div className={`flex h-full w-full items-center justify-center rounded-lg bg-background-200 ${className}`}>
        <a
          href={videoInfo.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
        >
          Open on {videoInfo.type === 'instagram' ? 'Instagram' : 'Facebook'}
        </a>
      </div>
    )
  }

  return (
    <div className={`h-full w-full overflow-hidden rounded-lg bg-background-200 ${className}`}>
      <p className="flex h-full w-full items-center justify-center text-white/40">Unsupported video URL</p>
    </div>
  )
}
