import { Router } from 'express'
import authRouters from '@/modules/auth/routes'
import userRouters from '@/modules/user/routes'
import todoRouters from '@/modules/todo/routes'
import tagRouters from '@/modules/tag/routes'

// Define routes for different resources here
const router = Router()
router.use('/auth', authRouters)
router.use('/user', userRouters)
router.use('/tag', tagRouters)
router.use('/todo', todoRouters)

export default router
