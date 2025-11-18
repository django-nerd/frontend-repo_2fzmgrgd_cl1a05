import { useState, useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'

export default function Quiz({ token, noteId }) {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    if (!noteId) return
    const run = async () => {
      const res = await fetch(`${baseUrl}/quiz/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (res.ok) {
        setQuestions(data.questions || [])
        setAnswers(new Array((data.questions || []).length).fill(null))
      }
    }
    run()
  }, [noteId])

  const submit = async () => {
    const res = await fetch(`${baseUrl}/quiz/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ note_id: noteId, answers })
    })
    const data = await res.json()
    if (res.ok) setResult(data)
  }

  if (!noteId) return null

  return (
    <div id="quiz" className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 text-white">
      <h3 className="text-lg font-semibold mb-4">Practice quiz</h3>
      {questions.length === 0 ? (
        <p className="text-blue-200">No questions yet.</p>
      ) : (
        <div className="space-y-4">
          {questions.map((q, i) => (
            <div key={i} className="bg-slate-900/50 rounded p-4">
              <p className="mb-2 text-blue-100">{i+1}. {q.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, j) => (
                  <label key={j} className={`text-sm flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded p-2 cursor-pointer ${answers[i]===j? 'ring-2 ring-blue-500' : ''}`}>
                    <input type="radio" name={`q${i}`} className="hidden" onChange={()=>{
                      const copy = [...answers]; copy[i]=j; setAnswers(copy)
                    }} />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button onClick={submit} className="bg-green-600 hover:bg-green-500 rounded px-4 py-2 inline-flex items-center gap-2">
            <CheckCircle2 size={16}/> Submit Answers
          </button>
          {result && (
            <div className="bg-emerald-900/30 border border-emerald-600/30 rounded p-4 text-emerald-100">
              <p className="font-medium">Your score: {result.score} / {result.total}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
