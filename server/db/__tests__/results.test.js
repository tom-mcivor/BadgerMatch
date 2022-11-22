const knex = require('knex')
const testConfig = require('../knexfile').test
const testDb = knex(testConfig)

const { getResult } = require('../results')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getResult', () => {
  it('gets the data from both the animals and results table in the db.', () => {
    expect.assertions(2)
    return getResult(1, testDb).then((result) => {
      expect(result[0].name).toBe('Bag Cat')
      expect(result).toHaveLength(3)
      })
    })
  })
