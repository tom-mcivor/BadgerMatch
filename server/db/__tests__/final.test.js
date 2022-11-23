const knex = require('knex')
const testConfig = require('../knexfile').test
const testDb = knex(testConfig)

const { getFinalResultById, addDispositionResult } = require('../final')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getFinalResultsById', () => {
  it('gets the final result from the joint table', () => {
    expect.assertions(1)
    return getFinalResultById(1, testDb).then((finalResult) => {
      expect(finalResult.name).toBe('Bag Cat')
    })
  })
  it('update disposition in results table', () => {
    expect.assertions(1)
    const editedDisposition = { id: 1, disposition: 'apple' }
    return addDispositionResult(editedDisposition, testDb).then(
      (updatedResult) => {
        expect(updatedResult).toBe(editedDisposition.id)
      }
    )
  })
})
