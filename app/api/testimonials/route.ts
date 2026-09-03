import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const published = searchParams.get('published')
    const session = published === 'true' ? null : await getServerSession(authOptions)

    const where: { published?: boolean } = session ? {} : { published: true }

    if (published === 'true') {
      where.published = true
    }

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json({ success: true, testimonials })
  } catch (error) {
    console.error('Testimonials fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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
      name,
      role,
      company,
      message,
      avatar,
      published,
      sortOrder,
    } = body

    if (!name || !message) {
      return NextResponse.json(
        { success: false, error: 'Name and message are required' },
        { status: 400 }
      )
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        company,
        message,
        avatar,
        published: published || false,
        sortOrder: sortOrder || 0,
      },
    })

    return NextResponse.json({ success: true, testimonial })
  } catch (error) {
    console.error('Testimonial creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}
