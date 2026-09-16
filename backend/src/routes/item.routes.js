const express = require('express')
const db = require('../../db')

const router = express.Router()

function parseItemId(value) {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

function getItemInput(body) {
  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const description = typeof body.description === 'string' ? body.description.trim() : ''

  if (!title || !description) {
    return null
  }

  return { title, description }
}

router.get('/', (request, response) => {
  const items = db.prepare('SELECT * FROM items ORDER BY id').all()
  response.json(items)
})

router.delete('/:id', (request, response) => {
  const id = parseItemId(request.params.id)
  if (!id) {
    return response.status(400).json({ error: 'Item id must be a positive integer' })
  }

  const result = db.prepare('DELETE FROM items WHERE id = ?').run(id)

  if (result.changes === 0) {
    return response.status(404).json({ error: 'Item not found' })
  }

  response.status(204).send()
})

router.put('/:id', (request, response)=> {
  const id = parseItemId(request.params.id)
  const input = getItemInput(request.body)

  if (!id) {
    return response.status(400).json({ error: 'Item id must be a positive integer' })
  }

  if (!input) {
    return response.status(400).json({ error: 'title and description are required' })
  }

  const result = db.prepare(
    'UPDATE items SET title = ?, description = ? WHERE id = ?').run(input.title, input.description, id)

  if (result.changes === 0) {
      return response.status(404).json({ error: 'Item not found' })
    }

  const updatedItem = db.prepare('SELECT * FROM items WHERE id = ?').get(id)
  response.json(updatedItem)
})

router.post('/', (request, response) => {
  const input = getItemInput(request.body)

  if (!input) {
    return response.status(400).json({
      error: 'title and description are required',
    })
  }

  const result = db
    .prepare('INSERT INTO items (title, description) VALUES (?, ?)').run(input.title, input.description)

  const createdItem = db
    .prepare('SELECT * FROM items WHERE id = ?')
    .get(result.lastInsertRowid)

  response.status(201).json(createdItem)
})

module.exports = router