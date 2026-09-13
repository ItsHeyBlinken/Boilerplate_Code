import { FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'

type Room = {
  id: string
  name: string
  slug: string
  owner: { id: string; name: string }
  _count: { messages: number }
}

export function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  async function load() {
    const { data } = await api.get('/rooms')
    setRooms(data.data)
  }

  useEffect(() => {
    load().catch(() => setError('Failed to load rooms'))
  }, [])

  async function onCreate(e: FormEvent) {
    e.preventDefault()
    setError('')
    try {
      await api.post('/rooms', { name })
      setName('')
      await load()
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ||
        'Create failed'
      setError(msg)
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Rooms</h1>
      <p className="mt-1 text-sm text-ink-800/60">Create a room, then open it to chat.</p>

      <form onSubmit={onCreate} className="mt-6 flex gap-2">
        <input
          className="flex-1 rounded border border-ink-100 bg-white px-3 py-2"
          placeholder="Room name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="rounded bg-signal px-4 py-2 text-white hover:bg-signal-dark">
          Create
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <ul className="mt-8 space-y-2">
        {rooms.map((room) => (
          <li key={room.id}>
            <Link
              to={`/rooms/${room.id}`}
              className="flex items-center justify-between rounded border border-ink-100 bg-white px-4 py-3 hover:border-signal"
            >
              <div>
                <p className="font-medium">{room.name}</p>
                <p className="text-xs text-ink-800/50">
                  by {room.owner.name} · {room._count.messages} messages
                </p>
              </div>
              <span className="font-display text-xs text-signal">join →</span>
            </Link>
          </li>
        ))}
        {rooms.length === 0 && (
          <li className="text-sm text-ink-800/50">No rooms yet. Create one above.</li>
        )}
      </ul>
    </div>
  )
}
