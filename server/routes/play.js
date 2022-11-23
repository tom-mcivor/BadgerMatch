const express = require('express')

// eslint-disable-next-line no-unused-vars
const db = require('../db/play')

const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
  // No auth0 id hardcoded until it is setup
  // Will pass into route
  const auth0_id = 1
  db.getRatedBadgers(auth0_id)
    .then((products) => {
      res.json(products)
    })
    .catch((error) => {
      console.error(error.message)
      res.status(500).json({ message: 'Something went wrong!' })
    })
})
