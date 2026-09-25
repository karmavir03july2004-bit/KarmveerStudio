'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { slugify } from '@/lib/utils'
import { uploadImageToCloudinary } from '@/lib/cloudinary-client'

export default function NewProjectPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'VIDEO_EDITING',
    description: '',
    thumbnailUrl: '',
    videoUrl: '',
    aspectRatio: '16:9',
    mediaType: 'video',
    client: '',
    year: '',
    software: '',
    challenge: '',
    solution: '',
    result: '',
    featured: false,
    published: false,
    sortOrder: 0,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData({
      ...formData,
      title,
      slug: slugify(title),
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const result = await uploadImageToCloudinary(file, (progress) => {
        setUploadProgress(progress)
      })

      if (result.success && result.url) {
        setFormData({ ...formData, thumbnailUrl: result.url })
        setUploadProgress(100)
      } else {
        setError(result.error || 'Failed to upload image')
      }
    } catch (error) {
      setError('Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.videoUrl && !/^https?:\/\//i.test(formData.videoUrl.trim())) {
      setError('Please enter a valid YouTube, Instagram, Facebook, or Vimeo URL.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/admin/projects')
      } else {
        setError(data.error || 'Failed to create project')
      }
    } catch (error) {
      setError('Failed to create project')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background-50">
      <div className="border-b border-white/10 bg-background-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/projects" className="text-white/60 hover:text-white transition-colors">
              ← Projects
            </Link>
            <h1 className="font-display text-xl font-bold">New Project</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleTitleChange}
                required
                className="w-full px-4 py-3 bg-background-100 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition-colors"
                placeholder="Project title"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium mb-2">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-3 bg-background-100 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition-colors"
                placeholder="project-slug"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Category *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-4 py-3 bg-background-100 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition-colors"
              >
                <option value="PERSONAL_BRAND">Personal Brand</option>
                <option value="AI_SAAS">AI / SaaS</option>
                <option value="PERFORMANCE_ADS">Performance Ads</option>
              </select>
            </div>

            <div>
              <label htmlFor="year" className="block text-sm font-medium mb-2">
                Year
              </label>
              <input
                type="number"
                id="year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-4 py-3 bg-background-100 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition-colors"
                placeholder="2024"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-3 bg-background-100 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition-colors resize-none"
              placeholder="Project description"
            />
          </div>

          <div>
            <label htmlFor="thumbnail" className="block text-sm font-medium mb-2">
              Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageUpload}
              disabled={isUploading}
              className="w-full px-4 py-3 bg-background-100 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition-colors"
            />
            {isUploading && (
              <div className="mt-2">
                <div className="w-full bg-background-200 rounded-full h-2">
                  <div
                    className="bg-accent-violet h-2 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-white/60 mt-1">Uploading...</p>
              </div>
            )}
            {formData.thumbnailUrl && (
              <div className="mt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formData.thumbnailUrl}
                  alt="Thumbnail preview"
                  className="w-32 h-20 object-cover rounded"
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="videoUrl" className="block text-sm font-medium mb-2">
              Project URL
            </label>
            <input
              type="url"
              id="videoUrl"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              className="w-full px-4 py-3 bg-background-100 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition-colors mb-2"
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <p className="text-xs text-white/40">Supported platforms: YouTube, Instagram, Facebook, Vimeo.</p>
          </div>

          <div>
            <label htmlFor="aspectRatio" className="block text-sm font-medium mb-2">
              Aspect Ratio
            </label>
            <select
              id="aspectRatio"
              value={formData.aspectRatio}
              onChange={(e) => setFormData({ ...formData, aspectRatio: e.target.value })}
              className="w-full px-4 py-3 bg-background-100 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition-colors"
            >
              <option value="9:16">9:16</option>
              <option value="16:9">16:9</option>
            </select>
          </div>

          <div>
            <label htmlFor="client" className="block text-sm font-medium mb-2">
              Client
            </label>
            <input
              type="text"
              id="client"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full px-4 py-3 bg-background-100 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition-colors"
              placeholder="Client name"
            />
          </div>

          <div>
            <label htmlFor="software" className="block text-sm font-medium mb-2">
              Software
            </label>
            <input
              type="text"
              id="software"
              value={formData.software}
              onChange={(e) => setFormData({ ...formData, software: e.target.value })}
              className="w-full px-4 py-3 bg-background-100 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition-colors"
              placeholder="DaVinci Resolve, Premiere Pro, etc."
            />
          </div>

          <div>
            <label htmlFor="challenge" className="block text-sm font-medium mb-2">
              The Challenge
            </label>
            <textarea
              id="challenge"
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-background-100 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition-colors resize-none"
              placeholder="What was the challenge?"
            />
          </div>

          <div>
            <label htmlFor="solution" className="block text-sm font-medium mb-2">
              The Solution
            </label>
            <textarea
              id="solution"
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-background-100 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition-colors resize-none"
              placeholder="How did you solve it?"
            />
          </div>

          <div>
            <label htmlFor="result" className="block text-sm font-medium mb-2">
              The Result
            </label>
            <textarea
              id="result"
              value={formData.result}
              onChange={(e) => setFormData({ ...formData, result: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-background-100 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition-colors resize-none"
              placeholder="What was the outcome?"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="sortOrder" className="block text-sm font-medium mb-2">
                Sort Order
              </label>
              <input
                type="number"
                id="sortOrder"
                value={formData.sortOrder}
                onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-background-100 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition-colors"
              />
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">Featured</span>
              </label>
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">Published</span>
              </label>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-white text-background-50 font-medium rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'SAVING...' : 'SAVE PROJECT'}
            </button>
            <Link
              href="/admin/projects"
              className="px-8 py-3 bg-background-100 border border-white/10 text-white font-medium rounded-lg hover:bg-background-200 transition-colors"
            >
              CANCEL
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
