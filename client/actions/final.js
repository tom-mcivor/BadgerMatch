import { getAnimalById, postResult } from '../apis/final'

export const SET_ANIMAL = 'SET_ANIMAL'
export const ADD_RESULT = 'ADD_RESULT'

// simple action
export function setAnimal(animalData) {
  return {
    type: SET_ANIMAL,
    payload: animalData,
  }
}

// simple action postResult
export function submitResult(result) {
  return {
    type: ADD_RESULT,
    payload: result,
  }
}

// Thunk
// get animal by id
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

// add result to the table/db
export function addResult(result) {
  return (dispatch) => {
    return postResult(result)
      .then((newId) => {
        dispatch(submitResult({ ...result, id: newId }))
      })
      .catch((error) => {
        console.error(error.message)
      })
  }
}
