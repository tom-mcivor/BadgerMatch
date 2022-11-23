import request from 'superagent'

const API_URL = 'http://localhost:3000'

export const getS3Url = async () => {
  const res = await request.get(`${API_URL}/api/v1/create/s3Url`)
  return res.body
}

export const create = async (animal) => {
  const res = await request.post(`${API_URL}/api/v1/create`).send(animal)
  return res.body
}

export const fetchUrl = async (uploadUrl, file) => {
  await request.put(uploadUrl).send(file)
}
