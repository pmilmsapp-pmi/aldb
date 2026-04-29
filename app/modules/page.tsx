'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import AuthGuard from '@/components/AuthGuard'
import HeaderPMI from '@/components/HeaderPMI'

type Module = {
  id: string
  title: string
  category: string
  description: string | null
}

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setErrorMsg('')

      const { data, error } = await supabase
        .from('learning_modules')
        .select('id,title,category,description')
        .order('created_at', { ascending: false })

      if (error) {
        setErrorMsg(error.message)
        setModules([])
      } else {
        setModules((data ?? []) as Module[])
      }

      setLoading(false)
    }

    load()
  }, [])

  return (
    <AuthGuard>
      <HeaderPMI />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-red-600">
            Modul Pembelajaran
          </h1>

          <Link
            href="/dashboard"
            className="text-sm text-red-600 hover:underline"
          >
            Kembali ke Dashboard
          </Link>
        </div>

        <p className="text-gray-700 mb-6">
          Konten kesiapsiagaan bencana khusus <b>Kabupaten Klaten</b>.
        </p>

        {loading && <p className="text-gray-500">Memuat modul...</p>}
        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((m) => (
            <Link
              key={m.id}
              href={`/modules/${m.id}`}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="text-xs text-red-600 font-semibold mb-1">
                {m.category}
              </div>
              <div className="text-lg font-bold text-gray-900">
                {m.title}
              </div>
              {m.description && (
                <p className="text-sm text-gray-600 mt-2">
                  {m.description}
                </p>
              )}
            </Link>
          ))}
        </div>

        {!loading && modules.length === 0 && !errorMsg && (
          <p className="text-gray-500 mt-8">
            Belum ada modul. Tambahkan data modul di Supabase (seed).
          </p>
        )}
      </main>
    </AuthGuard>
  )
}
``