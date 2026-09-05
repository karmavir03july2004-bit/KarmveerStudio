'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/navbar/navbar'
import ProjectCard from '@/components/projects/project-card'
import Footer from '@/components/footer/footer'
import { motion, AnimatePresence } from 'framer-motion'

const categories = [
  { value: 'ALL', label: 'ALL' },
  { value: 'VIDEO_EDITING', label: 'VIDEO EDITING' },
  { value: 'MOTION_GRAPHICS', label: 'MOTION GRAPHICS' },
  { value: 'SAAS_ANIMATION', label: 'SAAS ANIMATION' },
  { value: 'COLOR_GRADING', label: 'COLOR GRADING' },
]

export default function WorksPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchProjects(attempt = 0) {
      try {
        const response = await fetch('/api/projects?published=true', {
          cache: 'no-store',
        })
        const data = await response.json()

        if (!response.ok || !data.success) {
          if (attempt === 0) {
            await fetchProjects(1)
            return
          }
          throw new Error(data.error || 'Failed to fetch projects')
        }

        if (!cancelled) {
          setProjects(data.projects)
          setLoadError(false)
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error)
        if (!cancelled) setLoadError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchProjects()

    return () => {
      cancelled = true
    }
  }, [])

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter((project) => project.category === selectedCategory)

  return (
    <main className="min-h-screen bg-background-50">
      <Navbar />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-8">
            SELECTED WORK
          </h1>

          <div className="flex flex-wrap gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-white text-background-50'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          ) : loadError ? (
            <div className="text-center py-24">
              <p className="text-white/60 text-xl font-display mb-6">
                WORKS COULD NOT BE LOADED.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="text-white/60 hover:text-white transition-colors"
              >
                TRY AGAIN
              </button>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-white/40 text-xl font-display">
                YOUR NEXT GREAT PROJECT BELONGS HERE.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
