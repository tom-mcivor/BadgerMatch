const connection = require('./connection')

// get final animal (from results table)
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
// function getDispositionById
function addDispositionResult(editedDisposition, db = connection) {
  const { id, disposition } = editedDisposition
  return db('results').where('animal_id', id).update({ disposition })
}

module.exports = {
  getFinalResultById,
  addDispositionResult,
}
