import { Server, Socket } from 'socket.io'
import { prisma } from '../lib/prisma'
import { verifyToken } from '../utils/jwt'

type AuthedSocket = Socket & {
  user?: { id: string; email: string; name: string }
}

const roomCounts = new Map<string, Set<string>>()

export function registerSocketHandlers(io: Server) {
  io.use((socket: AuthedSocket, next) => {
    try {
      const token = socket.handshake.auth.token as string | undefined
      if (!token) {
        next(new Error('Unauthorized'))
        return
      }
      const payload = verifyToken(token)
      socket.user = { id: payload.sub, email: payload.email, name: payload.name }
      next()
    } catch {
      next(new Error('Unauthorized'))
    }
  })

  io.on('connection', (socket: AuthedSocket) => {
    socket.on('join_room', async (roomId: string) => {
      if (!roomId || !socket.user) return
      const room = await prisma.room.findUnique({ where: { id: roomId } })
      if (!room) {
        socket.emit('error_message', 'Room not found')
        return
      }
      await socket.join(roomId)
      if (!roomCounts.has(roomId)) roomCounts.set(roomId, new Set())
      roomCounts.get(roomId)!.add(socket.id)
      io.to(roomId).emit('room_presence', { roomId, online: roomCounts.get(roomId)!.size })
    })

    socket.on('leave_room', (roomId: string) => {
      if (!roomId) return
      socket.leave(roomId)
      roomCounts.get(roomId)?.delete(socket.id)
      io.to(roomId).emit('room_presence', {
        roomId,
        online: roomCounts.get(roomId)?.size || 0,
      })
    })

    socket.on('chat_message', async (payload: { roomId: string; body: string }) => {
      if (!socket.user || !payload?.roomId || !payload?.body?.trim()) return
      const message = await prisma.message.create({
        data: {
          roomId: payload.roomId,
          userId: socket.user.id,
          body: payload.body.trim(),
        },
        include: { user: { select: { id: true, name: true } } },
      })
      io.to(payload.roomId).emit('chat_message', message)
    })

    socket.on('disconnect', () => {
      for (const [roomId, sockets] of roomCounts.entries()) {
        if (sockets.delete(socket.id)) {
          io.to(roomId).emit('room_presence', { roomId, online: sockets.size })
        }
      }
    })
  })
}
