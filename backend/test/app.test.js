const test = require('node:test')
const assert = require('node:assert/strict')

const app = require('../src/app')

async function getJson(path) {
  const server = app.listen(0)
  await new Promise((resolve) => server.once('listening', resolve))

  const { port } = server.address()
  try {
    const response = await fetch(`http://127.0.0.1:${port}${path}`)
    const body = await response.text()

    return {
      status: response.status,
      body,
      json: body ? JSON.parse(body) : null,
    }
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error)
        else resolve()
      })
    })
  }
}

test('GET /api/health returns ok status', async () => {
  const response = await getJson('/api/health')

  assert.equal(response.status, 200)
  assert.deepEqual(response.json, { status: 'ok' })
})

test('GET /api/items returns the sample items list', async () => {
  const response = await getJson('/api/items')

  assert.equal(response.status, 200)
  assert.ok(Array.isArray(response.json))
  assert.equal(response.json.length, 1)
  assert.deepEqual(response.json[0], {
    id: 1,
    title: 'First item',
    description: 'A sample item',
  })
})

test('DELETE /api/items/:id removes the item', async () => {
  const db = require('../db')
  const inserted = db.prepare(
    'INSERT INTO items (title, description) VALUES (?, ?)'
  ).run('Delete me', 'temporary item')

  const server = app.listen(0)
  await new Promise((resolve) => server.once('listening', resolve))

  const { port } = server.address()

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/items/${inserted.lastInsertRowid}`, {
      method: 'DELETE',
    })

    assert.equal(response.status, 204)
    const item = db.prepare('SELECT * FROM items WHERE id = ?').get(inserted.lastInsertRowid)
    assert.equal(item, undefined)
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error)
        else resolve()
      })
    })
  }
})
