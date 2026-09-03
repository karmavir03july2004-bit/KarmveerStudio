import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

function assertCloudinaryConfigured() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary is not configured')
  }
}

export async function uploadImage(file: File): Promise<{ url: string; publicId: string }> {
  assertCloudinaryConfigured()
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: 'karmveer-studio/projects',
        transformation: [
          { quality: 'auto', fetch_format: 'auto' },
          { width: 1920, crop: 'limit' },
        ],
      },
      (error, result) => {
        if (error || !result) {
          reject(new Error('Failed to upload image'))
          return
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        })
      }
    ).end(buffer)
  })
}

export async function uploadVideo(file: File): Promise<{ url: string; publicId: string }> {
  assertCloudinaryConfigured()
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'video',
        folder: 'karmveer-studio/projects',
        transformation: [
          { quality: 'auto' },
        ],
      },
      (error, result) => {
        if (error || !result) {
          reject(new Error('Failed to upload video'))
          return
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        })
      }
    ).end(buffer)
  })
}

export async function deleteResource(publicId: string, resourceType: 'image' | 'video' = 'image'): Promise<void> {
  assertCloudinaryConfigured()
  await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  })
}
