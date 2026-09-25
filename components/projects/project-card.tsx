'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const labels: Record<string, string> = {
  PERSONAL_BRAND: 'PERSONAL BRAND',
  AI_SAAS: 'AI / SAAS',
  PERFORMANCE_ADS: 'PERFORMANCE ADS',
  VIDEO_EDITING: 'PERSONAL BRAND',
  MOTION_GRAPHICS: 'AI / SAAS',
  SAAS_ANIMATION: 'AI / SAAS',
  COLOR_GRADING: 'PERSONAL BRAND'
}

export default function ProjectCard({ project }: { project: any }) {
  const ratio = project.aspectRatio === '9:16' ? '9 / 16' : '16 / 9'

  return (
    <article className="group">
      <Link href={`/works/${project.slug}`}>
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-[#161616] border border-white/10"
          style={{ aspectRatio: ratio }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          {project.thumbnailUrl ? (
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-5xl font-display font-bold text-white/15">
              {project.title?.charAt(0)}
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ scale: 0.9 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-14 h-14 rounded-full bg-[#F5F1E8] text-[#080808] grid place-items-center text-2xl font-bold">
              ▶
            </div>
          </motion.div>
        </motion.div>
        <div className="pt-5">
          <p className="text-[11px] tracking-[.16em] font-bold text-[#FF6A00]">
            {labels[project.category] || project.category}
          </p>
          <h3 className="font-display text-xl font-bold mt-2 group-hover:text-[#FF6A00] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-[#AAA49A] mt-2 line-clamp-2">
            {project.description}
          </p>
          <span className="inline-block mt-4 text-xs font-bold tracking-widest text-[#F5F1E8] group-hover:text-[#FF6A00] transition-colors duration-300">
            VIEW PROJECT →
          </span>
        </div>
      </Link>
    </article>
  )
}
