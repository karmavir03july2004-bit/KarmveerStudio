'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/testimonials?published=true')
        const data = await response.json()
        if (data.success) {
          setTestimonials(data.testimonials.slice(0, 3))
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  if (isLoading || testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-32 bg-background-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          WHAT CLIENTS SAY
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index: number) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-background-50 border border-white/10 rounded-lg"
            >
              <p className="text-white/80 mb-6 leading-relaxed">
                &quot;{testimonial.message}&quot;
              </p>
              <div className="flex items-center gap-4">
                {testimonial.avatar && (
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  {testimonial.role && (
                    <p className="text-sm text-white/60">{testimonial.role}</p>
                  )}
                  {testimonial.company && (
                    <p className="text-xs text-white/40">{testimonial.company}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
