import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendNewMessageNotification } from '@/lib/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!process.env.DATABASE_URL?.trim()) {
      return NextResponse.json(
        { success: true, messages: [], warning: 'Database not configured' },
        { status: 200 }
      )
    }

    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, messages })
  } catch (error) {
    console.error('Messages fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, projectType, budget, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name must be at least 2 characters' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 10 characters' },
        { status: 400 }
      )
    }

    // Check if database is configured BEFORE attempting Prisma operations
    if (!process.env.DATABASE_URL?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Database not configured. Please try again later.' },
        { status: 503 }
      )
    }

    let newMessage
    try {
      newMessage = await prisma.message.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          projectType: projectType?.trim() || null,
          budget: budget?.trim() || null,
          message: message.trim(),
          status: 'NEW',
        },
      })
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { success: false, error: 'Unable to save your message. Please try again.' },
        { status: 503 }
      )
    }

    // Send email notification (non-blocking)
    sendNewMessageNotification({
      name: newMessage.name,
      email: newMessage.email,
      projectType: newMessage.projectType,
      budget: newMessage.budget,
      message: newMessage.message,
    }).catch((emailError) => {
      console.error('Failed to send email notification:', emailError)
      // Don't fail the request if email fails
    })

    return NextResponse.json({ success: true, message: newMessage })
  } catch (error) {
    console.error('Message creation error:', error)
    
    // Check if it's a database connection error
    if (error instanceof Error && error.message.includes('DATABASE_URL')) {
      return NextResponse.json(
        { success: false, error: 'Database not configured. Please contact the administrator.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
