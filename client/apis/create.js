import request from 'superagent'

const API_URL = 'http://localhost:3000'

export const getS3Url = async () => {
  const res = await request.get(`${API_URL}/api/v1/create/s3Url`)
  return res.body
}
