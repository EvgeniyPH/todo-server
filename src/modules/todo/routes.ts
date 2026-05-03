import express from 'express'
import controller from './controller'
import { authMiddleware } from '@/middleware/authMiddleware'

const router = express.Router()
router.get('/list', authMiddleware, controller.getAllTodos)
router.post('/create', authMiddleware, controller.createTodo)

export default router
