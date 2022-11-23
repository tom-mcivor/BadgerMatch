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
    expect.assertions(4)
    let auth0_id = 1 // Will need to be updated
    let animalExpected = 'Snow Fox' // Will appear as long as 'Bag Cat' is not rated
    return getRatedBadgers(auth0_id, testDb).then((animals) => {
      expect(animals[0].name).toBe(animalExpected)
      expect(animals[0].imageUrl).toBe(
        'https://www.top5.com/wp-content/uploads/2018/08/cute-baby-photos-fox-in-the-snow.png'
      )
      expect(animals[0].description).toBe('Wants a blanket')
      expect(animals).toHaveLength(1)
    })
  })
})
