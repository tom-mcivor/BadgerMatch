// goal: /:id from the play?

// join table will contain: join by animal_id(linked with id of animal table)
// disposition, auth0_id, name, description, image_url
// Get animal by Id ()
// POST animal back to db(add function)

const connection = require('./connection')

// get final animal (from results table)

// join both table (from results table)
function getFinalResults(db = connection) {
  return db('results')
    .join('animals', 'results.animal_id', 'animals.id')
    .select()
}

function getFinalResultById(id, db = connection) {
  return db('results')
    .join('animals', 'results.animal_id', 'animals.id')
    .where('results.animal_id', id)
    .select(
      'results.animal_id',
      'results.auth0_id',
      'results.created',
      'results.disposition as disposition',
      'animals.name as name',
      'animals.description as description',
      'animals.image_url as imageUrl'
    )
    .first()
}

function addDispositionResult(id, disposition, db = connection) {
  return db('results').where('animal_id', id).update({ disposition })
}

module.exports = {
  getFinalResultById,
  getFinalResults,
  addDispositionResult,
}
