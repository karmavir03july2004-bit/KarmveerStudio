/**
 * Video URL utilities for the supported portfolio platforms.
 */

export const VALID_ASPECT_RATIOS = ['9:16', '16:9'] as const
export type AspectRatio = (typeof VALID_ASPECT_RATIOS)[number]

export interface VideoInfo {
  type: 'youtube' | 'instagram' | 'facebook' | 'vimeo' | 'unknown'
  platform?: 'youtube' | 'instagram' | 'facebook' | 'vimeo'
  embedUrl?: string
  videoId?: string
  originalUrl: string
}

export function normalizeAspectRatio(value?: string | null): AspectRatio {
  const candidate = (value ?? '').trim()
  return VALID_ASPECT_RATIOS.includes(candidate as AspectRatio)
    ? (candidate as AspectRatio)
    : '16:9'
}

export function getAspectRatioValue(value?: string | null): string {
  return normalizeAspectRatio(value) === '9:16' ? '9 / 16' : '16 / 9'
}

export function parseVideoUrl(url: string): VideoInfo {
  if (!url) {
    return { type: 'unknown', originalUrl: url }
  }

  const trimmedUrl = url.trim()
  let parsedUrl: URL

  try {
    parsedUrl = new URL(trimmedUrl)
  } catch {
    return { type: 'unknown', originalUrl: trimmedUrl }
  }

  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    return { type: 'unknown', originalUrl: trimmedUrl }
  }

  const hostname = parsedUrl.hostname.toLowerCase().replace(/^www\./, '')
  const pathParts = parsedUrl.pathname.split('/').filter(Boolean)

  if (['youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtube-nocookie.com'].includes(hostname)) {
    const videoId = parsedUrl.searchParams.get('v') ||
      (['embed', 'v', 'shorts'].includes(pathParts[0]) ? pathParts[1] : undefined)
    if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return {
        type: 'youtube',
        platform: 'youtube',
        videoId,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        originalUrl: trimmedUrl,
      }
    }
  }

  if (hostname === 'youtu.be' && /^[a-zA-Z0-9_-]{11}$/.test(pathParts[0] || '')) {
    const videoId = pathParts[0]
    return {
      type: 'youtube',
      platform: 'youtube',
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      originalUrl: trimmedUrl,
    }
  }

  if (['instagram.com', 'instagr.am'].includes(hostname) &&
      ['reel', 'p', 'tv'].includes(pathParts[0] || '') && pathParts[1]) {
    return { type: 'instagram', platform: 'instagram', originalUrl: trimmedUrl }
  }

  if (['facebook.com', 'm.facebook.com', 'fb.watch'].includes(hostname) && pathParts.length > 0) {
    return { type: 'facebook', platform: 'facebook', originalUrl: trimmedUrl }
  }

  if (hostname === 'player.vimeo.com' && pathParts[0] === 'video' && /^\d+$/.test(pathParts[1] || '')) {
    const videoId = pathParts[1]
    return {
      type: 'vimeo',
      platform: 'vimeo',
      videoId,
      embedUrl: `https://player.vimeo.com/video/${videoId}`,
      originalUrl: trimmedUrl,
    }
  }

  if (hostname === 'vimeo.com' && /^\d+$/.test(pathParts[0] || '')) {
    const videoId = pathParts[0]
    return {
      type: 'vimeo',
      platform: 'vimeo',
      videoId,
      embedUrl: `https://player.vimeo.com/video/${videoId}`,
      originalUrl: trimmedUrl,
    }
  }

  return {
    type: 'unknown',
    originalUrl: trimmedUrl,
  }
}

export function validateProjectUrl(url: string): { valid: boolean; error?: string } {
  const trimmedUrl = (url ?? '').trim()

  if (!trimmedUrl) {
    return {
      valid: false,
      error: 'Please enter a valid YouTube, Instagram, Facebook, or Vimeo URL.',
    }
  }

  if (!isValidVideoUrl(trimmedUrl)) {
    return {
      valid: false,
      error: 'Please enter a valid YouTube, Instagram, Facebook, or Vimeo URL.',
    }
  }

  return { valid: true }
}

export function getVideoThumbnail(url: string): string | null {
  const info = parseVideoUrl(url)

  if (info.type === 'youtube' && info.videoId) {
    return `https://img.youtube.com/vi/${info.videoId}/maxresdefault.jpg`
  }

  if (info.type === 'vimeo' && info.videoId) {
    return null
  }

  return null
}

export function isValidVideoUrl(url: string): boolean {
  const info = parseVideoUrl(url)
  return info.type !== 'unknown'
}
