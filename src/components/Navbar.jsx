import { LogIn, LogOut, UploadCloud, FileText, Brain, BookOpen } from 'lucide-react'

export default function Navbar({ user, onLogout }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-900/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow">
            SS
          </div>
          <div>
            <p className="text-white font-semibold leading-tight">Smart Study</p>
            <p className="text-xs text-blue-200/70 -mt-0.5">Summarize • Practice • Score</p>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <a href="#upload" className="text-blue-200 hover:text-white text-sm flex items-center gap-1.5"><UploadCloud size={16}/>Upload</a>
          <a href="#notes" className="text-blue-200 hover:text-white text-sm flex items-center gap-1.5"><FileText size={16}/>Notes</a>
          <a href="#quiz" className="text-blue-200 hover:text-white text-sm flex items-center gap-1.5"><BookOpen size={16}/>Quiz</a>
          <a href="#ai" className="text-blue-200 hover:text-white text-sm hidden sm:flex items-center gap-1.5"><Brain size={16}/>AI</a>
        </nav>
        <div>
          {user ? (
            <button onClick={onLogout} className="inline-flex items-center gap-2 text-sm bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded">
              <LogOut size={16}/> Logout
            </button>
          ) : (
            <a href="#auth" className="inline-flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded">
              <LogIn size={16}/> Login
            </a>
          )}
        </div>
      </div>
    </header>
  )
}
