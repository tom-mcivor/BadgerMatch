import { fetchAnimal, addResult, SET_ANIMAL, ADD_RESULT } from '../final'
import { getAnimalById, postResult } from '../../apis/final'

jest.mock('../../apis/final')

const fakeDispatch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

const animalByIdMockData = {
  id: 2,
  auth0_id: '1',
  name: 'Mug Pup',
  description: 'Lives in mugs',
  image_url: '/images/mug-pup.jpg',
}

const resultMockData = {
  auth0_id: 1,
  animal_id: 1,
  created: new Date(Date.now()),
  disposition: 'friend',
}

describe('fetchAnimal', () => {
  it('dispatchs the SET_ANIMAL action', () => {
    expect.assertions(2)
    getAnimalById.mockImplementation((id) => {
      expect(id).toBe(2)
      return Promise.resolve(animalByIdMockData)
    })
    return fetchAnimal(2)(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: SET_ANIMAL,
        payload: animalByIdMockData,
      })
    })
  })
  it('should console.error() if api request fails', () => {
    expect.assertions(1)
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
    getAnimalById.mockImplementation(() =>
      Promise.reject(new Error('No animal returned'))
    )
    return fetchAnimal()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('No animal returned')
    })
  })
})

// addResult thunk + action simple
describe('addResult', () => {
  it('dispatches the ADD_RESULT action', () => {
    expect.assertions(1)
    postResult.mockReturnValue(Promise.resolve(1))
    return addResult(resultMockData)(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: ADD_RESULT,
        payload: { ...resultMockData, id: 1 },
      })
    })
  })
  it('should console.error() if api request fails', () => {
    expect.assertions(1)
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
    postResult.mockImplementation(() =>
      Promise.reject(new Error('No id returned to confirm post'))
    )
    return addResult()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith(
        'No id returned to confirm post'
      )
    })
  })
})
