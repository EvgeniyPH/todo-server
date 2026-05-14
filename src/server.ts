import app from './app'
import config from './config'
import { database } from '@/database' // Import the models file

const start = async () => {
  try {
    await database.authenticate() // Authenticate the connection to the database

    console.log('Database connected successfully')

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`)
    })
  } catch (error) {
    console.error('Error connecting to the database:', error)
  }
}

start()
