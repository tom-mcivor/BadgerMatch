import React, { useEffect, useState } from 'react'
import AnimalTile from './AnimalTile'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchAnimal } from '../actions/final'

export default function Final() {
  // take id from the route params
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const singleAnimal = useSelector((state) => state.final)

  const id = Number(params.id)

  useEffect(() => {
    dispatch(fetchAnimal(id))
  }, [])

  return (
    <>
      <form action=''>
        <button></button>
      </form>
      <h1>Final PAGE :D</h1>
      <p>{singleAnimal.name}</p>
      <p>{singleAnimal.description}</p>
      <img src={singleAnimal.imageUrl} alt={singleAnimal.name} />
      <AnimalTile animal={singleAnimal} />
    </>
  )
}

// When the Final page first loads it will need to take the id from the route parameters and load that animal from the DB into redux state. Once the animal is loaded, we will display the animal on screen (you can make use of the AnimalTile component to display it). The user will make a final selection between "Friend" or "Foe" and send a request to our server to record this result in our results table. Afterwards the user is redirected to the Winner page which shows the result from the redux state.

// Use the client/components/Final.jsx component to dispatch the thunk action (created above) and to provide the user a choice between friend or foe

// take id from the route params DONE
// load animal from database using that param id DONE
// display animal data on screen (animal tile component)
// POST form, add/send result back to database
// navigate to /play/winner
