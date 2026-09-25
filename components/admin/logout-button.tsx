'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      className="text-sm text-white/60 hover:text-white transition-colors"
    >
      Logout
    </button>
  )
}
