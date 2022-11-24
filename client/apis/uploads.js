import request from 'superagent'

export function getUpload() {
  return request.get('/api/v1/uploads/').then((res) => {
    return res.body
  })
}