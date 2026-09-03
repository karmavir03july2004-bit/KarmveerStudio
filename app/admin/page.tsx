import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import LogoutButton from '@/components/admin/logout-button'

async function getDashboardStats() {
  if (!process.env.DATABASE_URL) {
    console.log('Database not configured')
    return {
      totalProjects: 0,
      publishedProjects: 0,
      featuredProjects: 0,
      messages: 0,
      testimonials: 0,
      recentProjects: [],
      recentMessages: [],
    }
  }

  try {
    const [totalProjects, publishedProjects, featuredProjects, messages, testimonials] =
      await Promise.all([
        prisma.project.count(),
        prisma.project.count({ where: { published: true } }),
        prisma.project.count({ where: { featured: true } }),
        prisma.message.count(),
        prisma.testimonial.count({ where: { published: true } }),
      ])

    const recentProjects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    })

    const recentMessages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    })

    return {
      totalProjects,
      publishedProjects,
      featuredProjects,
      messages,
      testimonials,
      recentProjects,
      recentMessages,
    }
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error)
    return {
      totalProjects: 0,
      publishedProjects: 0,
      featuredProjects: 0,
      messages: 0,
      testimonials: 0,
      recentProjects: [],
      recentMessages: [],
    }
  }
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  const stats = await getDashboardStats()

  return (
    <div className="min-h-screen bg-background-50">
      <div className="border-b border-white/10 bg-background-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-white/60 text-sm">{session.user.email}</span>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-6 bg-background-100 border border-white/10 rounded-lg">
            <p className="text-white/40 text-sm mb-2">Total Projects</p>
            <p className="font-display text-3xl font-bold">{stats.totalProjects}</p>
          </div>
          <div className="p-6 bg-background-100 border border-white/10 rounded-lg">
            <p className="text-white/40 text-sm mb-2">Published</p>
            <p className="font-display text-3xl font-bold">{stats.publishedProjects}</p>
          </div>
          <div className="p-6 bg-background-100 border border-white/10 rounded-lg">
            <p className="text-white/40 text-sm mb-2">Featured</p>
            <p className="font-display text-3xl font-bold">{stats.featuredProjects}</p>
          </div>
          <div className="p-6 bg-background-100 border border-white/10 rounded-lg">
            <p className="text-white/40 text-sm mb-2">Messages</p>
            <p className="font-display text-3xl font-bold">{stats.messages}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold">Recent Projects</h2>
              <Link
                href="/admin/projects"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                View All →
              </Link>
            </div>
            <div className="bg-background-100 border border-white/10 rounded-lg overflow-hidden">
              {stats.recentProjects.length === 0 ? (
                <div className="p-6 text-center text-white/40">No projects yet</div>
              ) : (
                <div className="divide-y divide-white/10">
                  {stats.recentProjects.map((project: any) => (
                    <div key={project.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-white/40">{project.category}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          project.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {project.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold">Recent Messages</h2>
              <Link
                href="/admin/messages"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                View All →
              </Link>
            </div>
            <div className="bg-background-100 border border-white/10 rounded-lg overflow-hidden">
              {stats.recentMessages.length === 0 ? (
                <div className="p-6 text-center text-white/40">No messages yet</div>
              ) : (
                <div className="divide-y divide-white/10">
                  {stats.recentMessages.map((message: any) => (
                    <div key={message.id} className="p-4">
                      <p className="font-medium">{message.name}</p>
                      <p className="text-sm text-white/40">{message.email}</p>
                      <p className="text-sm text-white/60 mt-1 line-clamp-1">{message.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href="/admin/projects/new"
            className="px-6 py-3 bg-white text-background-50 font-medium rounded-lg hover:bg-white/90 transition-colors"
          >
            + Add Project
          </Link>
          <Link
            href="/admin/messages"
            className="px-6 py-3 bg-background-100 border border-white/10 text-white font-medium rounded-lg hover:bg-background-200 transition-colors"
          >
            View Messages
          </Link>
        </div>
      </div>
    </div>
  )
}
