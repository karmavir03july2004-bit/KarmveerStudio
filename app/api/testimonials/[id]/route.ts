import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name: name ?? undefined,
        role: role ?? undefined,
        company: company ?? undefined,
        message: message ?? undefined,
        avatar: avatar ?? undefined,
        published: published !== undefined ? published : undefined,
        sortOrder: sortOrder !== undefined ? sortOrder : undefined,
      },
    })

    return NextResponse.json({ success: true, testimonial })
  } catch (error) {
    console.error('Testimonial update error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update testimonial' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    await prisma.testimonial.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Testimonial deletion error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete testimonial' },
      { status: 500 }
    )
  }
}
