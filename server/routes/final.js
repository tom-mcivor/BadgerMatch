const express = require('express')
const router = express.Router()

const db = require('../db/final.js')

router.get('/:id', (req, res) => {
  const id = req.params.id
  db.getAnimalById(id)
    .then((finalResult) => {
      res.json(finalResult)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.post('/', (req, res) => {
  const newResult = req.body

  db.addResult(newResult)
    .then(() => {
      res.sendStatus(200)
      return null
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

module.exports = router
