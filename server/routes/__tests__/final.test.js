const request = require('supertest')
const server = require('../../server')

const { getAnimalById, addResult } = require('../../db/final.js')
jest.spyOn(console, 'error')

jest.mock('../../db/final.js')

afterEach(() => {
  console.error.mockReset()
})

const getAnimalByIdData = {
  id: 1,
  animal_id: 2,
  name: 'Bag Cat',
  description: 'Likes bags',
  image_url: '/images/bag-cat.jpg',
  created: 1669152197438,
  disposition: 'friend',
}

const addNewResultData = {
  id: 1,
  auth0_id: 1,
  animal_id: 1,
  created: new Date(Date.now()),
  disposition: 'friend',
}

describe('GET /api/vi/final/:id', () => {
  it('should return status 200 and a joint table when successful', () => {
    expect.assertions(2)
    getAnimalById.mockReturnValue(Promise.resolve(getAnimalByIdData))
    return request(server)
      .get('/api/v1/final/1')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(getAnimalByIdData).toEqual(res.body)
      })
  })
  it('should return status 500 and an error message when database fails.', () => {
    expect.assertions(2)
    getAnimalById.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .get('/api/v1/final/1')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Something went wrong')
      })
  })
})

describe('POST /api/v1/final/', () => {
  it('should return status 200 and an updated table when successful', () => {
    // expect.assertions(2)
    addResult.mockImplementation(() => Promise.resolve(addNewResultData))
    return request(server)
      .post('/api/v1/final')
      .send(addNewResultData)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(addNewResultData).toEqual(res.body)
      })
  })
  it('should return status 500 and an error message when database fails.', () => {
    // expect.assertions(2)
    addResult.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .post('/api/v1/final')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Something went wrong')
      })
  })
})
