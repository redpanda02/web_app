const cors = require('cors')
const express = require('express')

const app = express()
const itemsRouter = require('./routes/item.routes')
app.use(cors())
app.use(express.json())

app.get('/api/health', (request, response) => {
  response.json({ status: 'ok' })
})
app.use('api/items', itemsRouter)

module.exports = app