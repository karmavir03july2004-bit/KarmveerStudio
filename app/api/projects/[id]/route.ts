import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { deleteResource } from '@/lib/cloudinary'
import { normalizeAspectRatio, validateProjectUrl } from '@/lib/video-utils'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { success: false, error: 'Database not configured' },
      { status: 503 }
    )
  }

  try {
    const { id } = await params
    const project = await prisma.project.findUnique({
      where: { id },
    })

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, project })
  } catch (error) {
    console.error('Project fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    if (videoUrl && !validateProjectUrl(videoUrl).valid) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid YouTube, Instagram, Facebook, or Vimeo URL.' },
        { status: 400 }
      )
    }

    const { id } = await params
    const existingProject = await prisma.project.findUnique({
      where: { id },
    })

    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    if (slug && slug !== existingProject.slug) {
      const slugExists = await prisma.project.findUnique({
        where: { slug },
      })

      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'A project with this slug already exists' },
          { status: 409 }
        )
      }
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        title: title ?? existingProject.title,
        slug: slug ?? existingProject.slug,
        category: category ?? existingProject.category,
        description: description ?? existingProject.description,
        thumbnailUrl: thumbnailUrl ?? existingProject.thumbnailUrl,
        videoUrl: videoUrl ?? existingProject.videoUrl,
        aspectRatio: aspectRatio ? normalizeAspectRatio(aspectRatio) : existingProject.aspectRatio || '16:9',
        mediaType: mediaType ?? existingProject.mediaType,
        client: client ?? existingProject.client,
        year: year ? parseInt(year) : existingProject.year,
        software: software ?? existingProject.software,
        challenge: challenge ?? existingProject.challenge,
        solution: solution ?? existingProject.solution,
        result: result ?? existingProject.result,
        featured: featured !== undefined ? featured : existingProject.featured,
        published: published !== undefined ? published : existingProject.published,
        sortOrder: sortOrder !== undefined ? sortOrder : existingProject.sortOrder,
      },
    })

    return NextResponse.json({ success: true, project })
  } catch (error) {
    console.error('Project update error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params
    const project = await prisma.project.findUnique({
      where: { id },
    })

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    if (project.thumbnailUrl) {
      try {
        const publicId = project.thumbnailUrl.split('/').pop()?.split('.')[0]
        if (publicId) {
          await deleteResource(`karmveer-studio/projects/${publicId}`, 'image')
        }
      } catch (error) {
        console.error('Failed to delete thumbnail:', error)
      }
    }

    await prisma.project.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Project deletion error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
