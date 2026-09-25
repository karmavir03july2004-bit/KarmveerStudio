'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/works', label: 'WORK' },
  { href: '/services', label: 'SERVICES' },
  { href: '/reviews', label: 'REVIEWS' },
  { href: '/connect', label: 'CONNECT' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav 
      initial={{ y: -30, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      className="fixed top-0 inset-x-0 z-50 px-3 pt-3"
    >
      <div
        className={cn(
          'mx-auto rounded-2xl border transition-all duration-300',
          scrolled
            ? 'bg-[#111111]/95 backdrop-blur-xl shadow-2xl border-white/15'
            : 'bg-[#111111]/90 backdrop-blur-lg border-white/10'
        )}
        style={{ maxWidth: 'min(1400px, calc(100% - 64px))' }}
      >
        <div className="h-16 px-5 md:px-7 flex items-center justify-between">
          <Link 
            href="/" 
            className="font-display font-bold tracking-tight text-base md:text-lg text-[#F5F1E8] hover:text-white transition-colors"
          >
            KARMVEER STUDIO
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={cn(
                  'text-xs font-semibold tracking-[0.14em] transition-all relative group',
                  pathname === link.href ? 'text-[#F5F1E8]' : 'text-[#AAA49A] hover:text-[#F5F1E8]'
                )}
              >
                {link.label}
                <span className={cn(
                  'absolute -bottom-2 left-0 w-0 h-0.5 bg-[#FF6A00] transition-all group-hover:w-full',
                  pathname === link.href ? 'w-full' : 'w-0'
                )} />
              </Link>
            ))}
            <Link 
              href="/connect" 
              className="rounded-full bg-[#F5F1E8] px-4 py-2 text-xs font-bold tracking-wide text-[#080808] hover:bg-white border border-transparent hover:border-[#FF6A00]/30 transition-all hover:scale-[1.02] hover:-translate-y-0.5"
            >
              START A PROJECT →
            </Link>
          </div>
          <button 
            aria-label="Toggle menu" 
            onClick={() => setOpen(!open)} 
            className="md:hidden text-[#F5F1E8] p-2 hover:text-white transition-colors"
          >
            <span className="block w-6 h-px bg-current mb-1.5 transition-all group-hover:translate-x-1"/>
            <span className="block w-6 h-px bg-current mb-1.5 transition-all group-hover:translate-x-1"/>
            <span className="block w-6 h-px bg-current transition-all group-hover:translate-x-1"/>
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: 'auto', opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }} 
              className="md:hidden border-t border-white/10 px-5 py-5"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => setOpen(false)} 
                    className="text-sm tracking-[0.14em] text-[#AAA49A] hover:text-[#F5F1E8] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link 
                  href="/connect" 
                  onClick={() => setOpen(false)} 
                  className="inline-flex w-fit rounded-full bg-[#F5F1E8] px-4 py-2 text-xs font-bold text-[#080808] hover:bg-white border border-transparent hover:border-[#FF6A00]/30 transition-colors"
                >
                  START A PROJECT →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
