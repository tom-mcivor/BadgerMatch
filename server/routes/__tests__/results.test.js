const request = require('supertest')
const server = require('../../server')

const { getResult } = require('../../db/results')
jest.mock('../../db/results')

jest.spyOn(console, 'error').mockImplementation(() => {})

beforeEach(() => {
  jest.resetAllMocks()
})

const getResultsMockData = [
  {
    auth0_id: 1,
    animal_id: 1,
    created: `${new Date(Date.now())}`,
    disposition: 'friend',
  },
  {
    auth0_id: 1,
    animal_id: 2,
    created: `${new Date(Date.now())}`,
    disposition: 'foe',
  },
]

describe('GET /api/v1/results/', () => {
  it('should return status 200 and results when database is successful.', () => {
    expect.assertions(2)
    getResult.mockReturnValue(Promise.resolve(getResultsMockData))
    return request(server)
      .get('/api/v1/results/')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toEqual(getResultsMockData) 
        console.log(res.body);
      })
  })
  it('should return status 500 and an error message when database fails.', () => {
    expect.assertions(2)
    getResult.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .get('/api/v1/results/')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Something went wrong')
      })
  })
})
