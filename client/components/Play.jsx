import React, { useEffect, useState } from 'react'
import { getAnimals } from '../apis/play'

export default function Play() {
  const [animalsToRate, setAnimals] = useState([])

  let auth0_id = '1' // Testing that auth0_id works, setting auth0_id to 1
  console.log(animalsToRate) // Remove this once it has been used in the component.

  // Remove above once authentication is setup.
  useEffect(() => {
    getAnimals(auth0_id)
      .then((animalsToRate) => {
        setAnimals(animalsToRate)
        if (animalsToRate.length < 2) {
          console.log('re-direct') // Put front end re-direct function here
        }
        let animalsToDisplay = randomToRate(animalsToRate)
        console.log(animalsToDisplay, 'To display') // Use these values on front end
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

  return (
    <>
      <h1>PLAY PAGE :D</h1>
    </>
  )
}
