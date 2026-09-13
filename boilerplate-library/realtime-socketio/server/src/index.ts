import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { prisma } from './lib/prisma'
import authRoutes from './routes/auth'
import roomRoutes from './routes/rooms'
import { registerSocketHandlers } from './socket/handlers'

dotenv.config()

const app = express()
const httpServer = createServer(app)
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173'

const io = new Server(httpServer, {
  cors: { origin: corsOrigin, credentials: true },
})

app.use(cors({ origin: corsOrigin, credentials: true }))
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ success: true, status: 'OK', service: 'realtime-socketio' })
})

app.use('/api/auth', authRoutes)
app.use('/api/rooms', roomRoutes)

registerSocketHandlers(io)

const PORT = Number(process.env.PORT) || 4000

async function start() {
  await prisma.$connect()
  httpServer.listen(PORT, () => {
    console.log(`realtime-socketio listening on http://localhost:${PORT}`)
  })
}

start().catch((error) => {
  console.error(error)
  process.exit(1)
})
