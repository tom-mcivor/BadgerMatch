const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = { getRatedBadgers, getResultsForBadger }

function getResultsForBadger(auth0_id, db = connection) {
  return db('results').where('auth0_id', auth0_id)
}

function getRatedBadgers(auth0_id, db = connection) {
  return getResultsForBadger(auth0_id, db).then((animals) => {
    const animal_id = animals.map((animal) => Object.values(animal)[0])
    return db('animals')
      .whereNotIn('id', animal_id)
      .select(
        'id',
        'auth0_id as uploaderId',
        'name',
        'description',
        'image_url as imageUrl'
      )
  })
}
