'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: prefersReducedMotion ? 0 : i * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  }

  const profileVariants = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <section className="pt-28 md:pt-32 pb-8 px-3 md:px-6">
      <div className="mx-auto rounded-[2rem] border border-white/10 bg-[#111111] overflow-hidden relative" style={{ maxWidth: 'min(1400px, calc(100% - 64px))' }}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#FF6A00]/5 via-transparent to-transparent pointer-events-none"
          animate={
            !prefersReducedMotion
              ? {
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }
              : {}
          }
          transition={
            !prefersReducedMotion
              ? {
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                }
              : {}
          }
          style={{ backgroundSize: '200% 200%' }}
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-[0.4fr_0.6fr] gap-8 md:gap-12 items-center p-6 sm:p-10 md:p-14 lg:p-16 min-h-[640px] relative"
        >
          <motion.div
            variants={profileVariants}
            whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
            transition={{ duration: 0.3 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-[220px] sm:w-[260px] md:w-[300px] lg:w-[380px] xl:w-[420px] aspect-square rounded-full border border-[#FF6A00] shadow-[0_4px_24px_rgba(0,0,0,0.3)] overflow-hidden bg-[#161616]">
              <Image
                src="/karmveer-profile.png"
                alt="Karmveer"
                fill
                priority
                sizes="(max-width: 640px) 220px, (max-width: 768px) 260px, (max-width: 1024px) 300px, (max-width: 1280px) 380px, 420px"
                className="object-cover"
                style={{ objectPosition: 'center 20%' }}
              />
            </div>
          </motion.div>
          <motion.div className="space-y-6">
            <motion.p
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-[#FF6A00] text-xs md:text-sm font-bold tracking-[.22em]"
            >
              HELLO, I&apos;M
            </motion.p>
            <motion.h1
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold leading-[.92] tracking-tight"
            >
              KARMVEER
            </motion.h1>
            <motion.p
              custom={3}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="font-display text-xl md:text-2xl text-[#F5F1E8]"
            >
              VIDEO EDITOR &amp; MOTION DESIGNER
            </motion.p>
            <motion.p
              custom={4}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-sm md:text-base font-semibold tracking-[.12em] text-[#AAA49A]"
            >
              HIGH-RETENTION CONTENT &amp; PERFORMANCE ADS
            </motion.p>
            <motion.p
              custom={5}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-xs md:text-sm tracking-[.14em] text-[#AAA49A]"
            >
              FOR AI, SAAS &amp; PERSONAL BRANDS
            </motion.p>
            <motion.p
              custom={6}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="max-w-xl text-base md:text-lg leading-8 text-[#AAA49A]"
            >
              I turn raw footage, ideas and products into engaging content built to capture attention, hold viewers and drive action.
            </motion.p>
            <motion.div
              custom={7}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/works"
                className="group rounded-full bg-[#F5F1E8] px-7 py-3.5 text-sm font-bold text-[#080808] text-center hover:bg-white transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                VIEW MY WORK
              </Link>
              <Link
                href="/connect"
                className="group rounded-full bg-[#F5F1E8] px-7 py-3.5 text-sm font-bold text-[#080808] text-center hover:bg-white border border-transparent hover:border-[#FF6A00]/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                <span className="inline-flex items-center gap-2">
                  START A PROJECT
                  <motion.span
                    className="inline-block"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </span>
              </Link>
            </motion.div>
            <motion.div
              custom={8}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="flex gap-5 text-sm font-medium text-[#AAA49A]"
            >
              <a
                href="https://www.linkedin.com/in/karmveer-kumar-b5a57b380"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#F5F1E8] transition-colors duration-300"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com/editwithkarmveer"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#F5F1E8] transition-colors duration-300"
              >
                Instagram
              </a>
              <a
                href="https://wa.me/917280084494?text=Hi%20Karmveer%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20video%20editing%20project."
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#F5F1E8] transition-colors duration-300"
              >
                WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
          {['1+ YEAR OF EXPERIENCE','3 CORE SPECIALIZATIONS','AI & SAAS / PERSONAL BRANDS / PERFORMANCE ADS','INDIA + GLOBAL CLIENT FOCUS'].map((item) => (
            <div key={item} className="p-5 md:p-6 border-r last:border-r-0 border-white/10 text-[10px] md:text-xs font-semibold tracking-[.13em] text-[#AAA49A]">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
