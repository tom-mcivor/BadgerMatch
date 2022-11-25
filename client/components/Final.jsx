import React, { useEffect } from 'react'
import AnimalTile from './AnimalTile'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAnimal, addResult } from '../actions/final'
import styles from './Final.module.scss'

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

  function handleResult(event) {
    event.preventDefault()
    const result = {
      animal_id: id,
    }
    dispatch(addResult({ ...result, disposition: event.target.value }))
    navigate('/play/winner')
  }

  return (
    <>
      <h2 className={styles.heading}>
        Will your companion be a Friend or Foe?
      </h2>
      <form className={styles.form}>
        <button
          className={styles.buttonFriend}
          value='friend'
          name='disposition'
          onClick={handleResult}
        >
          Friend?
        </button>
        <AnimalTile animal={singleAnimal} />
        <button
          className={styles.buttonFoe}
          value='foe'
          name='disposition'
          onClick={handleResult}
        >
          Foe?
        </button>
      </form>
    </>
  )
}
