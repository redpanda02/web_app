const test = require('node:test')
const assert = require('node:assert/strict')

const app = require('../src/app')
const db = require('../db')

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

function createItem({ title = 'Sample', description = 'Sample description' } = {}) {
  return db.prepare('INSERT INTO items (title, description) VALUES (?, ?)').run(title, description)
}

test('GET /api/health returns ok status', async () => {
  const response = await getJson('/api/health')

  assert.equal(response.status, 200)
  assert.deepEqual(response.json, { status: 'ok' })
})

test('GET /api/items returns the items list', async () => {
  const response = await getJson('/api/items')

  assert.equal(response.status, 200)
  assert.ok(Array.isArray(response.json))
  assert.ok(response.json.length >= 1)
})

test('POST /api/items creates an item', async () => {
  const server = app.listen(0)
  await new Promise((resolve) => server.once('listening', resolve))

  const { port } = server.address()

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'New item', description: 'Created via API' }),
    })

    const payload = await response.json()

    assert.equal(response.status, 201)
    assert.equal(payload.title, 'New item')
    assert.equal(payload.description, 'Created via API')
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error)
        else resolve()
      })
    })
  }
})

test('PUT /api/items/:id updates an item', async () => {
  const inserted = createItem({ title: 'Old title', description: 'Old description' })
  const server = app.listen(0)
  await new Promise((resolve) => server.once('listening', resolve))

  const { port } = server.address()

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/items/${inserted.lastInsertRowid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'New title', description: 'New description' }),
    })

    const payload = await response.json()

    assert.equal(response.status, 200)
    assert.equal(payload.title, 'New title')
    assert.equal(payload.description, 'New description')
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error)
        else resolve()
      })
    })
  }
})

test('DELETE /api/items/:id removes the item', async () => {
  const inserted = createItem({ title: 'Delete me', description: 'temporary item' })
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
