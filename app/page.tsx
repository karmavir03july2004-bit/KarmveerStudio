import Link from 'next/link'
import Navbar from '@/components/navbar/navbar'
import Hero from '@/components/hero/hero'
import ProjectCard from '@/components/projects/project-card'
import Footer from '@/components/footer/footer'
import ScrollReveal from '@/components/ui/scroll-reveal'
import { prisma } from '@/lib/prisma'

async function getFeaturedProjects() {
  try {
    if (!process.env.DATABASE_URL) return []
    return await prisma.project.findMany({
      where: { featured: true, published: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      take: 3
    })
  } catch (e) {
    console.error(e)
    return []
  }
}

const specializations = [
  [
    '01',
    'AI & SAAS',
    'Product Videos, Explainers, Demos, Motion Graphics',
    'Turn complex products and ideas into clear, engaging visual stories.'
  ],
  [
    '02',
    'PERSONAL BRANDS',
    'Founder Content, Podcasts, LinkedIn, Reels, Shorts',
    'Turn expertise and ideas into high-retention content people want to watch.'
  ],
  [
    '03',
    'PERFORMANCE ADS',
    'UGC, Product Ads, Meta Ads, Creative Variations',
    'Create scroll-stopping creatives built around hooks, storytelling and action.'
  ]
]

const attentionItems = [
  ['HOOK', 'Give viewers a reason to stop scrolling.'],
  ['RETENTION', 'Keep the story moving with pacing, visuals and sound.'],
  ['STORY', 'Make every cut support the message.'],
  ['ACTION', 'Create content that moves viewers toward the next step.']
]

export default async function HomePage() {
  const projects = await getFeaturedProjects()

  return (
    <main className="min-h-screen bg-[#080808]">
      <Navbar />
      <Hero />

      {/* WHAT I SPECIALIZE IN */}
      <section className="py-24 md:py-28 px-6">
        <div className="mx-auto" style={{ maxWidth: 'min(1400px, calc(100% - 64px))' }}>
          <ScrollReveal>
            <p className="section-kicker">SPECIALIZATION</p>
            <h2 className="section-title">WHAT I SPECIALIZE IN</h2>
          </ScrollReveal>
          <div className="grid lg:grid-cols-3 gap-4 mt-10">
            {specializations.map(([n, t, sub, d], index) => (
              <ScrollReveal key={n} delay={index * 0.1}>
                <div
                  className="group rounded-2xl border border-white/10 bg-[#161616] p-7 md:p-8 hover:border-[#FF6A00]/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="text-[#FF6A00] text-xs font-bold group-hover:scale-105 transition-transform duration-300 inline-block">{n}</span>
                  <h3 className="font-display text-2xl font-bold mt-7">{t}</h3>
                  <p className="text-xs uppercase tracking-[.12em] text-[#AAA49A] mt-3">
                    {sub}
                  </p>
                  <p className="text-[#AAA49A] leading-7 mt-6">{d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="py-24 md:py-28 px-6 bg-[#111111]">
        <div className="mx-auto" style={{ maxWidth: 'min(1400px, calc(100% - 64px))' }}>
          <ScrollReveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="section-kicker">PORTFOLIO</p>
                <h2 className="section-title">SELECTED WORK</h2>
              </div>
              <Link
                href="/works"
                className="hidden sm:block text-sm font-bold tracking-wide text-[#AAA49A] hover:text-[#F5F1E8] transition-colors"
              >
                VIEW ALL WORK →
              </Link>
            </div>
          </ScrollReveal>
          {projects.length ? (
            <div className="grid md:grid-cols-3 gap-7 mt-10">
              {projects.map((p, index) => (
                <ScrollReveal key={p.id} delay={index * 0.1}>
                  <ProjectCard project={p} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal>
              <div className="mt-10 rounded-2xl border border-dashed border-white/10 p-12 text-center text-[#AAA49A]">
                Featured projects will appear here from your existing portfolio
                database.
              </div>
            </ScrollReveal>
          )}
          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex justify-center sm:justify-start">
              <Link
                href="/connect"
                className="inline-flex rounded-full bg-[#F5F1E8] px-6 py-3 text-sm font-bold text-[#080808] hover:bg-white border border-transparent hover:border-[#FF6A00]/30 transition-all hover:scale-[1.02] hover:-translate-y-0.5"
              >
                START A PROJECT →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* BUILT FOR ATTENTION */}
      <section className="py-24 md:py-28 px-6">
        <div className="mx-auto grid md:grid-cols-[1fr_1.6fr] gap-10" style={{ maxWidth: 'min(1400px, calc(100% - 64px))' }}>
          <ScrollReveal>
            <div>
              <p className="section-kicker">WHY THE EDIT WORKS</p>
              <h2 className="section-title">BUILT FOR ATTENTION.</h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {attentionItems.map(([title, desc], index) => (
              <ScrollReveal key={title} delay={index * 0.1}>
                <div className="border-l-2 border-[#FF6A00] pl-5 py-2">
                  <h4 className="font-display text-lg font-bold text-[#F5F1E8]">
                    {title}
                  </h4>
                  <p className="text-sm text-[#AAA49A] mt-1">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 md:py-28 px-6 bg-[#111111]">
        <div className="mx-auto text-center" style={{ maxWidth: 'min(1400px, calc(100% - 64px))' }}>
          <ScrollReveal>
            <p className="section-kicker">LET&apos;S CREATE</p>
            <h2 className="section-title">READY TO WORK TOGETHER?</h2>
            <p className="mt-6 text-lg text-[#AAA49A] max-w-2xl mx-auto">
              Tell me what you&apos;re building.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/connect"
                className="rounded-full bg-[#F5F1E8] px-8 py-4 text-sm font-bold text-[#080808] hover:bg-white border border-transparent hover:border-[#FF6A00]/30 transition-all hover:scale-[1.02] hover:-translate-y-0.5"
              >
                START A PROJECT →
              </Link>
              <Link
                href="/works"
                className="rounded-full border border-white/15 px-8 py-4 text-sm font-bold text-[#F5F1E8] hover:border-[#FF6A00] hover:text-[#FF8533] transition-all hover:scale-[1.02] hover:-translate-y-0.5"
              >
                VIEW MY WORK
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
