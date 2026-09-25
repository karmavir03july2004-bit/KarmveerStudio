/**
 * Client-side Cloudinary upload utility for unsigned uploads
 * This uses direct browser-to-Cloudinary upload without exposing API secrets
 * Only requires CLOUDINARY_CLOUD_NAME and an unsigned upload preset
 */

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

export interface UploadResult {
  success: boolean
  url?: string
  publicId?: string
  error?: string
}

/**
 * Upload an image directly to Cloudinary from the browser using unsigned upload
 * @param file - The file to upload
 * @param onProgress - Optional callback for upload progress (0-100)
 * @returns Promise with upload result
 */
export async function uploadImageToCloudinary(
  file: File,
  onProgress?: (progress: number) => void
): Promise<UploadResult> {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    return { success: false, error: 'Cloudinary upload is not configured' }
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      error: 'Invalid image type. Only JPG, PNG, and WEBP are allowed'
    }
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) {
    return {
      success: false,
      error: 'File too large. Maximum size is 10MB'
    }
  }

  return new Promise((resolve) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    formData.append('folder', 'karmveer-studio/projects')

    const xhr = new XMLHttpRequest()

    // Track upload progress
    if (onProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100)
          onProgress(progress)
        }
      })
    }

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText)
          resolve({
            success: true,
            url: response.secure_url,
            publicId: response.public_id
          })
        } catch (error) {
          resolve({
            success: false,
            error: 'Failed to parse upload response'
          })
        }
      } else {
        resolve({
          success: false,
          error: `Upload failed with status ${xhr.status}`
        })
      }
    })

    xhr.addEventListener('error', () => {
      resolve({
        success: false,
        error: 'Network error during upload'
      })
    })

    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`)
    xhr.send(formData)
  })
}
