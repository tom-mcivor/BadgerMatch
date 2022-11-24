import { fetchAnimal, addResult, SET_ANIMAL, ADD_RESULT } from '../final'
import { getAnimalById, postResult } from '../../apis/final'

jest.mock('../../apis/final')

const fakeDispatch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

const animadByIdMockData = {
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
    expect.assertions(1)
    getAnimalById.mockReturnValue(Promise.resolve(animadByIdMockData))
    return fetchAnimal()(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: SET_ANIMAL,
        payload: animadByIdMockData,
      })
    })
  })
})
