const config = require('./knexfile').development
const connection = require('knex')(config)

module.exports = {
  getUploads
}

function getUploads(auth0id, db = connection) {
  return db('animals').where('auth0_id', auth0id)
  .select(
  'animals.name',
  'animals.description',
  'animals.image_url as imageUrl'
  )
}



