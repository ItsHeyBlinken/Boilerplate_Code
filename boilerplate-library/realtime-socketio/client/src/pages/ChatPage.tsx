import { FormEvent, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../services/api'
import { getSocket } from '../services/socket'
import { useAuthStore } from '../store/auth'

type ChatMessage = {
  id: string
  body: string
  createdAt: string
  user: { id: string; name: string }
}

export function ChatPage() {
  const { id = '' } = useParams()
  const token = useAuthStore((s) => s.token)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [body, setBody] = useState('')
  const [online, setOnline] = useState(0)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!token || !id) return

    let cancelled = false
    api
      .get(`/rooms/${id}/messages`)
      .then(({ data }) => {
        if (!cancelled) setMessages(data.data)
      })
      .catch(() => setError('Failed to load history'))

    const socket = getSocket(token)
    socket.emit('join_room', id)

    const onMessage = (message: ChatMessage) => {
      setMessages((prev) => [...prev, message])
    }
    const onPresence = (payload: { roomId: string; online: number }) => {
      if (payload.roomId === id) setOnline(payload.online)
    }
    const onError = (msg: string) => setError(msg)

    socket.on('chat_message', onMessage)
    socket.on('room_presence', onPresence)
    socket.on('error_message', onError)

    return () => {
      cancelled = true
      socket.emit('leave_room', id)
      socket.off('chat_message', onMessage)
      socket.off('room_presence', onPresence)
      socket.off('error_message', onError)
    }
  }, [token, id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function onSend(e: FormEvent) {
    e.preventDefault()
    if (!token || !body.trim()) return
    getSocket(token).emit('chat_message', { roomId: id, body: body.trim() })
    setBody('')
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Link to="/" className="text-sm text-signal hover:text-signal-dark">
            ← Rooms
          </Link>
          <h1 className="font-display text-xl font-semibold">Chat</h1>
        </div>
        <p className="font-display text-sm text-ink-800/60">{online} online</p>
      </div>

      {error && <p className="mb-2 text-sm text-red-600">{error}</p>}

      <div className="flex-1 space-y-3 overflow-y-auto rounded border border-ink-100 bg-white p-4">
        {messages.map((m) => (
          <div key={m.id} className="text-sm">
            <span className="font-medium text-signal">{m.user.name}</span>
            <span className="ml-2 text-ink-800/40">
              {new Date(m.createdAt).toLocaleTimeString()}
            </span>
            <p className="mt-0.5 text-ink-900">{m.body}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={onSend} className="mt-3 flex gap-2">
        <input
          className="flex-1 rounded border border-ink-100 bg-white px-3 py-2"
          placeholder="Message…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit" className="rounded bg-signal px-4 py-2 text-white hover:bg-signal-dark">
          Send
        </button>
      </form>
    </div>
  )
}
