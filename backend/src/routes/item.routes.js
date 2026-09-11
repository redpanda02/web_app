const express = require('express')
const db = require('../../db')

const router = express.Router()

router.get('/', (request, response) => {
  const items = db.prepare('SELECT * FROM items ORDER BY id').all()
  response.json(items)
})

router.delete('/:id', (request, response) => {
  const { id } = request.params
  const result = db.prepare('DELETE FROM items WHERE id = ?').run(id)

  if (result.changes === 0) {
    return response.status(404).json({ error: 'Item not found' })
  }

  response.status(204).send()
})

router.put('/:id', (request, response)=> {
  const { id } = request.params 
  const { title, description } = request.body

  if (!title || !description) {
    return response.status(400).json({error: 'title and description are required'})
  }

  const result = db.prepare(
    'UPDATE items SET title = ?, description = ? WHERE id = ?').run(title, description, id)

  if (result.changes === 0) {
      return response.status(404).json({ error: 'Item not found' })
    }

  const updatedItem = db.prepare('SELECT * FROM items WHERE id = ?').get(id)
  response.json(updatedItem)
})

  router.post('/', (request, response)=> {
    const { title, description } = request.body

    if (!title || !description) {
    return response.status(400).json({
      error: 'title and description are required',
    })
  }

    const result = db
    .prepare('INSERT INTO items (title, description) VALUES (?, ?)').run(title, description)

    const createdItem = db
    .prepare('SELECT * FROM items WHERE id = ?')
    .get(result.lastInsertRowid)

    response.status(201).json(createdItem)
  })

    

module.exports = router