const express = require('express')
const router = express.Router()

const db = require('../db/final.js')
// get  router to have the result

router.get('/:id', (req, res) => {
  const id = req.params.id
  db.getFinalResultById(id)
    .then((finalResult) => {
      res.json(finalResult)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.patch('/:id', (req, res) => {
  const id = req.params.id
  const disposition = req.body.disposition
  db.addDispositionResult(id, disposition)
    .then(() => {
      return db.getFinalResultById(id).then((result) => res.json(result))
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

module.exports = router
