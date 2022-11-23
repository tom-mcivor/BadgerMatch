import { getAnimalById, postResult } from '../apis/final'

export const SET_ANIMAL = 'SET_ANIMAL'
export const ADD_RESULT = 'ADD_RESULT'

export function setAnimal(animalData) {
  return {
    type: SET_ANIMAL,
    payload: animalData,
  }
}

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
