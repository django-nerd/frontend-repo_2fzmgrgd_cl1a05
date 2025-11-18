import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import AuthCard from './components/AuthCard'
import UploadPanel from './components/UploadPanel'
import Quiz from './components/Quiz'

function App() {
  const [session, setSession] = useState(null)
  const [analysis, setAnalysis] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('smartstudy_session')
    if (saved) {
      try { setSession(JSON.parse(saved)) } catch {}
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('smartstudy_session')
    setSession(null)
    setAnalysis(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.08),transparent_40%)]"/>
      <Navbar user={session?.user} onLogout={handleLogout} />
      <main className="relative mx-auto max-w-6xl px-4 py-10 space-y-6">
        {!session ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">Smart Study</h1>
              <p className="text-blue-200 mb-4">Upload your notes as text, PDF, or an image, and get a quick summary with practice questions. Answer the quiz and see your score instantly.</p>
              <ul className="text-blue-100/90 list-disc pl-5 space-y-1 text-sm">
                <li>Register or log in to start</li>
                <li>Paste text or upload a file</li>
                <li>Get an AI-style summary and auto-generated questions</li>
                <li>Practice and view your score</li>
              </ul>
            </div>
            <AuthCard onAuth={setSession} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-6">
              <UploadPanel token={session.token} onResult={setAnalysis} />
              {analysis && (
                <div id="ai" className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <p className="text-blue-100 whitespace-pre-wrap">{analysis.summary}</p>
                </div>
              )}
            </div>
            <div className="lg:col-span-1">
              <Quiz token={session.token} noteId={analysis?.note_id} />
            </div>
          </div>
        )}
      </main>
      <footer className="relative px-4 py-8">
        <p className="text-center text-blue-300/70 text-sm">Built with care — Smart Study</p>
      </footer>
    </div>
  )
}

export default App
