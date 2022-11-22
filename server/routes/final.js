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
    .catch(console.error)
})

module.exports = router
