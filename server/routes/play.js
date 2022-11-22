const express = require('express')

// eslint-disable-next-line no-unused-vars
const db = require('../db/play')

const router = express.Router()

module.exports = router

router.get('/:auth0_id', (req, res) => {
  const auth0_id = req.params.auth0_id
  db.getRatedBadgers(auth0_id)
    .then((products) => {
      res.json(products)
    })
    .catch(console.error)
})
