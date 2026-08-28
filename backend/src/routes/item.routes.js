const express = require('express')

const router = express.Router()

const items = [
  {
    id: 1,
    title: 'First item',
    description: 'A sample item',
  },
]

router.get('/', (request, response) => {
  response.json(items)
})

module.exports = router