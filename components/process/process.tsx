'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'DISCOVER',
    description: 'Understand the project, audience and creative direction.',
  },
  {
    number: '02',
    title: 'EDIT',
    description: 'Build the story through pacing, structure and visual rhythm.',
  },
  {
    number: '03',
    title: 'POLISH',
    description: 'Add motion, sound, color and visual details.',
  },
  {
    number: '04',
    title: 'DELIVER',
    description: 'Export and deliver a refined final product ready for its platform.',
  },
]

export default function Process() {
  return (
    <section className="py-24 bg-background-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          PROCESS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <span className="text-accent-blue font-display text-sm font-medium mb-4 block">
                {step.number}
              </span>
              <h3 className="font-display text-xl font-semibold mb-3">
                {step.title}
              </h3>
              <p className="text-white/60">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
