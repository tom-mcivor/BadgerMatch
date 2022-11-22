const express = require('express')
const db = require('../db/results.js')
const router = express.Router()

//api/v1/results/
router.get('/', (req, res) => {
  db.getResult(1)
    .then((result) => {
      res.json(result)
    })
    .catch(console.error)
})

module.exports = router
