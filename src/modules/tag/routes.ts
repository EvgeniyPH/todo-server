import express from 'express'
import controller from './controller'
import { authMiddleware } from '@/middleware/authMiddleware'

const router = express.Router()
router.get('/list', authMiddleware, controller.getAllTags)

export default router
