import { Router } from 'express'
import { prisma } from '../lib/prisma'

const router = Router()

router.get('/', async (_req, res, next) => {
  try {
    const notes = await prisma.note.findMany({ orderBy: { createdAt: 'desc' }, take: 50 })
    res.json({ success: true, data: notes })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { title, body } = req.body
    if (!title || !body) {
      res.status(400).json({ success: false, error: 'title and body are required' })
      return
    }
    const note = await prisma.note.create({ data: { title, body } })
    res.status(201).json({ success: true, data: note })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const note = await prisma.note.findUnique({ where: { id: req.params.id } })
    if (!note) {
      res.status(404).json({ success: false, error: 'Note not found' })
      return
    }
    res.json({ success: true, data: note })
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.note.delete({ where: { id: req.params.id } })
    res.json({ success: true, data: { message: 'Deleted' } })
  } catch {
    res.status(404).json({ success: false, error: 'Note not found' })
  }
})

export default router
