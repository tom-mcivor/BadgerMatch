const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = { getRatedBadgers }

function getResultsForBadger(auth0_id, db = connection) {
  return db('results').where('auth0_id', auth0_id).select('animal_id')
}

function getRatedBadgers(auth0_id, db = connection) {
  let animal_id = getResultsForBadger(auth0_id)
  return db('animals')
    .whereNot({ auth0_id: auth0_id })
    .whereNot({ id: animal_id })
}
