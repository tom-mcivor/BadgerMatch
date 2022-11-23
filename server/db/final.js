const connection = require('./connection')

// get final animal (from results table)
// get animal by id

function getAnimalById(id, db = connection) {
  return db('animals')
    .where({ id })
    .select(
      'animals.name as name',
      'animals.description as description',
      'animals.image_url as imageUrl'
    )
    .first()
}
// function getDispositionById
function addResult(newResult, db = connection) {
  return db('results').insert(newResult)
}

module.exports = {
  getAnimalById,
  addResult,
}
