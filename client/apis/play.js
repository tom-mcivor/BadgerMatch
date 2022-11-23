import request from 'superagent'

export function getAnimals(auth0_id) {
  // No auth0 id passed yet. Will pass into route once auth0 is wired up.
  console.log(auth0_id) // Remove this once auth0_id has been resolved.
  return request
    .get(`/api/v1/play/`)
    .then((res) => {
      return res.body
    })
    .catch(errorHandler('GET', '/api/v1/play/:auth0_id'))
}

function errorHandler(method, route) {
  return (err) => {
    if (err.message === 'Not Found') {
      throw Error(
        `Error: You need to implement an API route for ${method} ${route}`
      )
    } else {
      throw Error(`${err.message} on ${method} ${route}`)
    }
  }
}
