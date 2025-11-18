import { useState } from 'react'
import { UploadCloud } from 'lucide-react'

export default function UploadPanel({ token, onResult }) {
  const [title, setTitle] = useState('My Study Notes')
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleUpload = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const form = new FormData()
      form.append('title', title)
      if (text) form.append('text', text)
      if (file) form.append('file', file)

      const res = await fetch(`${baseUrl}/notes/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Upload failed')
      onResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="upload" className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 text-white">
      <h3 className="text-lg font-semibold mb-4">Upload your notes</h3>
      <form onSubmit={handleUpload} className="space-y-3">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} required className="w-full bg-slate-900/60 rounded px-3 py-2 text-sm outline-none border border-white/10 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Paste text (optional)</label>
          <textarea value={text} onChange={e=>setText(e.target.value)} rows={4} className="w-full bg-slate-900/60 rounded px-3 py-2 text-sm outline-none border border-white/10 focus:border-blue-500" placeholder="Paste your text if you don't have a file"/>
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Upload file (PDF, image, or text)</label>
          <input type="file" onChange={e=>setFile(e.target.files[0])} className="block w-full text-sm text-blue-200" />
          <p className="text-xs text-blue-300/70 mt-1">Tip: If you upload an image, also paste the text as OCR is not available.</p>
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button disabled={loading} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 rounded px-4 py-2">
          <UploadCloud size={16}/> {loading ? 'Processing...' : 'Analyze Notes'}
        </button>
      </form>
    </div>
  )
}
