const knex = require('knex')
const testConfig = require('../knexfile').test
const testDb = knex(testConfig)

const { getRandomAnimal } = require('../home')
const { homeContentMockData } = require('../../../test/fake-data')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getRandomAnimal', () => {
  it('gets the animal from the animals table in the database.', () => {
    expect.assertions(2)
    return getRandomAnimal(testDb).then((animal) => {
      expect(homeContentMockData).toContainEqual(animal)
      expect(Object.keys(animal)).toHaveLength(5)
    })
  })
})
