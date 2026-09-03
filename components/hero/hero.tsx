'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-premium" />
        <div className="absolute inset-0 bg-gradient-hero" />
        
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent-violet/5 rounded-full blur-[120px]"
        />
        
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-magenta/5 rounded-full blur-[100px]"
        />
        
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, -50, 0],
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[80px]"
        />
      </motion.div>

      <div className="absolute inset-0 noise-overlay" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-block px-5 py-2.5 text-xs font-semibold tracking-[0.2em] text-white/70 border border-white/10 rounded-full backdrop-blur-sm bg-white/5">
            AVAILABLE FOR SELECTED PROJECTS
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-display text-5xl md:text-7xl lg:text-9xl font-bold leading-[1.1] mb-8 tracking-tight"
        >
          I TURN RAW FOOTAGE
          <br />
          <span className="gradient-text text-glow">INTO VISUAL EXPERIENCES.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          Video Editor & Motion Graphics Designer helping creators and brands
          turn ideas into high-impact visual content.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <Link
            href="/works"
            className="group relative px-10 py-4 bg-white text-background-50 font-semibold rounded-full hover:bg-white/90 transition-all duration-300 premium-glow"
          >
            <span className="relative z-10">VIEW MY WORK</span>
          </Link>
          <Link
            href="/connect"
            className="group px-10 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
          >
            LET&apos;S WORK TOGETHER
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/10 rounded-full flex justify-center pt-2 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 bg-white/40 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
