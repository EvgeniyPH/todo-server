require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./db') // Import the database connection file
const models = require('./models') // Import the models file

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3001

const start = async () => {
  try {
    await db.authenticate() // Authenticate the connection to the database
    await db.sync() // Sync the models with the database
    console.log('Database connected successfully')

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Error connecting to the database:', error)
  }
}

start()
