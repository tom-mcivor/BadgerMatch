export const ADD_ANIMALS = 'ADD_ANIMALS'
export const DELETE_ANIMALS = 'DELETE_ANIMALS'
export const REPLACE_ANIMALS = "REPLACE_ANIMALS"

export function replaceAnimals(animals){
  return(
    type:'REPLACE_ANIMALS',
    payload: animals,
  )
}