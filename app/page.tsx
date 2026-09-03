import Navbar from '@/components/navbar/navbar'
import Hero from '@/components/hero/hero'
import ProjectCard from '@/components/projects/project-card'
import Services from '@/components/services/services'
import Process from '@/components/process/process'
import Footer from '@/components/footer/footer'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getFeaturedProjects() {
  try {
    if (!process.env.DATABASE_URL) {
      return []
    }
    const projects = await prisma.project.findMany({
      where: {
        featured: true,
        published: true,
      },
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' },
      ],
      take: 6,
    })
    return projects
  } catch (error) {
    console.error('Failed to fetch featured projects:', error)
    return []
  }
}

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects()

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      <section className="py-32 bg-gradient-to-b from-background-50 via-background-100 to-background-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold">
              FEATURED WORK
            </h2>
            <Link
              href="/works"
              className="text-white/60 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              VIEW ALL WORK →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project: any) => (
                <div key={project.id}>
                  <ProjectCard project={project} />
                </div>
              ))
            ) : (
              <div className="col-span-12 text-center py-24">
                <p className="text-white/40 text-xl font-display">
                  YOUR NEXT GREAT PROJECT BELONGS HERE.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Services />
      <Process />

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-cta animate-gradient-x" />
        <div className="absolute inset-0 bg-gradient-premium" />
        <div className="absolute inset-0 noise-overlay" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            HAVE A PROJECT IN MIND?
          </h2>
          <p className="text-white/60 text-lg mb-12">
            Let&apos;s turn your idea into something worth watching.
          </p>
          <Link
            href="/connect"
            className="inline-block px-10 py-4 bg-white text-background-50 font-semibold rounded-full hover:bg-white/90 transition-all duration-300 premium-glow"
          >
            LET&apos;S TALK →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
