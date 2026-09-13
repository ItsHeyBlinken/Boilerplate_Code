import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ success: true, status: 'OK', timestamp: new Date().toISOString() })
})

export default router
