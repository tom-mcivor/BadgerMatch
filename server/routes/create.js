const express = require('express')
const router = express.Router()
const { create } = require('../db/create')
const aws = require('aws-sdk')
const dotenv = require('dotenv')
dotenv.config()
const checkJwt = require('../auth0')

const region = process.env.AWS_REGION
const bucket = process.env.AWS_BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const URL_EXPIRATION_SECONDS = 60

router.get('/s3Url', checkJwt, async (req, res) => {
  try {
    const s3 = new aws.S3({
      region,
      accessKeyId,
      secretAccessKey,
      signatureVersion: 'v4',
    })

    // TODO: use crypto package to harden encoding.
    const imageName = `${Date.now()}.jpeg`
    const params = {
      Bucket: bucket,
      Key: imageName,
      Expires: URL_EXPIRATION_SECONDS,
    }

    const uploadUrl = s3.getSignedUrl('putObject', params)
    console.log(uploadUrl, 'uploadUrl')
    res.json({ uploadUrl, imageName })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.post('/', checkJwt, async (req, res) => {
  try {
    const auth0Id = req.user?.sub
    console.log(auth0Id) //undefined
    const { name, description, imageUrl } = req.body
    await create(auth0Id, name, description, imageUrl)
    res.sendStatus(200)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router
