import app from './app'
import config from './config/config'
import { database } from '@/database' // Import the models file
// import models from '@/database'

const start = async () => {
  try {
    await database.authenticate() // Authenticate the connection to the database
    // const s = models
    // await database.sync({ force: true }) // Sync the models with the database

    console.log('Database connected successfully')

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`)
    })
  } catch (error) {
    console.error('Error connecting to the database:', error)
  }
}

start()
