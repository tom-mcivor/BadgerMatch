import request from 'superagent'

const rootUrl = '/api/v1'
// can we use '/api/v1/final'?????

// GET /api/v1/final/:id
export function getAnimalById(id) {
  return request.get(`${rootUrl}/final/${id}`).then((res) => {
    console.log(res.body)
    return res.body
  })
}

// POST /api/vi/final
export function postResult(newResult) {
  return request
    .post(`${rootUrl}/final`)
    .send(newResult)
    .then((res) => {
      return res.body
    })
}
