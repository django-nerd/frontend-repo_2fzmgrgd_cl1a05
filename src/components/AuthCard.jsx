import { useEffect, useState } from 'react'

export default function AuthCard({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const saved = localStorage.getItem('smartstudy_session')
    if (saved) {
      try { onAuth(JSON.parse(saved)) } catch {}
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register'
      const payload = isLogin ? { email, password } : { name, email, password }
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Request failed')
      localStorage.setItem('smartstudy_session', JSON.stringify(data))
      onAuth(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGuest = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/auth/guest`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Guest login failed')
      localStorage.setItem('smartstudy_session', JSON.stringify(data))
      onAuth(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="auth" className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{isLogin ? 'Welcome back' : 'Create your account'}</h3>
        <button
          className="text-xs text-blue-300 hover:text-white underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Need an account? Sign up' : 'Have an account? Log in'}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        {!isLogin && (
          <div>
            <label className="block text-sm text-blue-200 mb-1">Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} required className="w-full bg-slate-900/60 rounded px-3 py-2 text-sm outline-none border border-white/10 focus:border-blue-500" />
          </div>
        )}
        <div>
          <label className="block text-sm text-blue-200 mb-1">Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full bg-slate-900/60 rounded px-3 py-2 text-sm outline-none border border-white/10 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full bg-slate-900/60 rounded px-3 py-2 text-sm outline-none border border-white/10 focus:border-blue-500" />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 rounded py-2 font-medium">
          {loading ? 'Please wait...' : isLogin ? 'Log in' : 'Sign up'}
        </button>
      </form>
      <div className="flex items-center gap-3 my-3">
        <div className="h-px flex-1 bg-white/10"/>
        <span className="text-xs text-blue-200/80">or</span>
        <div className="h-px flex-1 bg-white/10"/>
      </div>
      <button onClick={handleGuest} disabled={loading} className="w-full bg-white/10 hover:bg-white/20 disabled:opacity-60 rounded py-2 text-sm">
        Continue as guest (no signup)
      </button>
    </div>
  )
}
