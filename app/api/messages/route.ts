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
    const { name, email, company, projectType, referenceLink, message } = body
    if (!name || !email || !message) return NextResponse.json({ success:false, error:'Name, email, and message are required' }, { status:400 })
    if (name.trim().length < 2) return NextResponse.json({ success:false, error:'Name must be at least 2 characters' }, { status:400 })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ success:false, error:'Invalid email address' }, { status:400 })
    if (message.trim().length < 10) return NextResponse.json({ success:false, error:'Message must be at least 10 characters' }, { status:400 })
    const emailResult = await sendNewMessageNotification({ name:name.trim(), email:email.trim(), company:company?.trim()||null, projectType:projectType?.trim()||null, referenceLink:referenceLink?.trim()||null, message:message.trim() })
    if (!emailResult.success) return NextResponse.json({ success:false, error:'Something went wrong. Please try again or contact me directly on WhatsApp.' }, { status:503 })
    if (process.env.DATABASE_URL?.trim()) {
      try { await prisma.message.create({ data:{ name:name.trim(), email:email.trim(), projectType:projectType?.trim()||null, message:message.trim(), status:'NEW' } }) }
      catch (dbError) { console.error('Database error after successful email:', dbError) }
    }
    return NextResponse.json({ success:true })
  } catch (error) {
    console.error('Message creation error:', error)
    return NextResponse.json({ success:false, error:'Something went wrong. Please try again or contact me directly on WhatsApp.' }, { status:500 })
  }
}
