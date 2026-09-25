'use client'
import { useEffect, useState } from 'react'

export default function Testimonials() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/testimonials?published=true')
      .then(r => r.json())
      .then(d => d.success && setItems(d.testimonials || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-24 px-6 bg-[#111111]">
      <div className="mx-auto" style={{ maxWidth: 'min(1400px, calc(100% - 64px))' }}>
        <p className="section-kicker">SOCIAL PROOF</p>
        <h1 className="section-title">CLIENT REVIEWS</h1>
        <p className="text-[#AAA49A] mt-4">
          Real feedback from people I&apos;ve worked with.
        </p>
        {!loading && items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-white/10 p-12 text-center text-[#AAA49A]">
            Reviews will appear here once genuine client feedback is added.
          </div>
        ) : (
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {items.slice(0, 3).map(t => (
              <article
                key={t.id}
                className="rounded-2xl border border-white/10 bg-[#161616] p-7"
              >
                <div className="flex gap-1 text-[#FF6A00] mb-5">
                  {'★'.repeat(Math.max(0, Math.min(5, t.rating || 0)))}
                </div>
                <p className="text-[#F5F1E8] leading-7">&ldquo;{t.message}&rdquo;</p>
                <div className="mt-7 pt-5 border-t border-white/10">
                  <p className="font-bold">{t.name}</p>
                  {t.role || t.company ? (
                    <p className="text-sm text-[#AAA49A] mt-1">
                      {[t.role, t.company].filter(Boolean).join(' · ')}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="mt-12 text-center">
          <a
            href="/connect"
            className="inline-flex rounded-full bg-[#F5F1E8] px-8 py-4 text-sm font-bold text-[#080808] hover:bg-white border border-transparent hover:border-[#FF6A00]/30 transition-all hover:scale-[1.02] hover:-translate-y-0.5"
          >
            START A PROJECT →
          </a>
        </div>
      </div>
    </section>
  )
}
