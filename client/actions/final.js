import { getAnimalById, postResult } from '../apis/final'

export const SET_ANIMAL = 'SET_ANIMAL'
export const ADD_RESULT = 'ADD_RESULT'
// 2. Create client/actions/final.js
// Simple
// SET_ANIMAL
// ADD_RESULT

export function setAnimal(animalId) {
  return {
    type: SET_ANIMAL,
    payload: animalId,
  }
}

// Thunk
// GET_ANIMAL > dispatch request to api > once we get it,
export function fetchAnimal(id) {
  return (dispatch) => {
    return getAnimalById(id)
      .then((animalData) => {
        dispatch(setAnimal(animalData))
      })
      .catch((error) => {
        console.error(error.message)
      })
  }
}
