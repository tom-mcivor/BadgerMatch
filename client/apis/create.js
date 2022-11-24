import request from 'superagent'

export const getS3Url = async (token) => {
  const response = await request
    .get('/api/v1/create/s3Url')
    .set('Authorization', `Bearer ${token}`)
  return response.body
}

export const fetchUrl = async (url, file) => {
  await request.put(url).send(file)
}

export const create = async (animal, token) => {
  console.log('token', token)
  const response = await request
    .post('/api/v1/create')
    .set('Authorization', `Bearer ${token}`)
    .send(animal)

  return response.body
}
