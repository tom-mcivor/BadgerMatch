import request from 'superagent'

export function getAnimals(auth0_id) {
  return request
    .get(`/api/v1/play/${auth0_id}`)
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
