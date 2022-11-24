import request from 'superagent'

export function getAnimals(auth0_id) {
  console.log(auth0_id) // When auth0 setup it will be passed as play/:aut0_id
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
