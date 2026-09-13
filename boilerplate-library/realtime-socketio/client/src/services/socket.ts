import { io, type Socket } from 'socket.io-client'

let socket: Socket | null = null

export function getSocket(token: string) {
  if (socket?.connected) return socket
  socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000', {
    auth: { token },
    autoConnect: true,
  })
  return socket
}

export function disconnectSocket() {
  socket?.disconnect()
  socket = null
}
