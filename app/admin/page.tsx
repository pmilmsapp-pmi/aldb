'use client'

import Link from 'next/link'
import AdminGuard from '@/components/AdminGuard'
import HeaderPMI from '@/components/HeaderPMI'

export default function AdminPage() {
  return (
    <AdminGuard>
      <HeaderPMI />

      <main className="max-w-5xl mx-auto px-4 py-6">
        <section className="rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white p-6 shadow-sm">
          <h1 className="text-2xl md:text-3xl font-extrabold">
            Admin Panel - ALDEBARAN
          </h1>
          <p className="text-white/90 mt-1">
            Kelola konten pembelajaran PMI Kabupaten Klaten
          </p>
        </section>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/modules"
            className="border border-red-100 rounded-2xl p-5 bg-white hover:shadow-sm hover:border-red-200 transition"
          >
            <div className="font-bold text-gray-900">📘 Kelola Modul</div>
            <p className="text-sm text-gray-600 mt-2">
              Tambah/edit modul dan konten pembelajaran
            </p>
          </Link>

          <Link
            href="/modules"
            className="border border-red-100 rounded-2xl p-5 bg-white hover:shadow-sm hover:border-red-200 transition"
          >
            <div className="font-bold text-gray-900">👁️ Lihat Tampilan User</div>
            <p className="text-sm text-gray-600 mt-2">
              Cek modul tampil ke masyarakat
            </p>
          </Link>
        </section>
      </main>
    </AdminGuard>
  )
}
