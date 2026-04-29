'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import AuthGuard from '@/components/AuthGuard'
import HeaderPMI from '@/components/HeaderPMI'

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
        .select('id,type,title,content,media_url,level')
        .eq('module_id', moduleId)
        .order('created_at', { ascending: true })

      if (errC) {
        setErrorMsg(errC.message)
      }

      setMod(m as Module)
      setContents((c ?? []) as Content[])
      setLoading(false)
    }

    load()
  }, [moduleId])

  return (
    <AuthGuard>
      <HeaderPMI />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Link
          href="/modules"
          className="text-sm text-red-600 hover:underline"
        >
          ← Kembali ke daftar modul
        </Link>

        {loading && <p className="text-gray-500 mt-4">Memuat...</p>}
        {errorMsg && <p className="text-red-600 text-sm mt-4">{errorMsg}</p>}

        {mod && (
          <div className="mt-4">
            <div className="text-xs text-red-600 font-semibold">
              {mod.category}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {mod.title}
            </h1>
            {mod.description && (
              <p className="text-gray-700 mt-2">{mod.description}</p>
            )}

            <h2 className="text-lg font-bold mt-6 mb-3 text-red-600">
              Konten Pembelajaran
            </h2>

            <div className="space-y-4">
              {contents.map((x) => (
                <div key={x.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-gray-900">
                      {x.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {x.type} • {x.level}
                    </div>
                  </div>

                  {x.content && (
                    <p className="text-gray-700 mt-2 whitespace-pre-line">
                      {x.content}
                    </p>
                  )}

                  {x.media_url && (
                    <a
                      href={x.media_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-3 text-sm text-red-600 hover:underline"
                    >
                      Buka media
                    </a>
                  )}
                </div>
              ))}
            </div>

            {contents.length === 0 && (
              <p className="text-gray-500 mt-4">
                Konten belum tersedia untuk modul ini.
              </p>
            )}
          </div>
        )}
      </main>
    </AuthGuard>
  )
}