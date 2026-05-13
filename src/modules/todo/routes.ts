import express from 'express'
import controller from './controller'
import { authMiddleware } from '@/middleware/authMiddleware'

const router = express.Router()
router.get('/list', authMiddleware, controller.getAllTodos)
router.get('/totals', authMiddleware, controller.countTotals)
router.post('/', authMiddleware, controller.createTodo)
router.post('/toggle/:id', authMiddleware, controller.toggleTodo)
router.delete('/:id', authMiddleware, controller.deleteTodo)

export default router
