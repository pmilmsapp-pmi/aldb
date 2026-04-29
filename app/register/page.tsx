'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMsg(error.message)
      return
    }

    // insert profile Klaten
    await supabase.from('users').insert({
      id: data.user?.id,
      full_name: name,
      wilayah: 'Kabupaten Klaten',
      region_code: 'ID-JT-KLT'
    })

    // assign role USER_UMUM
    await supabase.from('user_roles').insert({
      user_id: data.user?.id,
      role_id: 4
    })

    setMsg('Registrasi berhasil. Silakan login.')
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Daftar ALDEBARAN Klaten</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Nama Lengkap"
        onChange={e => setName(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="bg-red-600 text-white px-4 py-2 w-full"
      >
        Daftar
      </button>

      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  )
}
``