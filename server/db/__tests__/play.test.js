const knex = require('knex')
const testConfig = require('../knexfile').test
const testDb = knex(testConfig)

const { getRatedBadgers } = require('../play')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getUnRatedAnimals', () => {
  it('gets the animal that have not been rated.', () => {
    expect.assertions(5)
    let auth0_id = 1 // Will need to be updated
    let animalExpected = [
      {
        id: 4,
        uploaderId: '3',
        name: 'Snow Fox',
        description: 'Wants a blanket',
        imageUrl:
          'https://www.top5.com/wp-content/uploads/2018/08/cute-baby-photos-fox-in-the-snow.png',
      },
    ]
    return getRatedBadgers(auth0_id, testDb).then((animals) => {
      expect(animals).toEqual(animalExpected)
      expect(animals[0].imageUrl).toBe(animalExpected[0].imageUrl)
      expect(animals[0].description).toBe(animalExpected[0].description)
      expect(animals[0].uploaderId).toBe(animalExpected[0].uploaderId)
      expect(animals).toHaveLength(1)
    })
  })
})
