'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ProjectCardProps {
  project: {
    id: string
    title: string
    slug: string
    category: string
    description: string
    thumbnailUrl: string | null
    videoUrl: string | null
    aspectRatio?: string | null
    year: number | null
    software: string | null
  }
  featured?: boolean
}

const categoryLabels: Record<string, string> = {
  VIDEO_EDITING: 'Video Editing',
  MOTION_GRAPHICS: 'Motion Graphics',
  SAAS_ANIMATION: 'SaaS Animation',
  COLOR_GRADING: 'Color Grading',
}

const getAspectRatioStyle = (aspectRatio?: string | null) => {
  const ratio = aspectRatio === '9:16' ? '9 / 16' : '16 / 9'
  return { aspectRatio: ratio }
}

export default function ProjectCard({ project, featured }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const media = project.videoUrl ? (
    <a
      href={project.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.title}`}
      className="block"
    >
      <div
        className="relative overflow-hidden rounded-lg bg-background-200"
        style={getAspectRatioStyle(project.aspectRatio)}
      >
        {project.thumbnailUrl ? (
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-background-200">
            <span className="text-white/20 text-6xl font-display font-bold">
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <svg
              className="ml-1 h-10 w-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  ) : (
    <div
      className="relative overflow-hidden rounded-lg bg-background-200"
      style={getAspectRatioStyle(project.aspectRatio)}
    >
      {project.thumbnailUrl ? (
        <Image
          src={project.thumbnailUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-background-200">
          <span className="text-white/20 text-6xl font-display font-bold">
            {project.title.charAt(0)}
          </span>
        </div>
      )}
    </div>
  )

  if (featured) {
    return (
      <motion.div
        className="group cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {media}

        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-accent-violet tracking-wider">
              {categoryLabels[project.category] || project.category}
            </span>
            {project.year && (
              <span className="text-sm text-white/40">{project.year}</span>
            )}
          </div>
          <h3 className="font-display font-semibold text-3xl group-hover:text-white/80 transition-colors">
            {project.title}
          </h3>
          <p className="text-lg text-white/60 line-clamp-2">{project.description}</p>
          {project.software && (
            <p className="mt-2 text-sm text-white/40">{project.software}</p>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {media}

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-white/40 tracking-wider">
            {categoryLabels[project.category] || project.category}
          </span>
          {project.year && (
            <span className="text-xs text-white/40">{project.year}</span>
          )}
        </div>
        <h3 className="font-display font-semibold text-xl group-hover:text-white/80 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-white/60 line-clamp-2">{project.description}</p>
        {project.software && (
          <p className="mt-2 text-xs text-white/40">{project.software}</p>
        )}
      </div>
    </motion.div>
  )
}
