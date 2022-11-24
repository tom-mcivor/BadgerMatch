import { SHOW_UPLOADS } from '../../actions/uploads'
import uploadReducer from '../uploads'

const uploads = [
  {
    name: 'Penguin',
    imageUrl: '/penguin.png',
    description: `I'm a lovely penguin`,
    disposition: 'friend',
  },
  {
    name: 'Puppy',
    imageUrl: '/puppy.png',
    description: `I'm a naughty puppy`,
    disposition: 'foe',
  },
  {
    name: 'Potato',
    imageUrl: '/potato.png',
    description: `I'm a stud I mean spud`,
    disposition: 'friend',
  },
]

describe('uploads reducer', () => {
  it('returns the action payload for type SHOW_UPLOADS.', () => {
    const action = {
      type: SHOW_UPLOADS,
      payload: uploads,
    }
    const initialState = []
    const expectedState = uploads
    const outputState = uploadReducer(initialState, action)

    expect(outputState).toEqual(expectedState)
    expect(outputState).not.toBe(initialState)
  })
  // enable once we have backend redux wired up
  it('returns the default initial state for an undefined state and no action type.', () => {
    const expectedState = []
    const outputState = uploadReducer(undefined, {})

    expect(outputState).toEqual(expectedState)
  })
})
