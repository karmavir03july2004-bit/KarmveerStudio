import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import VideoPlayer from '@/components/video/video-player'

const categoryLabels: Record<string, string> = {
  PERSONAL_BRAND: 'Personal Brand',
  AI_SAAS: 'AI / SaaS',
  PERFORMANCE_ADS: 'Performance Ads',
  VIDEO_EDITING: 'Personal Brand',
  MOTION_GRAPHICS: 'AI / SaaS',
  SAAS_ANIMATION: 'AI / SaaS',
  COLOR_GRADING: 'Personal Brand',
}

async function getProject(slug: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
    })

    if (!project || !project.published) {
      return null
    }

    return project
  } catch (error) {
    console.error('Failed to fetch project:', error)
    return null
  }
}

async function getNextProject(currentSlug: string) {
  try {
    const currentProject = await prisma.project.findUnique({
      where: { slug: currentSlug },
    })

    if (!currentProject) return null

    const nextProject = await prisma.project.findFirst({
      where: {
        published: true,
        sortOrder: { gt: currentProject.sortOrder },
      },
      orderBy: { sortOrder: 'asc' },
    })

    if (!nextProject) {
      return await prisma.project.findFirst({
        where: { published: true },
        orderBy: { sortOrder: 'asc' },
      })
    }

    return nextProject
  } catch (error) {
    console.error('Failed to fetch next project:', error)
    return null
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  const nextProject = await getNextProject(slug)

  if (!project) {
    notFound()
  }

  const mediaRatio = project.aspectRatio === '9:16' ? '9 / 16' : '16 / 9'
  const media = project.videoUrl ? (
    <div className="relative overflow-hidden rounded-lg bg-background-200" style={{ aspectRatio: mediaRatio }}>
      <VideoPlayer url={project.videoUrl} title={project.title} className="absolute inset-0" />
    </div>
  ) : project.thumbnailUrl ? (
    <div className="relative overflow-hidden rounded-lg bg-background-200" style={{ aspectRatio: mediaRatio }}>
        <Image
          src={project.thumbnailUrl}
          alt={project.title}
          fill
          className="object-cover"
        />
    </div>
  ) : (
    <div className="flex items-center justify-center rounded-lg bg-background-200" style={{ aspectRatio: mediaRatio }}>
      <span className="text-white/20 text-6xl font-display font-bold">
        {project.title.charAt(0)}
      </span>
    </div>
  )

  return (
    <main className="min-h-screen bg-background-50">
      <Navbar />

      <section className="pt-32 pb-16 px-6">
        <div className="mx-auto" style={{ maxWidth: 'min(1400px, calc(100% - 64px))' }}>
          <div className="mb-8">
            <Link
              href="/works"
              className="inline-flex items-center text-white/60 hover:text-white transition-colors text-sm mb-8"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Works
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="text-accent-violet text-sm font-medium">
                {categoryLabels[project.category] || project.category}
              </span>
              {project.year && (
                <span className="text-white/40 text-sm">{project.year}</span>
              )}
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {project.title}
            </h1>

            {project.client && (
              <p className="text-white/60 text-lg">Client: {project.client}</p>
            )}
          </div>

          <div className="mb-12">
            {media}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">Description</h2>
                <p className="text-white/60 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {project.challenge && (
                <div>
                  <h2 className="font-display text-2xl font-semibold mb-4">The Challenge</h2>
                  <p className="text-white/60 leading-relaxed whitespace-pre-line">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.solution && (
                <div>
                  <h2 className="font-display text-2xl font-semibold mb-4">The Solution</h2>
                  <p className="text-white/60 leading-relaxed whitespace-pre-line">
                    {project.solution}
                  </p>
                </div>
              )}

              {project.result && (
                <div>
                  <h2 className="font-display text-2xl font-semibold mb-4">The Result</h2>
                  <p className="text-white/60 leading-relaxed whitespace-pre-line">
                    {project.result}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-8">
              {project.software && (
                <div>
                  <h3 className="font-medium text-sm text-white/40 mb-2">Software</h3>
                  <p className="text-white">{project.software}</p>
                </div>
              )}

              {project.year && (
                <div>
                  <h3 className="font-medium text-sm text-white/40 mb-2">Year</h3>
                  <p className="text-white">{project.year}</p>
                </div>
              )}

              {project.client && (
                <div>
                  <h3 className="font-medium text-sm text-white/40 mb-2">Client</h3>
                  <p className="text-white">{project.client}</p>
                </div>
              )}
            </div>
          </div>

          {nextProject && (
            <div className="pt-12 border-t border-white/10">
              <Link
                href={`/works/${nextProject.slug}`}
                className="group flex items-center justify-between"
              >
                <div>
                  <p className="text-white/40 text-sm mb-2">NEXT PROJECT</p>
                  <p className="font-display text-2xl font-semibold group-hover:text-white/80 transition-colors">
                    {nextProject.title}
                  </p>
                </div>
                <svg
                  className="w-8 h-8 text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}

          <div className="pt-12 border-t border-white/10">
            <Link
              href="/connect"
              className="inline-flex rounded-full bg-[#F5F1E8] px-8 py-4 text-sm font-bold text-[#080808] hover:bg-white border border-transparent hover:border-[#FF6A00]/30 transition-all hover:scale-[1.02] hover:-translate-y-0.5"
            >
              START A PROJECT →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
