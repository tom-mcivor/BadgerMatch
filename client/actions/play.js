export const ADD_ANIMALS = 'ADD_ANIMALS'
export const DELETE_ANIMALS = 'DELETE_ANIMALS'

export function addAnimals(animals){
  return(
    type:'ADD_ANIMALS',
    payload: animals,
  )
}

export function deleteAnimals(animals){
  return(
    type:'DELETE_ANIMALS',
    payload: animals,
  )
}