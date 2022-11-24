import { SET_ANIMAL, ADD_RESULT } from '../../actions/final'
import final from '../final'

const animalByIdMockData = {
  id: 2,
  auth0_id: '1',
  name: 'Mug Pup',
  description: 'Lives in mugs',
  image_url: '/images/mug-pup.jpg',
}

const resultMockData = {
  id: 1,
  auth0_id: 1,
  animal_id: 1,
  created: new Date(Date.now()),
  disposition: 'friend',
}

describe('final reducer', () => {
  it('return the action payload for type SET_ANIMAL', () => {
    expect.assertions(2)
    const action = { type: SET_ANIMAL, payload: animalByIdMockData }

    const initialState = []
    const expectedState = animalByIdMockData
    const outputState = final(initialState, action)

    expect(outputState).toEqual(expectedState)
    expect(outputState).not.toBe(initialState)
  })
  it('return the action for type ADD_RESULT', () => {
    expect.assertions(2)
    const action = {
      type: ADD_RESULT,
      payload: resultMockData,
    }
    const initialState = []
    const expectedState = resultMockData
    const outputState = final(initialState, action)

    expect(outputState).toEqual(expectedState)
    expect(outputState).not.toBe(initialState)
  })

  it('returns the default initial state for undefined state and no action type', () => {
    expect.assertions(1)
    const expectedState = []
    const outputState = final(undefined, {})

    expect(outputState).toEqual(expectedState)
  })
})
