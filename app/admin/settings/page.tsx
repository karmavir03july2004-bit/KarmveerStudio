'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminSettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState({
    studioName: 'Karmveer Studio',
    ownerName: 'Karmveer Kumar',
    email: '',
    instagram: 'editwithkarmveer',
    availability: 'AVAILABLE FOR SELECTED PROJECTS',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch('/api/settings')
        const data = await response.json()
        if (data.success && data.settings) {
          setSettings(data.settings)
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      const data = await response.json()

      if (data.success) {
        setMessage('Settings saved successfully')
      } else {
        setMessage(data.error || 'Failed to save settings')
      }
    } catch (error) {
      setMessage('Failed to save settings')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-50">
      <div className="border-b border-white/10 bg-background-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-white/60 hover:text-white transition-colors">
              ← Dashboard
            </Link>
            <h1 className="font-display text-xl font-bold">Settings</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="studioName" className="block text-sm font-medium mb-2">
              Studio Name
            </label>
            <input
              type="text"
              id="studioName"
              value={settings.studioName}
              onChange={(e) => setSettings({ ...settings, studioName: e.target.value })}
              className="w-full px-4 py-3 bg-background-100 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="ownerName" className="block text-sm font-medium mb-2">
              Owner Name
            </label>
            <input
              type="text"
              id="ownerName"
              value={settings.ownerName}
              onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
              className="w-full px-4 py-3 bg-background-100 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Contact Email
            </label>
            <input
              type="email"
              id="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-3 bg-background-100 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="instagram" className="block text-sm font-medium mb-2">
              Instagram Handle
            </label>
            <input
              type="text"
              id="instagram"
              value={settings.instagram}
              onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
              className="w-full px-4 py-3 bg-background-100 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="availability" className="block text-sm font-medium mb-2">
              Availability Status
            </label>
            <input
              type="text"
              id="availability"
              value={settings.availability}
              onChange={(e) => setSettings({ ...settings, availability: e.target.value })}
              className="w-full px-4 py-3 bg-background-100 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition-colors"
            />
          </div>

          {message && (
            <p className={`text-sm ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="w-full px-8 py-4 bg-white text-background-50 font-medium rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'SAVING...' : 'SAVE SETTINGS'}
          </button>
        </form>
      </div>
    </div>
  )
}
