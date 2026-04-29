'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import LogoPMI from './LogoPMI'

export default function HeaderPMI() {
  const router = useRouter()

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header className="bg-white border-b border-red-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <LogoPMI />
        <button
          onClick={logout}
          className="text-sm text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white"
        >
          Logout
        </button>
      </div>
    </header>
  )
}