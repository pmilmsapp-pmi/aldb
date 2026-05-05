import { supabase } from '@/lib/supabase'

export function buildSafeFileName(originalName: string) {
  const cleaned = originalName
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '-')
    .replace(/-+/g, '-')
  const ts = Date.now()
  return `${ts}-${cleaned}`
}

export async function uploadToLearningMedia(params: {
  moduleId: string
  file: File
}) {
  const { moduleId, file } = params

  const bucket = 'learning-media'
  const safeName = buildSafeFileName(file.name)
  const path = `klaten/${moduleId}/${safeName}`

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      upsert: true,
      contentType: file.type || 'application/octet-stream',
    })

  if (error) throw error

  return { bucket, path }
}

export async function createSignedMediaUrl(params: {
  bucket: string
  path: string
  expiresInSeconds?: number
}) {
  const { bucket, path, expiresInSeconds = 60 * 60 } = params
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresInSeconds)

  if (error) throw error
  return data.signedUrl
}