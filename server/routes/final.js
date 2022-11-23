const express = require('express')
const router = express.Router()

const db = require('../db/final.js')
// get  router to have the result

router.get('/:id', (req, res) => {
  const id = req.params.id
  db.getAnimalById(id)
    .then((finalResult) => {
      res.json(finalResult)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.post('/:id', (req, res) => {
  const newResult = req.body
  db.addResult(newResult)
    .then(() => {
      res.status(200)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

module.exports = router
