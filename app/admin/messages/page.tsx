'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminMessagesPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch('/api/messages')
        const data = await response.json()
        if (data.success) {
          setMessages(data.messages)
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMessages()
  }, [])

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        setMessages(messages.map((m) => (m.id === id ? { ...m, status } : m)))
      }
    } catch (error) {
      console.error('Failed to update message:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return
    }

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setMessages(messages.filter((m) => m.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete message:', error)
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
            <h1 className="font-display text-xl font-bold">Messages</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {messages.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-white/40 text-xl font-display">No inquiries yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="bg-background-100 border border-white/10 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{message.name}</h3>
                    <p className="text-white/60 text-sm">{message.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        message.status === 'NEW'
                          ? 'bg-blue-500/20 text-blue-400'
                          : message.status === 'READ'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {message.status}
                    </span>
                  </div>
                </div>

                {message.projectType && (
                  <p className="text-sm text-white/40 mb-2">
                    Project Type: {message.projectType}
                  </p>
                )}

                {message.budget && (
                  <p className="text-sm text-white/40 mb-2">Budget: {message.budget}</p>
                )}

                <p className="text-white/80 mt-4 whitespace-pre-line">{message.message}</p>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <p className="text-white/40 text-sm">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateStatus(message.id, message.status === 'NEW' ? 'READ' : 'ARCHIVED')}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {message.status === 'NEW' ? 'Mark as Read' : 'Archive'}
                    </button>
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="text-sm text-red-400 hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
