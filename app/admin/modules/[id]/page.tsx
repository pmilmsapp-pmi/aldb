'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import AdminGuard from '@/components/AdminGuard'
import HeaderPMI from '@/components/HeaderPMI'
import { supabase } from '@/lib/supabase'

type ModuleParams = {
  id?: string | string[]
}

export default function AdminModuleDetailPage() {
  const params = useParams() as ModuleParams
  const router = useRouter()

  const idRaw = params.id
  const moduleId = Array.isArray(idRaw) ? idRaw[0] : idRaw

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const load = async () => {
      if (!moduleId) return
      setLoading(true)
      setErrorMsg('')

      const { data, error } = await supabase
        .from('learning_modules')
        .select('id,title,category,description,is_active')
        .eq('id', moduleId)
        .single()

      if (error) {
        setErrorMsg(error.message)
        setLoading(false)
        return
      }

      setTitle(data.title ?? '')
      setCategory(data.category ?? '')
      setDescription(data.description ?? '')
      setIsActive(!!data.is_active)
      setLoading(false)
    }

    load()
  }, [moduleId])

  const save = async () => {
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

  const remove = async () => {
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

  return (
    <AdminGuard>
      <HeaderPMI />

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <Link href="/admin/modules" className="text-red-600 hover:underline">
            Kembali
          </Link>

          <button
            onClick={remove}
            className="px-4 py-2 rounded-xl border border-red-200 text-red-700 hover:bg-red-50"
          >
            Hapus Modul
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Edit Modul</h1>

        {errorMsg && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-red-700 text-sm font-semibold">Error</p>
            <p className="text-red-700 text-sm mt-1">{errorMsg}</p>
          </div>
        )}

        {loading ? (
          <p className="mt-6 text-gray-500">Memuat...</p>
        ) : (
          <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
            <div>
              <label htmlFor="module-title" className="text-sm font-semibold text-gray-800">
                Judul <span className="text-red-600">*</span>
              </label>
              <input
                id="module-title"
                placeholder="Masukkan judul modul"
                className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-red-200"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="module-category" className="text-sm font-semibold text-gray-800">Kategori</label>
              <input
                id="module-category"
                placeholder="Masukkan kategori"
                className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-red-200"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="module-description" className="text-sm font-semibold text-gray-800">Deskripsi</label>
              <textarea
                id="module-description"
                placeholder="Deskripsikan modul"
                className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-red-200 min-h-[110px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 accent-red-600"
              />
              Aktif (tampil ke user)
            </label>

            <button
              onClick={save}
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-60"
            >
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </section>
        )}
      </main>
    </AdminGuard>
  )
}
``