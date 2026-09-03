'use client'

import { motion } from 'framer-motion'

const services = [
  {
    number: '01',
    title: 'VIDEO EDITING',
    description: 'Transform raw footage into engaging, polished content with strong pacing, storytelling and visual rhythm.',
  },
  {
    number: '02',
    title: 'MOTION GRAPHICS',
    description: 'Create clean, dynamic motion graphics that make ideas easier to understand and more visually powerful.',
  },
  {
    number: '03',
    title: 'SAAS ANIMATION',
    description: 'Turn complex software and product concepts into clear, engaging visual stories.',
  },
  {
    number: '04',
    title: 'COLOR GRADING',
    description: 'Create consistent, cinematic visuals with professional color correction and grading.',
  },
]

export default function Services() {
  return (
    <section className="py-24 bg-background-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          SERVICES
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 border border-white/10 rounded-lg hover:border-white/20 transition-colors bg-background-50"
            >
              <span className="text-accent-violet font-display text-sm font-medium mb-4 block">
                {service.number}
              </span>
              <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-white/80 transition-colors">
                {service.title}
              </h3>
              <p className="text-white/60">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
