const request = require('supertest')
const server = require('../../server')

const {
  getFinalResultById,
  addDispositionResult,
} = require('../../db/final.js')
jest.spyOn(console, 'error')
jest.mock('../../db/final.js')
afterEach(() => {
  console.error.mockReset()
})

const getFinalResultIdMockData = [
  {
    id: 1,
    animal_id: 2,
    name: 'Bag Cat',
    description: 'Likes bags',
    image_url: '/images/bag-cat.jpg',
    created: 1669152197438,
    disposition: 'friend',
  },
  {
    id: 2,
    animal_id: 3,
    name: 'Mug Pup',
    description: 'Lives in mugs',
    image_url: '/images/mug-pup.jpg',
    created: 1669152197438,
    disposition: 'foe',
  },
]

describe('GET /api/vi/final/:id', () => {
  it('should return status 200 and a joint table when successful', () => {
    expect.assertions(2)
    getFinalResultById.mockReturnValue(
      Promise.resolve(getFinalResultIdMockData)
    )
    return request(server)
      .get('/api/v1/final/1')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(getFinalResultIdMockData).toEqual(res.body)
      })
  })
  it('should return status 500 and an error message when database fails.', () => {
    expect.assertions(2)
    getFinalResultById.mockImplementation(() =>
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
