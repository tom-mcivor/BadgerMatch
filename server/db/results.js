const config = require('./knexfile').development
const connection = require('knex')(config)

module.exports = {
  getResult
}

function getResult(auth0Id, db = connection) {
  return db('results')
  .join('animals', 'results.animal_id', 'animals.id')
  .where('results.auth0_id', auth0Id).select()
  .select(
    'results.auth0_id as auth0Id',
    'results.animal_id as animalId',
    'results.created',
    'results.disposition',
    'animals.name',
    'animals.description',
    'animals.image_url as imageUrl'
  )
}