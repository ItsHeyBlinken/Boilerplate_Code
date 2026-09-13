import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { prisma } from './lib/prisma'
import notesRouter from './routes/notes'

dotenv.config()

const app = express()
const port = Number(process.env.PORT) || 3000

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/health', async (_req, res) => {
  let database: 'up' | 'down' = 'down'
  try {
    await prisma.$queryRaw`SELECT 1`
    database = 'up'
  } catch {
    database = 'down'
  }

  const ok = database === 'up'
  res.status(ok ? 200 : 503).json({
    success: ok,
    status: ok ? 'OK' : 'DEGRADED',
    service: 'docker-node-boilerplate',
    database,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Docker Node boilerplate is running',
    docs: {
      health: '/health',
      notes: '/api/notes',
    },
  })
})

app.use('/api/notes', notesRouter)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err)
  res.status(500).json({ success: false, error: err.message || 'Internal Server Error' })
})

async function start() {
  try {
    await prisma.$connect()
    app.listen(port, '0.0.0.0', () => {
      console.log(`docker-node listening on http://0.0.0.0:${port}`)
    })
  } catch (error) {
    console.error('Failed to start:', error)
    process.exit(1)
  }
}

start()
