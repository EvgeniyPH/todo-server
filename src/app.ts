import express from 'express'
import cors from 'cors'
import router from './routes' // Import the routes file
import { errorHandlingMiddleware } from './middleware/ErrorHandlingMiddleware'

const app = express()

app.use((req, res, next) => {
  const startTime = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - startTime
    const message = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`

    if (res.statusCode >= 500) {
      console.error(message)
    } else if (res.statusCode >= 400) {
      console.warn(message)
    } else {
      console.info(message)
    }
  })

  next()
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
app.use(errorHandlingMiddleware)

app.all('/{*any}', (req, res) => {
  res.status(404).json({ message: 'Sorry! Page not found' })
})

export default app
