import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { uploadImage, uploadVideo } from '@/lib/cloudinary'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file')
    const type = formData.get('type')

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    if (type !== 'image' && type !== 'video') {
      return NextResponse.json(
        { success: false, error: 'Invalid type. Must be image or video' },
        { status: 400 }
      )
    }

    const maxSize = type === 'image' ? 10 * 1024 * 1024 : 100 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: `File too large. Maximum size is ${type === 'image' ? '10MB' : '100MB'}` },
        { status: 400 }
      )
    }

    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime']

    if (type === 'image' && !allowedImageTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid image type. Only JPG, PNG, and WEBP are allowed' },
        { status: 400 }
      )
    }

    if (type === 'video' && !allowedVideoTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid video type. Only MP4, WEBM, and MOV are allowed' },
        { status: 400 }
      )
    }

    let result
    if (type === 'image') {
      result = await uploadImage(file)
    } else {
      result = await uploadVideo(file)
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      publicId: result.publicId,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
