'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AdminGuard from '@/components/AdminGuard'
import HeaderPMI from '@/components/HeaderPMI'
import { supabase } from '@/lib/supabase'

export default function AdminNewModulePage() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Banjir')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(true)

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const onSubmit = async () => {
    setErrorMsg('')

    if (!title.trim()) {
      setErrorMsg('Judul modul wajib diisi.')
      return
    }

    if (!category.trim()) {
      setErrorMsg('Kategori modul wajib dipilih.')
      return
    }

    setLoading(true)

    const payload = {
      title: title.trim(),
      category: category.trim(),
      description: description.trim() ? description.trim() : null,
      is_active: isActive,
      // region_code sengaja tidak dikirim jika kolom default sudah ada di DB.
      // Jika DB Anda tidak punya default region_code, uncomment baris ini:
      // region_code: 'ID-JT-KLT',
    }

    const { data, error } = await supabase
      .from('learning_modules')
      .insert(payload)
      .select('id')
      .single()

    setLoading(false)

    if (error) {
      setErrorMsg(error.message)
      return
    }

    // Setelah berhasil, arahkan ke halaman edit modul agar bisa tambah konten
    router.push('/admin/modules/' + data.id)
  }

  return (
    <AdminGuard>
      <HeaderPMI />

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Header */}
        <section className="rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white p-6 shadow-sm">
          <h1 className="text-2xl md:text-3xl font-extrabold">Tambah Modul Baru</h1>
          <p className="text-white/90 mt-1">
            Buat modul pembelajaran untuk Kabupaten Klaten
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/admin/modules"
              className="px-4 py-2 rounded-xl bg-white/15 border border-white/20 hover:bg-white/20 text-center"
            >
              Kembali ke Kelola Modul
            </Link>
          </div>
        </section>

        {/* Form */}
        <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-800">
                Judul Modul <span className="text-red-600">*</span>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Siaga Banjir"
                className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>

            <div>
              <label htmlFor="category" className="text-sm font-semibold text-gray-800">
                Kategori <span className="text-red-600">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-red-200 bg-white"
              >
                <option value="Banjir">Banjir</option>
                <option value="Gempa Bumi">Gempa Bumi</option>
                <option value="Tanah Longsor">Tanah Longsor</option>
                <option value="Gunung Meletus">Gunung Meletus</option>
                <option value="Cuaca Ekstrem">Cuaca Ekstrem</option>
                <option value="Pertolongan Pertama">Pertolongan Pertama</option>
                <option value="PHBS">PHBS</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                Pilih kategori sesuai jenis materi agar mudah dicari pengguna.
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-800">
                Deskripsi (opsional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ringkas modul ini (1-2 kalimat)."
                className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-red-200 min-h-24"
              />
            </div>

            <div className="flex items-center justify-between gap-3 flex-wrap">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 accent-red-600"
                />
                Aktifkan modul (tampil ke pengguna)
              </label>

              <div className="flex gap-2">
                <button
                  onClick={onSubmit}
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-60"
                >
                  {loading ? 'Menyimpan...' : 'Simpan Modul'}
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="text-red-700 text-sm font-semibold">Error</p>
                <p className="text-red-700 text-sm mt-1">{errorMsg}</p>
                <p className="text-red-700/80 text-xs mt-2">
                  Jika error terkait <b>region_code</b>, pastikan kolom region_code punya default
                  <b> ID-JT-KLT</b> atau aktifkan baris payload region_code di kode.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Hint */}
        <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-2">Tips Konten</h3>
          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
            <li>Buat materi singkat: 3-7 poin agar mudah dipahami.</li>
            <li>Aktifkan modul bila sudah siap ditampilkan ke user.</li>
            <li>Setelah modul dibuat, Anda akan diarahkan ke halaman edit untuk menambah konten.</li>
          </ul>
        </section>
      </main>
    </AdminGuard>
  )
}