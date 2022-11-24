const express = require('express')
const db = require('../db/uploads.js')
const router = express.Router()

//GET /api/v1/uploads
router.get('/', (req, res) => {
 // TODO: auth0id is hardcoded for now until auth is set up
  const auth0id = 1
  db.getUploads(auth0id)
    .then((uploads) => {
      res.json(uploads)
    })
    .catch((err) => {
      console.error(err.message)
      res.sendStatus(500)
    })
})

module.exports = router
