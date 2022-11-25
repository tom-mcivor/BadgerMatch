import request from 'superagent'

export function getResult() {
  return request.get('/api/v1/results/').then((res) => {
    return res.body
  })
}