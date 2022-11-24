import React, { useEffect, useState } from 'react'
import { getAnimals } from '../apis/play'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AnimalTile from './AnimalTile'
import '../styles/index.scss'
import { updateAnimals } from '../actions/play'

export default function Play() {
  const [animalsToRate, setAnimals] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let auth0_id = '1' // Testing that auth0_id works, setting auth0_id to 1
  // Remove this once it has been used in the component.

  // Remove above once authentication is setup.
  useEffect(() => {
    getAnimals(auth0_id)
      .then((animalsToRate) => {
        setAnimals(animalsToRate)
        if (animalsToRate.length < 2) {
          // First need to clear the saved animals
          addAnimalToRedux(animalsToRate)
          navigate('/final')
        }
        setAnimals(randomToRate(animalsToRate))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }, [])

  // Randomization function to choose which animals to display
  function randomToRate(animalsToRate) {
    let indexLength = animalsToRate.length
    let num1 = Math.floor(Math.random() * indexLength)
    let num2 = 0
    do {
      num2 = Math.floor(Math.random() * indexLength)
    } while (num1 === num2)
    return [animalsToRate[num1], animalsToRate[num2]]
  }

  // Adds the chosen or left-over animal to redux for final to call
  function addAnimalToRedux(animal) {
    dispatch(updateAnimals(animal))
    navigate('/final')
  }

  return (
    <>
      <h1>Pick something chump</h1>
      <div className='animalCards'>
        {animalsToRate.map((animal) => {
          return (
            <div
              key={animal.id}
              className='animalTileWithButton'
              data-testid='animalTile'
            >
              <AnimalTile animal={animal} />
              <div className='pickButtonContainer'>
                <button
                  className='pickButton'
                  onClick={() => addAnimalToRedux(animal)}
                >
                  Pick Me
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
