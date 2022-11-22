const express = require('express')
const db = require('../db/results.js')
const router = express.Router()

//api/v1/results/
router.get('/', (req, res) => {
  // NOTE: auth0id is hardwired for now until auth is set up
  const auth0id = 1
  db.getResult(auth0id)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.error(err.message)
      res.sendStatus(500)
    })
})

module.exports = router
