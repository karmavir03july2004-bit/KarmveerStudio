import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/utils'
import { normalizeAspectRatio, validateProjectUrl } from '@/lib/video-utils'

export async function GET(request: NextRequest) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ success: true, projects: [] })
  }

  try {
    const searchParams = request.nextUrl.searchParams
    const featured = searchParams.get('featured')
    const published = searchParams.get('published')
    const category = searchParams.get('category')

    const session = published === 'true' ? null : await getServerSession(authOptions)
    const where: { featured?: boolean; published?: boolean; category?: string } =
      session ? {} : { published: true }

    if (featured === 'true') {
      where.featured = true
    }

    if (published === 'true') {
      where.published = true
    }

    if (category) {
      where.category = category
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json({ success: true, projects })
  } catch (error) {
    console.error('Projects fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { success: false, error: 'Database not configured' },
      { status: 503 }
    )
  }

  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      title,
      slug,
      category,
      description,
      thumbnailUrl,
      videoUrl,
      aspectRatio,
      mediaType,
      client,
      year,
      software,
      challenge,
      solution,
      result,
      featured,
      published,
      sortOrder,
    } = body

    if (!title || !category || !description) {
      return NextResponse.json(
        { success: false, error: 'Title, category, and description are required' },
        { status: 400 }
      )
    }

    if (videoUrl && !validateProjectUrl(videoUrl).valid) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid YouTube, Instagram, Facebook, or Vimeo URL.' },
        { status: 400 }
      )
    }

    const finalSlug = slug || slugify(title)

    const existingProject = await prisma.project.findUnique({
      where: { slug: finalSlug },
    })

    if (existingProject) {
      return NextResponse.json(
        { success: false, error: 'A project with this slug already exists' },
        { status: 409 }
      )
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug: finalSlug,
        category,
        description,
        thumbnailUrl,
        videoUrl,
        aspectRatio: normalizeAspectRatio(aspectRatio),
        mediaType: mediaType || 'video',
        client,
        year: year ? parseInt(year) : null,
        software,
        challenge,
        solution,
        result,
        featured: featured || false,
        published: published || false,
        sortOrder: sortOrder || 0,
      },
    })

    return NextResponse.json({ success: true, project })
  } catch (error) {
    console.error('Project creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
