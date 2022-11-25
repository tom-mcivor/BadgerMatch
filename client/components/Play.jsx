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

  function refreshAnimals() {
    getAnimals()
      .then((animalsToRate) => {
        setAnimals(animalsToRate)
        if (animalsToRate.length < 2) {
          addAnimalToRedux(animalsToRate)
        }
        setAnimals(randomToRate(animalsToRate))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  useEffect(() => {
    refreshAnimals()
  }, [])

  function randomToRate(animalsToRate) {
    let indexLength = animalsToRate.length
    let num1 = Math.floor(Math.random() * indexLength)
    let num2 = 0
    // The while loop will only run if the two values are the same
    do {
      num2 = Math.floor(Math.random() * indexLength)
    } while (num1 === num2)
    return [animalsToRate[num1], animalsToRate[num2]]
  }

  function addAnimalToRedux(animal) {
    dispatch(updateAnimals(animal))
    navigate(`/play/final/${animal.id}`)
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
      <div className='animalCards'>
        <button className='refreshButton' onClick={() => refreshAnimals()}>
          Refresh Choices
        </button>
      </div>
    </>
  )
}
