'use client'
import { useEffect, useState } from 'react'
import Navbar from '@/components/navbar/navbar'
import ProjectCard from '@/components/projects/project-card'
import Footer from '@/components/footer/footer'

const cats = [
  ['ALL', 'ALL'],
  ['PERSONAL_BRAND', 'PERSONAL BRAND'],
  ['AI_SAAS', 'AI / SAAS'],
  ['PERFORMANCE_ADS', 'PERFORMANCE ADS']
]

export default function WorksPage() {
  const [cat, setCat] = useState('ALL')
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/projects?published=true')
      .then(r => r.json())
      .then(d => d.success && setProjects(d.projects || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const shown = cat === 'ALL' ? projects : projects.filter(p => p.category === cat)

  return (
    <main className="min-h-screen bg-[#080808]">
      <Navbar />
      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto" style={{ maxWidth: 'min(1400px, calc(100% - 64px))' }}>
          <p className="section-kicker">PORTFOLIO</p>
          <h1 className="section-title">SELECTED WORK</h1>
          <p className="text-[#AAA49A] max-w-2xl mt-5">
            A selection of edits, product stories and performance creatives built for attention.
          </p>
          <div className="flex flex-wrap gap-2 mt-9">
            {cats.map(([v, l]) => (
              <button
                key={v}
                onClick={() => setCat(v)}
                className={`rounded-full px-4 py-2 text-xs font-bold tracking-wide border transition-colors ${
                  cat === v
                    ? 'bg-[#F5F1E8] text-[#080808] border-[#F5F1E8]'
                    : 'border-white/10 text-[#AAA49A] hover:text-[#F5F1E8]'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          {loading ? (
            <div className="py-24 text-center text-[#AAA49A]">Loading work…</div>
          ) : shown.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
              {shown.map(p => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-white/10 p-12 text-center text-[#AAA49A]">
              No published projects in this category yet.
            </div>
          )}
          <div className="mt-14 text-center">
            <a
              href="/connect"
              className="inline-flex rounded-full bg-[#F5F1E8] px-7 py-3.5 font-bold text-[#080808] hover:bg-white border border-transparent hover:border-[#FF6A00]/30 transition-all hover:scale-[1.02] hover:-translate-y-0.5"
            >
              START A PROJECT →
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
