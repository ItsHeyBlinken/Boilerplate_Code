import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = Number(process.env.PORT) || 3000

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/health', (_req, res) => {
  res.json({
    success: true,
    status: 'OK',
    service: 'docker-node-boilerplate',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Docker Node boilerplate is running',
    docs: '/health',
  })
})

app.listen(port, () => {
  console.log(`docker-node listening on http://localhost:${port}`)
})
