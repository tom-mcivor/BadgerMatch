const knex = require('knex')
const testConfig = require('../knexfile').test
const testDb = knex(testConfig)

const { getAnimals } = require('../home')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getAnimals', () => {
  it('gets the animal from the animals table in the database.', () => {
    expect.assertions(3)
    return getAnimals(testDb).then((animals) => {
      expect(animals[0].name).toBe('Bag Cat')
      expect(animals[1].imageUrl).toBe('/images/mug-pup.jpg')
      expect(animals).toHaveLength(4)
    })
  })
})
