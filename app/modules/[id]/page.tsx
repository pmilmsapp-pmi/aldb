// // 'use client'

// // import { useEffect, useState } from 'react'
// // import Link from 'next/link'
// // import { useParams } from 'next/navigation'
// // import { supabase } from '@/lib/supabase'
// // import AuthGuard from '@/components/AuthGuard'
// // import HeaderPMI from '@/components/HeaderPMI'

// // type Module = {
// //   id: string
// //   title: string
// //   category: string
// //   description: string | null
// // }

// // type Content = {
// //   id: string
// //   type: string
// //   title: string
// //   content: string | null
// //   media_url: string | null
// //   level: string
// // }

// // export default function ModuleDetailPage() {
// //   const params = useParams<{ id: string }>()
// //   const moduleId = params?.id

// //   const [mod, setMod] = useState<Module | null>(null)
// //   const [contents, setContents] = useState<Content[]>([])
// //   const [loading, setLoading] = useState(true)
// //   const [errorMsg, setErrorMsg] = useState('')

// //   useEffect(() => {
// //     const load = async () => {
// //       if (!moduleId) return

// //       setLoading(true)
// //       setErrorMsg('')

// //       const { data: m, error: errM } = await supabase
// //         .from('learning_modules')
// //         .select('id,title,category,description')
// //         .eq('id', moduleId)
// //         .single()

// //       if (errM) {
// //         setErrorMsg(errM.message)
// //         setLoading(false)
// //         return
// //       }

// //       const { data: c, error: errC } = await supabase
// //         .from('learning_contents')
// //         .select('id,type,title,content,media_url,level')
// //         .eq('module_id', moduleId)
// //         .order('created_at', { ascending: true })

// //       if (errC) {
// //         setErrorMsg(errC.message)
// //       }

// //       setMod(m as Module)
// //       setContents((c ?? []) as Content[])
// //       setLoading(false)
// //     }

// //     load()
// //   }, [moduleId])

// //   return (
// //     <AuthGuard>
// //       <HeaderPMI />

// //       <main className="max-w-6xl mx-auto px-4 py-6">
// //         <Link
// //           href="/modules"
// //           className="text-sm text-red-600 hover:underline"
// //         >
// //           ← Kembali ke daftar modul
// //         </Link>

// //         {loading && <p className="text-gray-500 mt-4">Memuat...</p>}
// //         {errorMsg && <p className="text-red-600 text-sm mt-4">{errorMsg}</p>}

// //         {mod && (
// //           <div className="mt-4">
// //             <div className="text-xs text-red-600 font-semibold">
// //               {mod.category}
// //             </div>
// //             <h1 className="text-2xl font-bold text-gray-900">
// //               {mod.title}
// //             </h1>
// //             {mod.description && (
// //               <p className="text-gray-700 mt-2">{mod.description}</p>
// //             )}

// //             <h2 className="text-lg font-bold mt-6 mb-3 text-red-600">
// //               Konten Pembelajaran
// //             </h2>

// //             <div className="space-y-4">
// //               {contents.map((x) => (
// //                 <div key={x.id} className="border rounded-lg p-4 bg-white">
// //                   <div className="flex items-center justify-between gap-3">
// //                     <div className="font-semibold text-gray-900">
// //                       {x.title}
// //                     </div>
// //                     <div className="text-xs text-gray-500">
// //                       {x.type} • {x.level}
// //                     </div>
// //                   </div>

// //                   {x.content && (
// //                     <p className="text-gray-700 mt-2 whitespace-pre-line">
// //                       {x.content}
// //                     </p>
// //                   )}

// //                   {x.media_url && (
// //                     <a
// //                       href={x.media_url}
// //                       target="_blank"
// //                       rel="noreferrer"
// //                       className="inline-block mt-3 text-sm text-red-600 hover:underline"
// //                     >
// //                       Buka media
// //                     </a>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>

// //             {contents.length === 0 && (
// //               <p className="text-gray-500 mt-4">
// //                 Konten belum tersedia untuk modul ini.
// //               </p>
// //             )}
// //           </div>
// //         )}
// //       </main>
// //     </AuthGuard>
// //   )
// // }
// 'use client'

// import { useEffect, useState } from 'react'
// import Link from 'next/link'
// import { useParams } from 'next/navigation'
// import { supabase } from '@/lib/supabase'
// import AuthGuard from '@/components/AuthGuard'
// import HeaderPMI from '@/components/HeaderPMI'
// import { createSignedMediaUrl } from '@/lib/storage'
// import Image from 'next/image'

// type Module = {
//   id: string
//   title: string
//   category: string
//   description: string | null
// }

// type Content = {
//   id: string
//   type: string
//   title: string
//   content: string | null
//   media_url: string | null
//   level: string

//   // ✅ Tambahan C3 (Supabase Storage)
//   storage_bucket: string | null
//   storage_path: string | null
// }

// export default function ModuleDetailPage() {
//   const params = useParams<{ id: string }>()
//   const moduleId = params?.id

//   const [mod, setMod] = useState<Module | null>(null)
//   const [contents, setContents] = useState<Content[]>([])
//   const [loading, setLoading] = useState(true)
//   const [errorMsg, setErrorMsg] = useState('')

//   useEffect(() => {
//     const load = async () => {
//       if (!moduleId) return

//       setLoading(true)
//       setErrorMsg('')

//       const { data: m, error: errM } = await supabase
//         .from('learning_modules')
//         .select('id,title,category,description')
//         .eq('id', moduleId)
//         .single()

//       if (errM) {
//         setErrorMsg(errM.message)
//         setLoading(false)
//         return
//       }

//       // ✅ Tambahan: ambil storage_bucket & storage_path untuk C3
//       const { data: c, error: errC } = await supabase
//         .from('learning_contents')
//         .select('id,type,title,content,media_url,level,storage_bucket,storage_path')
//         .eq('module_id', moduleId)
//         .order('created_at', { ascending: true })

//       if (errC) {
//         setErrorMsg(errC.message)
//       }

//       setMod(m as Module)
//       setContents((c ?? []) as Content[])
//       setLoading(false)
//     }

//     load()
//   }, [moduleId])

//   return (
//     <AuthGuard>
//       <HeaderPMI />

//       <main className="max-w-6xl mx-auto px-4 py-6">
//         <Link href="/modules" className="text-sm text-red-600 hover:underline">
//           ← Kembali ke daftar modul
//         </Link>

//         {loading && <p className="text-gray-500 mt-4">Memuat...</p>}
//         {errorMsg && <p className="text-red-600 text-sm mt-4">{errorMsg}</p>}

//         {mod && (
//           <div className="mt-4">
//             <div className="text-xs text-red-600 font-semibold">{mod.category}</div>
//             <h1 className="text-2xl font-bold text-gray-900">{mod.title}</h1>

//             {mod.description && <p className="text-gray-700 mt-2">{mod.description}</p>}

//             <h2 className="text-lg font-bold mt-6 mb-3 text-red-600">
//               Konten Pembelajaran
//             </h2>

//             <div className="space-y-4">
//               {contents.map((x) => (
//                 <div key={x.id} className="border rounded-lg p-4 bg-white">
//                   <div className="flex items-center justify-between gap-3">
//                     <div className="font-semibold text-gray-900">{x.title}</div>
//                     <div className="text-xs text-gray-500">
//                       {x.type} • {x.level}
//                     </div>
//                   </div>

//                   {x.content && (
//                     <p className="text-gray-700 mt-2 whitespace-pre-line">{x.content}</p>
//                   )}

//                   {/* ✅ Yang lama tetap ada: link media_url */}
//                   {x.media_url && (
//                     <a
//                       href={x.media_url}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="inline-block mt-3 text-sm text-red-600 hover:underline"
//                     >
//                       Buka media
//                     </a>
//                   )}

//                   {/* ✅ Tambahan C3: render media dari Supabase Storage (Signed URL) */}
//                   {x.storage_bucket && x.storage_path && (
//                     <div className="mt-3">
//                       <MediaRenderer
//                         bucket={x.storage_bucket}
//                         path={x.storage_path}
//                         type={x.type}
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {contents.length === 0 && (
//               <p className="text-gray-500 mt-4">Konten belum tersedia untuk modul ini.</p>
//             )}
//           </div>
//         )}
//       </main>
//     </AuthGuard>
//   )
// }

// /**
//  * ✅ Komponen tambahan C3:
//  * - Membuat Signed URL dari Supabase Storage (bucket private)
//  * - Menampilkan video/audio/image sesuai type
//  *
//  * Catatan:
//  * - `type` Anda boleh 'video'/'audio'/'image'/'infographic' atau yang lain.
//  * - Jika type tidak cocok video/audio, default ditampilkan sebagai image.
//  */
// function MediaRenderer(props: { bucket: string; path: string; type: string }) {
//   const { bucket, path, type } = props

//   const [url, setUrl] = useState<string>('')
//   const [err, setErr] = useState<string>('')

//   useEffect(() => {
//     const run = async () => {
//       try {
//         setErr('')
//         const signed = await createSignedMediaUrl({
//           bucket,
//           path,
//           expiresInSeconds: 3600,
//         })
//         setUrl(signed)
//       } catch (e: unknown) {
//         setErr((e as Error)?.message ?? 'Gagal memuat media')
//       }
//     }

//     run()
//   }, [bucket, path])

//   if (err) return <p className="text-sm text-red-600">{err}</p>
//   if (!url) return <p className="text-sm text-gray-500">Memuat media...</p>

//   // Video
//   if (type === 'video') {
//     return (
//       <video
//         src={url}
//         controls
//         className="w-full rounded-lg border"
//       />
//     )
//   }

//   // Audio
//   if (type === 'audio') {
//     return <audio src={url} controls className="w-full" />
//   }

//   // Default: image/infographic
//   return (
//     <div className="relative w-full h-64 rounded-lg border overflow-hidden">
//       <Image
//         src={url}
//         alt="Media pembelajaran"
//         fill
//         className="object-cover"
//       />
//     </div>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import AuthGuard from '@/components/AuthGuard'
import HeaderPMI from '@/components/HeaderPMI'
import { createSignedMediaUrl } from '@/lib/storage'
import Image from 'next/image'

type Module = {
  id: string
  title: string
  category: string
  description: string | null
}

type Content = {
  id: string
  type: string
  title: string
  content: string | null
  media_url: string | null
  level: string
  storage_bucket: string | null
  storage_path: string | null
}

export default function ModuleDetailPage() {
  const params = useParams<{ id: string }>()
  const moduleId = params?.id

  const [mod, setMod] = useState<Module | null>(null)
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const load = async () => {
      if (!moduleId) return

      setLoading(true)
      setErrorMsg('')

      const { data: m, error: errM } = await supabase
        .from('learning_modules')
        .select('id,title,category,description')
        .eq('id', moduleId)
        .single()

      if (errM) {
        setErrorMsg(errM.message)
        setLoading(false)
        return
      }

      const { data: c, error: errC } = await supabase
        .from('learning_contents')
        .select('id,type,title,content,media_url,level,storage_bucket,storage_path')
        .eq('module_id', moduleId)
        .order('created_at', { ascending: true })

      if (errC) {
        setErrorMsg(errC.message)
      }

      setMod(m as Module)
      setContents((c ?? []) as Content[])
      setLoading(false)
    }

    void load()
  }, [moduleId])

  return (
    <AuthGuard>
      <HeaderPMI />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Link href="/modules" className="text-sm text-red-600 hover:underline">
          ← Kembali ke daftar modul
        </Link>

        {loading && <p className="text-gray-500 mt-4">Memuat...</p>}
        {errorMsg && <p className="text-red-600 text-sm mt-4">{errorMsg}</p>}

        {mod && (
          <div className="mt-4">
            <div className="text-xs text-red-600 font-semibold">{mod.category}</div>
            <h1 className="text-2xl font-bold text-gray-900">{mod.title}</h1>

            {mod.description && <p className="text-gray-700 mt-2">{mod.description}</p>}

            <h2 className="text-lg font-bold mt-6 mb-3 text-red-600">
              Konten Pembelajaran
            </h2>

            <div className="space-y-4">
              {contents.map((x) => (
                <div key={x.id} className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex items-center justify-between gap-3 border-b pb-3 mb-3">
                    <div className="font-bold text-gray-900 text-lg">{x.title}</div>
                    <div className="text-xs text-gray-500 font-medium uppercase px-2 py-1 bg-gray-100 rounded-lg">
                      {x.type} • {x.level}
                    </div>
                  </div>

                  {/* TEKS KONTEN */}
                  {x.content && (
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-4">
                      {x.content}
                    </p>
                  )}

                  {/* MEDIA CLOUDINARY (Jika ada media_url langsung dan bukan dari storage lama) */}
                  {x.media_url && !x.storage_bucket && (
                    <div className="mt-4 p-3 bg-gray-50 border border-gray-100 rounded-xl">
                      {x.type === 'video' && (
                        <video
                          controls
                          autoPlay    /* FITUR: Putar otomatis */
                          muted       /* SYARAT: Wajib muted agar autoplay jalan */
                          playsInline /* SYARAT: Untuk optimasi mobile iOS */
                          className="w-full rounded-lg max-h-87.5 bg-black shadow-inner"
                          src={x.media_url}
                        >
                          Browser Anda tidak mendukung tag video.
                        </video>
                      )}

                      {x.type === 'infographic' && (
                        <div className="relative w-full h-auto">
                          <Image
                            src={x.media_url}
                            alt={x.title}
                            width={800}
                            height={450}
                            className="rounded-lg max-h-100 object-contain bg-gray-200"
                            unoptimized
                          />
                        </div>
                      )}

                      {x.type === 'audio' && (
                        <audio controls className="w-full mt-2" src={x.media_url} />
                      )}

                      {x.type !== 'video' && x.type !== 'infographic' && x.type !== 'audio' && (
                        <a
                          href={x.media_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block mt-2 text-sm text-blue-600 font-semibold hover:underline"
                        >
                          Lihat Lampiran Media ↗
                        </a>
                      )}
                    </div>
                  )}

                  {/* MEDIA SUPABASE LEGACY (Jika masih ada data lama dari Supabase Storage) */}
                  {x.storage_bucket && x.storage_path && (
                    <div className="mt-3">
                      <MediaRenderer
                        bucket={x.storage_bucket}
                        path={x.storage_path}
                        type={x.type}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {contents.length === 0 && (
              <p className="text-gray-500 mt-4 italic">Konten belum tersedia untuk modul ini.</p>
            )}
          </div>
        )}
      </main>
    </AuthGuard>
  )
}

/**
 * Komponen rendering untuk Supabase Storage (Legacy Data).
 * Sudah disesuaikan juga agar videonya otomatis autoplay.
 */
function MediaRenderer(props: { bucket: string; path: string; type: string }) {
  const { bucket, path, type } = props

  const [url, setUrl] = useState<string>('')
  const [err, setErr] = useState<string>('')

  useEffect(() => {
    const run = async () => {
      try {
        setErr('')
        const signed = await createSignedMediaUrl({
          bucket,
          path,
          expiresInSeconds: 3600,
        })
        setUrl(signed)
      } catch (e: unknown) {
        setErr((e as Error)?.message ?? 'Gagal memuat media')
      }
    }

    void run()
  }, [bucket, path])

  if (err) return <p className="text-sm text-red-600">{err}</p>
  if (!url) return <p className="text-sm text-gray-500 animate-pulse">Memuat media...</p>

  if (type === 'video') {
    return (
      <video
        src={url}
        controls
        autoPlay    /* FITUR: Putar otomatis */
        muted       /* SYARAT: Wajib muted agar autoplay jalan */
        playsInline /* SYARAT: Untuk optimasi mobile iOS */
        className="w-full rounded-lg max-h-87.5 bg-black"
      />
    )
  }

  if (type === 'audio') {
    return <audio src={url} controls className="w-full" />
  }

  // Default: image/infographic
  return (
    <div className="relative w-full h-auto">
      <Image
        src={url}
        alt="Media pembelajaran"
        width={800}
        height={450}
        className="rounded-lg max-h-100 object-contain bg-gray-200"
        unoptimized
      />
    </div>
  )
}