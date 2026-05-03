import express from 'express'
import controller from './controller'

const router = express.Router()
router.post('/registration', controller.register)
router.post('/login', controller.login)

export default router
