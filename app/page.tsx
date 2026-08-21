
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { AuthModal } from '@/lib/components/auth-modal'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <main className="min-h-screen bg-[#07090e] text-white flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 backdrop-blur-md sticky top-0 z-40 bg-black/40">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Cineflow AI
          </span>
        </div>

        <div>
          {loading ? (
            <div className="w-20 h-8 bg-white/10 rounded-lg animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-300 hidden sm:inline">{user.email}</span>
              <button
                type="button"
                onClick={handleSignOut}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30 transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 shadow-md transition"
            >
              Sign In / Sign Up
            </button>
          )}
        </div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight">
          AI-Powered <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Cinematic Video</span> Studio
        </h1>
        <p className="mt-4 text-gray-400 max-w-xl text-sm sm:text-base">
          Transform your prompts into high-definition cinematic scenes and automated edits in seconds.
        </p>

        {user ? (
          <div className="mt-8 w-full max-w-xl p-6 rounded-2xl bg-[#0d1117] border border-white/10 shadow-xl">
            <h2 className="text-lg font-semibold text-cyan-400 mb-2">Create New Video Project</h2>
            <textarea
              placeholder="Describe your scene (e.g. A futuristic cyberpunk city at dusk with neon lights)..."
              rows={3}
              className="w-full p-3 rounded-lg bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
            />
            <button
              type="button"
              className="mt-3 w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-sm hover:opacity-90 transition shadow"
            >
              Generate Video
            </button>
          </div>
        ) : (
          <div className="mt-8">
            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              className="px-6 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 shadow-lg transition"
            >
              Get Started for Free
            </button>
          </div>
        )}
      </section>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => setIsAuthOpen(false)}
      />
    </main>
  )
}
