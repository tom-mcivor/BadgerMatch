import request from 'superagent'

export function getAnimals(auth0_id) {
  // No auth0 id passed yet. Will pass into route once auth0 is wired up.
  return request
    .get(`/api/v1/play/`)
    .then((res) => {
      return res.body
    })
    .catch(errorHandler('GET', '/api/v1/play/'))
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
