const path = require('path')
const Database = require('better-sqlite3')

const dbPath = path.join(__dirname, 'app.db')
const db = new Database(dbPath)

db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT
  )
`)

const rowCount = db.prepare('SELECT COUNT(*) AS count FROM items').get().count

if (rowCount === 0) {
  db.prepare(
    'INSERT INTO items (title, description) VALUES (?, ?)'
  ).run('First item', 'A sample item')
}

module.exports = db