'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import AdminGuard from '@/components/AdminGuard'
import HeaderPMI from '@/components/HeaderPMI'
import { supabase } from '@/lib/supabase'

type ModuleRow = {
  id: string
  title: string
  category: string
  description: string | null
  is_active: boolean
  created_at: string
}

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString()
  } catch {
    return value
  }
}

export default function AdminModulesPage() {
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const [modules, setModules] = useState<ModuleRow[]>([])
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return modules
    return modules.filter((m) => {
      const text = (m.title + ' ' + m.category + ' ' + (m.description ?? '')).toLowerCase()
      return text.includes(q)
    })
  }, [modules, query])

  const fetchModules = useCallback(async () => {
    setLoading(true)
    setErrorMsg('')

    const { data, error } = await supabase
      .from('learning_modules')
      .select('id,title,category,description,is_active,created_at')
      .order('created_at', { ascending: false })

    if (error) {
      setErrorMsg(error.message)
      setModules([])
      setLoading(false)
      return
    }

    setModules((data ?? []) as ModuleRow[])
    setLoading(false)
  }, [])

  useEffect(() => {
    void Promise.resolve().then(fetchModules)
  }, [fetchModules])

  const toggleActive = async (row: ModuleRow) => {
    const next = !row.is_active

    // Optimistic UI
    setModules((prev) =>
      prev.map((m) => (m.id === row.id ? { ...m, is_active: next } : m))
    )

    const { error } = await supabase
      .from('learning_modules')
      .update({ is_active: next })
      .eq('id', row.id)

    if (error) {
      // Rollback
      setModules((prev) =>
        prev.map((m) => (m.id === row.id ? { ...m, is_active: row.is_active } : m))
      )
      setErrorMsg(error.message)
    }
  }

  const deleteModule = async (row: ModuleRow) => {
    const ok = window.confirm(
      'Hapus modul "' + row.title + '"?\n\nSemua konten di dalam modul ini juga akan terhapus.'
    )
    if (!ok) return

    const snapshot = modules
    setModules((prev) => prev.filter((m) => m.id !== row.id))

    const { error } = await supabase
      .from('learning_modules')
      .delete()
      .eq('id', row.id)

    if (error) {
      setModules(snapshot)
      setErrorMsg(error.message)
    }
  }

  return (
    <AdminGuard>
      <HeaderPMI />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <section className="rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold">Kelola Modul</h1>
              <p className="text-white/90 mt-1">Admin PMI Klaten - daftar modul pembelajaran</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/admin"
                className="px-4 py-2 rounded-xl border border-white/25 bg-white/10 text-white hover:bg-white/20 text-center"
              >
                Kembali Admin
              </Link>

              <Link
                href="/admin/modules/new"
                className="px-4 py-2 rounded-xl bg-white text-red-600 font-semibold text-center"
              >
                Tambah Modul
              </Link>
            </div>
          </div>
        </section>

        {/* Toolbar */}
        <section className="mt-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari modul (judul/kategori/deskripsi)..."
            className="w-full md:max-w-md border border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-red-200"
          />

          <div className="flex gap-2 flex-wrap">
            <Link
              href="/modules"
              className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Lihat Tampilan User
            </Link>

            <button
              onClick={fetchModules}
              className="px-4 py-2 rounded-xl border border-red-200 text-red-700 hover:bg-red-50"
            >
              Refresh
            </button>
          </div>
        </section>

        {/* Error */}
        {errorMsg && (
          <section className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-red-700 font-semibold text-sm">Error</p>
            <p className="text-red-700 text-sm mt-1">{errorMsg}</p>
          </section>
        )}

        {/* List */}
        <section className="mt-6 rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Total: <b>{filtered.length}</b> modul
            </p>
          </div>

          {loading ? (
            <div className="p-5">
              <p className="text-gray-500">Memuat modul...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-5">
              <p className="text-gray-500">
                Tidak ada modul. Klik <b>Tambah Modul</b> untuk membuat modul pertama.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {filtered.map((m) => (
                <li
                  key={m.id}
                  className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="text-xs text-red-600 font-semibold">{m.category}</div>
                    <div className="font-bold text-gray-900 truncate">{m.title}</div>

                    {m.description && (
                      <p className="text-sm text-gray-600 mt-1">{m.description}</p>
                    )}

                    <div className="text-xs text-gray-500 mt-2">
                      Dibuat: {formatDate(m.created_at)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => toggleActive(m)}
                      className={
                        m.is_active
                          ? 'px-3 py-2 rounded-xl text-xs font-semibold bg-green-50 text-green-700 border border-green-100'
                          : 'px-3 py-2 rounded-xl text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-100'
                      }
                      title="Ubah status aktif"
                    >
                      {m.is_active ? 'Aktif' : 'Nonaktif'}
                    </button>

                    <Link
                      href={`/admin/modules/${m.id}`}
                      className="px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteModule(m)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold border border-red-200 text-red-700 hover:bg-red-50"
                      title="Hapus modul"
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </AdminGuard>
  )
}