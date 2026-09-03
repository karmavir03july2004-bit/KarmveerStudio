'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminTestimonialsPage() {
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/testimonials')
        const data = await response.json()
        if (data.success) {
          setTestimonials(data.testimonials)
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return
    }

    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setTestimonials(testimonials.filter((t) => t.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete testimonial:', error)
    }
  }

  const handleTogglePublished = async (id: string, published: boolean) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !published }),
      })

      if (response.ok) {
        setTestimonials(testimonials.map((t) => (t.id === id ? { ...t, published: !published } : t)))
      }
    } catch (error) {
      console.error('Failed to update testimonial:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-50">
      <div className="border-b border-white/10 bg-background-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-white/60 hover:text-white transition-colors">
              ← Dashboard
            </Link>
            <h1 className="font-display text-xl font-bold">Testimonials</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {testimonials.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-white/40 text-xl font-display">No testimonials yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-background-100 border border-white/10 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    {testimonial.role && (
                      <p className="text-white/60 text-sm">{testimonial.role}</p>
                    )}
                    {testimonial.company && (
                      <p className="text-white/40 text-sm">{testimonial.company}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        testimonial.published
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {testimonial.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                <p className="text-white/80 mt-4 line-clamp-3">{testimonial.message}</p>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <p className="text-white/40 text-sm">
                    {new Date(testimonial.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleTogglePublished(testimonial.id, testimonial.published)}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {testimonial.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="text-sm text-red-400 hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
