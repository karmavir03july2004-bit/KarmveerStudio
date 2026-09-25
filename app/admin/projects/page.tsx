import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getProjects() {
  if (!process.env.DATABASE_URL) {
    console.log('Database not configured')
    return []
  }

  try {
    const projects = await prisma.project.findMany({
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    })
    return projects
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return []
  }
}

export default async function AdminProjectsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-background-50">
      <div className="border-b border-white/10 bg-background-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-white/60 hover:text-white transition-colors">
              ← Dashboard
            </Link>
            <h1 className="font-display text-xl font-bold">Projects</h1>
          </div>
          <Link
            href="/admin/projects/new"
            className="px-4 py-2 bg-white text-background-50 font-medium rounded-lg hover:bg-white/90 transition-colors text-sm"
          >
            + Add Project
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {projects.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-white/40 text-xl font-display mb-4">No projects yet</p>
            <Link
              href="/admin/projects/new"
              className="text-white/60 hover:text-white transition-colors"
            >
              Create your first project →
            </Link>
          </div>
        ) : (
          <div className="bg-background-100 border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-sm font-medium text-white/40">Title</th>
                  <th className="text-left p-4 text-sm font-medium text-white/40">Category</th>
                  <th className="text-left p-4 text-sm font-medium text-white/40">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-white/40">Featured</th>
                  <th className="text-left p-4 text-sm font-medium text-white/40">Order</th>
                  <th className="text-right p-4 text-sm font-medium text-white/40">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {projects.map((project: any) => (
                  <tr key={project.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <p className="font-medium">{project.title}</p>
                      <p className="text-sm text-white/40">{project.slug}</p>
                    </td>
                    <td className="p-4 text-sm text-white/60">{project.category}</td>
                    <td className="p-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          project.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {project.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          project.featured ? 'bg-accent-violet/20 text-accent-violet' : 'bg-white/10 text-white/60'
                        }`}
                      >
                        {project.featured ? 'Featured' : 'No'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-white/60">{project.sortOrder}</td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="text-sm text-white/60 hover:text-white transition-colors mr-4"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
