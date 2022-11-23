const express = require('express')
const db = require('../db/results.js')
const router = express.Router()
const checkJwt = require('../auth0') 

//api/v1/results/
router.get('/', checkJwt, (req, res) => {
  const auth0id = req.auth?.sub
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
