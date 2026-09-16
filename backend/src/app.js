require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()

const itemsRouter = require('./routes/item.routes')
app.use(cors())
app.use(express.json())

app.get('/api/health', (request, response) => {
  response.json({ status: 'ok' })
})

app.use('/api/items', itemsRouter)

app.use('/api', (request, response) => {
  response.status(404).json({ error: 'API route not found' })
})

app.use((error, request, response, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return response.status(400).json({ error: 'Request body must be valid JSON' })
  }

  console.error(error)
  response.status(500).json({ error: 'Internal server error' })
})

module.exports = app