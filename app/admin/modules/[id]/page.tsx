// // 'use client'

// // import { useEffect, useState } from 'react'
// // import Link from 'next/link'
// // import { useParams, useRouter } from 'next/navigation'
// // import { CldUploadWidget } from 'next-cloudinary'
// // import AdminGuard from '@/components/AdminGuard'
// // import HeaderPMI from '@/components/HeaderPMI'
// // import { supabase } from '@/lib/supabase'

// // type ContentRow = {
// //   id: string
// //   title: string
// //   type: string
// //   level: string
// //   content: string | null
// //   is_active: boolean
// //   media_url: string | null
// // }

// // function extractSecureUrl(result: unknown): string | null {
// //   if (!result || typeof result !== 'object') return null
// //   const r = result as { info?: unknown }
// //   if (!r.info || typeof r.info !== 'object') return null
// //   const info = r.info as { secure_url?: unknown }
// //   return typeof info.secure_url === 'string' ? info.secure_url : null
// // }

// // export default function AdminModuleDetailPage() {
// //   const params = useParams()
// //   const router = useRouter()

// //   const moduleId =
// //     typeof params.id === 'string'
// //       ? params.id
// //       : Array.isArray(params.id)
// //       ? params.id[0]
// //       : null

// //   const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''
// //   const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''

// //   const [loading, setLoading] = useState(true)
// //   const [saving, setSaving] = useState(false)
// //   const [errorMsg, setErrorMsg] = useState('')

// //   const [title, setTitle] = useState('')
// //   const [category, setCategory] = useState('')
// //   const [description, setDescription] = useState('')
// //   const [isActive, setIsActive] = useState(true)

// //   const [contents, setContents] = useState<ContentRow[]>([])

// //   useEffect(() => {
// //     if (!moduleId) return

// //     const load = async () => {
// //       setLoading(true)

// //       const { data: m } = await supabase
// //         .from('learning_modules')
// //         .select('title,category,description,is_active')
// //         .eq('id', moduleId)
// //         .single()

// //       const { data: c } = await supabase
// //         .from('learning_contents')
// //         .select('id,title,type,level,content,is_active,media_url')
// //         .eq('module_id', moduleId)
// //         .order('created_at')

// //       if (m) {
// //         setTitle(m.title ?? '')
// //         setCategory(m.category ?? '')
// //         setDescription(m.description ?? '')
// //         setIsActive(!!m.is_active)
// //       }

// //       setContents(c ?? [])
// //       setLoading(false)
// //     }

// //     load()
// //   }, [moduleId])

// //   const save = async () => {
// //     if (!moduleId) return
// //     setSaving(true)

// //     const { error } = await supabase
// //       .from('learning_modules')
// //       .update({
// //         title,
// //         category,
// //         description,
// //         is_active: isActive,
// //       })
// //       .eq('id', moduleId)

// //     setSaving(false)
// //     if (error) setErrorMsg(error.message)
// //   }

// //   const remove = async () => {
// //     if (!moduleId) return
// //     const ok = confirm('Hapus modul ini?')
// //     if (!ok) return

// //     await supabase.from('learning_modules').delete().eq('id', moduleId)
// //     router.push('/admin/modules')
// //   }

// //   const attachMedia = async (contentId: string, url: string) => {
// //     await supabase
// //       .from('learning_contents')
// //       .update({ media_url: url })
// //       .eq('id', contentId)

// //     const { data } = await supabase
// //       .from('learning_contents')
// //       .select('id,title,type,level,content,is_active,media_url')
// //       .eq('module_id', moduleId)

// //     setContents(data ?? [])
// //   }

// //   return (
// //     <AdminGuard>
// //       <HeaderPMI />

// //       <main className="max-w-3xl mx-auto px-4 py-6">
// //         <Link href="/admin/modules" className="text-red-600 underline">
// //           ← Kembali
// //         </Link>

// //         <h1 className="text-2xl font-bold mt-4">Edit Modul</h1>

// //         {errorMsg && <p className="text-red-600 mt-2">{errorMsg}</p>}

// //         {loading ? (
// //           <p className="mt-6">Memuat...</p>
// //         ) : (
// //           <>
// //             <section className="mt-4 bg-white p-4 rounded-xl space-y-3">
// //               <input
// //                 className="w-full border p-2"
// //                 value={title}
// //                 onChange={(e) => setTitle(e.target.value)}
// //                 placeholder="Judul"
// //               />

// //               <input
// //                 className="w-full border p-2"
// //                 value={category}
// //                 onChange={(e) => setCategory(e.target.value)}
// //                 placeholder="Kategori"
// //               />

// //               <textarea
// //                 className="w-full border p-2"
// //                 value={description}
// //                 onChange={(e) => setDescription(e.target.value)}
// //                 placeholder="Deskripsi"
// //               />

// //               <label className="flex gap-2 items-center">
// //                 <input
// //                   type="checkbox"
// //                   checked={isActive}
// //                   onChange={(e) => setIsActive(e.target.checked)}
// //                 />
// //                 Aktif
// //               </label>

// //               <button
// //                 onClick={save}
// //                 disabled={saving}
// //                 className="bg-red-600 text-white px-4 py-2 rounded"
// //               >
// //                 Simpan
// //               </button>

// //               <button
// //                 onClick={remove}
// //                 className="border border-red-600 text-red-600 px-4 py-2 rounded"
// //               >
// //                 Hapus Modul
// //               </button>
// //             </section>

// //             <section className="mt-6 space-y-4">
// //               {contents.map((c) => (
// //                 <div key={c.id} className="border p-4 rounded">
// //                   <b>{c.title}</b>
// //                   <p className="text-sm text-gray-600">
// //                     {c.type} • {c.level}
// //                   </p>

// //                   {c.media_url && (
// //                     <a
// //                       href={c.media_url}
// //                       target="_blank"
// //                       className="text-red-600 underline block mt-2"
// //                     >
// //                       Buka Media
// //                     </a>
// //                   )}

// //                   <CldUploadWidget
// //                     uploadPreset={uploadPreset}
// //                     options={{ cloudName, resourceType: 'auto' }}
// //                     onSuccess={(result: unknown) => {
// //                       const url = extractSecureUrl(result)
// //                       if (url) attachMedia(c.id, url)
// //                     }}
// //                   >
// //                     {({ open }: { open: () => void }) => (
// //                       <button
// //                         onClick={() => open()}
// //                         className="mt-2 text-sm border px-3 py-1 rounded"
// //                       >
// //                         Upload Media
// //                       </button>
// //                     )}
// //                   </CldUploadWidget>
// //                 </div>
// //               ))}
// //             </section>
// //           </>
// //         )}
// //       </main>
// //     </AdminGuard>
// //   )
// // }


// 'use client'

// import { useEffect, useState } from 'react'
// import Link from 'next/link'
// import { useParams, useRouter } from 'next/navigation'
// import { CldUploadWidget } from 'next-cloudinary'
// import AdminGuard from '@/components/AdminGuard'
// import HeaderPMI from '@/components/HeaderPMI'
// import { supabase } from '@/lib/supabase'

// type ContentRow = {
//   id: string
//   title: string
//   type: string
//   level: string
//   content: string | null
//   is_active: boolean
//   media_url: string | null
// }

// function extractSecureUrl(result: unknown): string | null {
//   if (!result || typeof result !== 'object') return null
//   const r = result as { info?: unknown }
//   if (!r.info || typeof r.info !== 'object') return null
//   const info = r.info as { secure_url?: unknown }
//   return typeof info.secure_url === 'string' ? info.secure_url : null
// }

// function getModuleId(params: unknown): string | null {
//   if (!params || typeof params !== 'object') return null
//   const p = params as Record<string, string | string[]>
//   const raw = p.id
//   if (typeof raw === 'string') return raw
//   if (Array.isArray(raw) && raw.length > 0) return raw[0]
//   return null
// }

// export default function AdminModuleDetailPage() {
//   const params = useParams()
//   const router = useRouter()
//   const moduleId = getModuleId(params)

//   const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''
//   const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''

//   const [loading, setLoading] = useState(true)
//   const [saving, setSaving] = useState(false)
//   const [errorMsg, setErrorMsg] = useState('')

//   const [title, setTitle] = useState('')
//   const [category, setCategory] = useState('')
//   const [description, setDescription] = useState('')
//   const [isActive, setIsActive] = useState(true)

//   const [contents, setContents] = useState<ContentRow[]>([])
//   const [uploading, setUploading] = useState(false)
//   const [uploadingContentId, setUploadingContentId] = useState<string | null>(null)

//   useEffect(() => {
//     if (!moduleId) return

//     const load = async () => {
//       setLoading(true)
//       setErrorMsg('')

//       const { data: m, error: errM } = await supabase
//         .from('learning_modules')
//         .select('title,category,description,is_active')
//         .eq('id', moduleId)
//         .single()

//       if (errM) setErrorMsg(errM.message)

//       const { data: c, error: errC } = await supabase
//         .from('learning_contents')
//         .select('id,title,type,level,content,is_active,media_url')
//         .eq('module_id', moduleId)
//         .order('created_at', { ascending: true })

//       if (errC) setErrorMsg(errC.message)

//       if (m) {
//         setTitle(m.title ?? '')
//         setCategory(m.category ?? '')
//         setDescription(m.description ?? '')
//         setIsActive(!!m.is_active)
//       }

//       setContents(c ?? [])
//       setLoading(false)
//     }

//     load()
//   }, [moduleId])

//   const save = async () => {
//     if (!moduleId) return
//     setSaving(true)
//     setErrorMsg('')

//     const { error } = await supabase
//       .from('learning_modules')
//       .update({
//         title: title.trim(),
//         category: category.trim(),
//         description: description.trim() ? description.trim() : null,
//         is_active: isActive,
//       })
//       .eq('id', moduleId)

//     setSaving(false)
//     if (error) setErrorMsg(error.message)
//   }

//   const remove = async () => {
//     if (!moduleId) return
//     const ok = window.confirm('Hapus modul ini?')
//     if (!ok) return

//     const { error } = await supabase.from('learning_modules').delete().eq('id', moduleId)
//     if (error) {
//       setErrorMsg(error.message)
//       return
//     }

//     router.push('/admin/modules')
//   }

//   const attachMedia = async (contentId: string, url: string) => {
//     if (!moduleId) return
//     setUploading(true)
//     setUploadingContentId(contentId)
//     setErrorMsg('')

//     const { error } = await supabase
//       .from('learning_contents')
//       .update({ media_url: url })
//       .eq('id', contentId)

//     if (error) {
//       setErrorMsg(error.message)
//       setUploading(false)
//       setUploadingContentId(null)
//       return
//     }

//     const { data } = await supabase
//       .from('learning_contents')
//       .select('id,title,type,level,content,is_active,media_url')
//       .eq('module_id', moduleId)
//       .order('created_at', { ascending: true })

//     setContents(data ?? [])
//     setUploading(false)
//     setUploadingContentId(null)
//   }

//   return (
//     <AdminGuard>
//       <HeaderPMI />

//       <main className='max-w-3xl mx-auto px-4 py-6'>
//         <Link href='/admin/modules' className='text-red-600 underline'>
//           ← Kembali
//         </Link>

//         <h1 className='text-2xl font-bold mt-4'>Edit Modul</h1>

//         {(!cloudName || !uploadPreset) && (
//           <div className='mt-4 p-4 rounded border border-yellow-200 bg-yellow-50'>
//             <p className='text-yellow-800 text-sm font-semibold'>Cloudinary belum siap</p>
//             <p className='text-yellow-800 text-sm mt-1'>
//               Isi web/.env.local: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME dan NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET, lalu restart.
//             </p>
//           </div>
//         )}

//         {errorMsg && <p className='text-red-600 mt-2'>{errorMsg}</p>}

//         {loading ? (
//           <p className='mt-6'>Memuat...</p>
//         ) : (
//           <>
//             <section className='mt-4 bg-white p-4 rounded-xl space-y-3 border'>
//               <input
//                 className='w-full border p-2 rounded'
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder='Judul'
//               />

//               <input
//                 className='w-full border p-2 rounded'
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 placeholder='Kategori'
//               />

//               <textarea
//                 className='w-full border p-2 rounded min-h-[110px]'
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder='Deskripsi'
//               />

//               <label className='flex gap-2 items-center'>
//                 <input
//                   type='checkbox'
//                   checked={isActive}
//                   onChange={(e) => setIsActive(e.target.checked)}
//                 />
//                 Aktif
//               </label>

//               <div className='flex gap-2'>
//                 <button
//                   type='button'
//                   onClick={save}
//                   disabled={saving}
//                   className='bg-red-600 text-white px-4 py-2 rounded'
//                 >
//                   {saving ? 'Menyimpan…' : 'Simpan'}
//                 </button>

//                 <button
//                   type='button'
//                   onClick={remove}
//                   className='border border-red-600 text-red-600 px-4 py-2 rounded'
//                 >
//                   Hapus Modul
//                 </button>
//               </div>
//             </section>

//             <section className='mt-6 space-y-4'>
//               {contents.map((c) => (
//                 <div key={c.id} className='border p-4 rounded'>
//                   <b>{c.title}</b>
//                   <p className='text-sm text-gray-600'>
//                     {c.type} • {c.level}
//                   </p>

//                   {c.media_url && (
//                     <a
//                       href={c.media_url}
//                       target='_blank'
//                       rel='noreferrer'
//                       className='text-red-600 underline block mt-2'
//                     >
//                       Buka Media
//                     </a>
//                   )}

//                   <CldUploadWidget
//                     uploadPreset={uploadPreset}
//                     options={{ cloudName, resourceType: 'auto' }}
//                     onSuccess={(result) => {
//                       const url = extractSecureUrl(result)
//                       if (url) void attachMedia(c.id, url)
//                     }}
//                   >
//                     {({ open }) => (
//                       <button
//                         type='button'
//                         onClick={() => open()}
//                         className='mt-2 text-sm border px-3 py-1 rounded'
//                         disabled={!cloudName || !uploadPreset || uploading}
//                       >
//                         {uploadingContentId === c.id ? 'Uploading...' : 'Upload Media'}
//                       </button>
//                     )}
//                   </CldUploadWidget>
//                 </div>
//               ))}
//             </section>
//           </>
//         )}
//       </main>
//     </AdminGuard>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { CldUploadWidget } from 'next-cloudinary'
import AdminGuard from '@/components/AdminGuard'
import HeaderPMI from '@/components/HeaderPMI'
import { supabase } from '@/lib/supabase'

type ModuleRow = {
  title: string | null
  category: string | null
  description: string | null
  is_active: boolean | null
}

type ContentRow = {
  id: string
  module_id: string
  type: string
  title: string
  content: string | null
  level: string
  is_active: boolean
  media_url: string | null
  created_at?: string
}

type CloudinaryWidgetResult = {
  info?: unknown
}

type ContentType = 'article' | 'video' | 'audio' | 'infographic'
type ContentLevel = 'sederhana' | 'umum' | 'lanjut'

function getErrorMessage(err: unknown, fallback: string) {
  return err instanceof Error ? err.message : fallback
}

function extractSecureUrl(result: unknown): string | null {
  if (!result || typeof result !== 'object') return null
  const r = result as CloudinaryWidgetResult
  if (!r.info || typeof r.info !== 'object') return null
  const info = r.info as { secure_url?: unknown }
  return typeof info.secure_url === 'string' ? info.secure_url : null
}

export default function AdminModuleDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const moduleId = params?.id

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''
  const cloudinaryReady = Boolean(cloudName && uploadPreset)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(true)

  const [contents, setContents] = useState<ContentRow[]>([])
  const [uploadingContentId, setUploadingContentId] = useState<string | null>(null)

  const [cType, setCType] = useState<ContentType>('article')
  const [cLevel, setCLevel] = useState<ContentLevel>('umum')
  const [cTitle, setCTitle] = useState('')
  const [cBody, setCBody] = useState('')
  const [cActive, setCActive] = useState(true)

  const loadModule = async () => {
    if (!moduleId) return
    const { data, error } = await supabase
      .from('learning_modules')
      .select('title,category,description,is_active')
      .eq('id', moduleId)
      .single()
    if (error) throw error
    const m = (data ?? {}) as ModuleRow
    setTitle(m.title ?? '')
    setCategory(m.category ?? '')
    setDescription(m.description ?? '')
    setIsActive(!!m.is_active)
  }

  const loadContents = async () => {
    if (!moduleId) return
    const { data, error } = await supabase
      .from('learning_contents')
      .select('id,module_id,type,title,content,level,is_active,media_url,created_at')
      .eq('module_id', moduleId)
      .order('created_at', { ascending: true })
    if (error) throw error
    setContents((data ?? []) as ContentRow[])
  }

  const fetchAllData = async () => {
    await Promise.all([loadModule(), loadContents()])
  }

  const handleRefresh = async () => {
    if (!moduleId) return
    setErrorMsg('')
    setLoading(true)
    try {
      await fetchAllData()
    } catch (e: unknown) {
      setErrorMsg(getErrorMessage(e, 'Gagal memuat data'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!moduleId) return
    const initLoad = async () => {
      try {
        await fetchAllData()
      } catch (e: unknown) {
        setErrorMsg(getErrorMessage(e, 'Gagal memuat data'))
      } finally {
        setLoading(false)
      }
    }
    void initLoad()
  }, [moduleId])

  const saveModule = async () => {
    if (!moduleId) return
    setErrorMsg('')
    if (!title.trim()) {
      setErrorMsg('Judul modul wajib diisi.')
      return
    }
    setSaving(true)
    const { error } = await supabase
      .from('learning_modules')
      .update({
        title: title.trim(),
        category: category.trim(),
        description: description.trim() ? description.trim() : null,
        is_active: isActive,
      })
      .eq('id', moduleId)
    setSaving(false)
    if (error) setErrorMsg(error.message)
  }

  const deleteModule = async () => {
    if (!moduleId) return
    const ok = window.confirm('Hapus modul ini? Semua konten di dalamnya ikut terhapus.')
    if (!ok) return
    const { error } = await supabase.from('learning_modules').delete().eq('id', moduleId)
    if (error) {
      setErrorMsg(error.message)
      return
    }
    router.push('/admin/modules')
  }

  const addContent = async () => {
    if (!moduleId) return
    setErrorMsg('')
    if (!cTitle.trim()) {
      setErrorMsg('Judul konten wajib diisi.')
      return
    }
    setSaving(true)
    const { error } = await supabase.from('learning_contents').insert({
      module_id: moduleId,
      type: cType,
      title: cTitle.trim(),
      content: cBody.trim() ? cBody.trim() : null,
      level: cLevel,
      is_active: cActive,
    })
    setSaving(false)
    if (error) {
      setErrorMsg(error.message)
      return
    }
    setCTitle('')
    setCBody('')
    setCType('article')
    setCLevel('umum')
    setCActive(true)
    await loadContents()
  }

  const attachMediaToContent = async (contentId: string, url: string) => {
    if (!moduleId) return
    setErrorMsg('')
    setUploadingContentId(contentId)
    const { error } = await supabase
      .from('learning_contents')
      .update({ media_url: url })
      .eq('id', contentId)
    if (error) {
      setErrorMsg(error.message)
      setUploadingContentId(null)
      return
    }
    await loadContents()
    setUploadingContentId(null)
  }

  if (!moduleId) {
    return (
      <AdminGuard>
        <HeaderPMI />
        <main className="max-w-3xl mx-auto px-4 py-6">
          <p className="text-gray-500">Module ID tidak ditemukan.</p>
        </main>
      </AdminGuard>
    )
  }

  return (
    <AdminGuard>
      <HeaderPMI />

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Header & Delete */}
        <div className="flex items-center justify-between mb-4">
          <Link href="/admin/modules" className="text-gray-600 hover:text-gray-900">
            ← Kembali
          </Link>
          <button
            type="button"
            onClick={deleteModule}
            className="px-4 py-2 rounded-xl border border-red-200 text-red-700 hover:bg-red-50"
          >
            Hapus Modul
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Edit Modul</h1>

        {errorMsg && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-red-700 text-sm font-semibold">{errorMsg}</p>
          </div>
        )}

        {loading ? (
          <p className="mt-6 text-gray-500">Memuat...</p>
        ) : (
          <>
            {/* FORM MODUL */}
            <section className="mt-6 bg-white border rounded-2xl p-5 shadow-sm space-y-3">
              <div>
                <label className="text-sm font-semibold text-gray-800" htmlFor="m-title">Judul</label>
                <input
                  id="m-title"
                  className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-800" htmlFor="m-category">Kategori</label>
                <input
                  id="m-category"
                  className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-800" htmlFor="m-desc">Deskripsi</label>
                <textarea
                  id="m-desc"
                  className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2 min-h-25"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={saveModule}
                disabled={saving}
                className="bg-red-600 text-white px-4 py-2 rounded-xl disabled:opacity-60"
              >
                {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </section>

            {/* FORM TAMBAH KONTEN */}
            <section className="mt-6 bg-white border rounded-2xl p-5 shadow-sm space-y-3">
              <h2 className="font-bold text-gray-900">Tambah Konten Baru</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-gray-800" htmlFor="c-type">Tipe</label>
                  <select
                    id="c-type"
                    className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2 bg-white"
                    value={cType}
                    onChange={(e) => setCType(e.target.value as ContentType)}
                  >
                    <option value="article">article</option>
                    <option value="video">video</option>
                    <option value="audio">audio</option>
                    <option value="infographic">infographic</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-800" htmlFor="c-level">Level</label>
                  <select
                    id="c-level"
                    className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2 bg-white"
                    value={cLevel}
                    onChange={(e) => setCLevel(e.target.value as ContentLevel)}
                  >
                    <option value="sederhana">sederhana</option>
                    <option value="umum">umum</option>
                    <option value="lanjut">lanjut</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-800" htmlFor="c-title">Judul Konten</label>
                <input
                  id="c-title"
                  className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2"
                  value={cTitle}
                  onChange={(e) => setCTitle(e.target.value)}
                  placeholder="Masukkan judul konten"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-800" htmlFor="c-body">Isi Konten (Opsional)</label>
                <textarea
                  id="c-body"
                  className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2 min-h-25"
                  value={cBody}
                  onChange={(e) => setCBody(e.target.value)}
                  placeholder="Tulis isi konten di sini"
                />
              </div>
              <button
                type="button"
                onClick={addContent}
                disabled={saving}
                className="bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                Tambah Konten
              </button>
            </section>

            {/* LIST KONTEN */}
            <section className="mt-6 bg-white border rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Daftar Konten</h2>
              <div className="space-y-4">
                {contents.map((c) => (
                  <div key={c.id} className="border rounded-xl p-4 bg-gray-50/30">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="font-bold text-gray-900">{c.title}</div>
                        
                        {/* MEDIA PLAYER AREA */}
                        {c.media_url && (
                          <div className="mt-4 p-3 bg-white border rounded-xl shadow-sm">
                            {c.type === 'video' && (
                              <video 
                                controls 
                                autoPlay    /* FITUR: Putar otomatis */
                                muted       /* SYARAT: Wajib muted agar autoplay jalan */
                                playsInline /* SYARAT: Biar jalan lancar di mobile */
                                className="w-full rounded-lg max-h-87.5 bg-black"
                                src={c.media_url}
                              >
                                Browser Anda tidak mendukung tag video.
                              </video>
                            )}
                            
                            {c.type === 'infographic' && (
                              <div className="relative w-full">
                                <Image 
                                  src={c.media_url} 
                                  alt={c.title} 
                                  width={800}
                                  height={450}
                                  className="rounded-lg max-h-100 object-contain bg-gray-100"
                                  unoptimized
                                />
                              </div>
                            )}

                            {c.type === 'audio' && (
                              <audio controls className="w-full mt-2" src={c.media_url} />
                            )}
                          </div>
                        )}
                      </div>

                      {/* UPLOAD SECTION */}
                      <div className="shrink-0">
                        <CldUploadWidget
                          uploadPreset={uploadPreset}
                          options={{ cloudName, resourceType: 'auto', multiple: false }}
                          onSuccess={(result) => {
                            const url = extractSecureUrl(result)
                            if (url) void attachMediaToContent(c.id, url)
                          }}
                        >
                          {({ open }) => (
                            <button
                              type="button"
                              onClick={() => open()}
                              className="text-sm border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-50 bg-white"
                              disabled={!cloudinaryReady || uploadingContentId !== null}
                            >
                              {uploadingContentId === c.id ? '⏳' : '➕ Media'}
                            </button>
                          )}
                        </CldUploadWidget>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </AdminGuard>
  )
}