import request from 'superagent'

export function getUploads() {
  return request.get('/api/v1/uploads/').then((res) => {
    return res.body
  })
}