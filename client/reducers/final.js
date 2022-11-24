import { SET_ANIMAL, ADD_RESULT } from '../actions/final'
// initialState to be an empty array upon "Final" ticket completion
const initialState = []

const final = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_ANIMAL:
      return payload

    case ADD_RESULT:
      console.log(payload)
      return payload

    default:
      return state
  }
}

export default final
