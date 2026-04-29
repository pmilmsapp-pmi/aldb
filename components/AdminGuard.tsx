'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAdmin = async () => {
      // 1. pastikan login
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      // 2. cek role ADMIN_PMI
      const { data, error } = await supabase
        .from('user_roles')
        .select('roles!inner(code)')
        .eq('user_id', user.id)
        .eq('roles.code', 'ADMIN_PMI')
        .maybeSingle()

      if (error || !data) {
        router.push('/dashboard')
        return
      }

      setLoading(false)
    }

    checkAdmin()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memverifikasi akses admin...</p>
      </div>
    )
  }

  return <>{children}</>
}