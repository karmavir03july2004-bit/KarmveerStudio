import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst({
      where: { id: 'default' },
    })

    if (!settings) {
      return NextResponse.json({
        success: true,
        settings: {
          studioName: 'Karmveer Studio',
          ownerName: 'Karmveer Kumar',
          email: '',
          instagram: 'editwithkarmveer',
          availability: 'AVAILABLE FOR SELECTED PROJECTS',
        },
      })
    }

    return NextResponse.json({ success: true, settings })
  } catch (error) {
    console.error('Settings fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
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
      studioName,
      ownerName,
      email,
      instagram,
      availability,
    } = body

    const settings = await prisma.siteSettings.upsert({
      where: { id: 'default' },
      update: {
        studioName,
        ownerName,
        email,
        instagram,
        availability,
      },
      create: {
        id: 'default',
        studioName,
        ownerName,
        email,
        instagram,
        availability,
      },
    })

    return NextResponse.json({ success: true, settings })
  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}
