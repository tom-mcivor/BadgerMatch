/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Uploads.module.scss'
import fetchUploads from '../actions/uploads'

export default function Uploads() {
  const dispatch = useDispatch()
  const uploads = useSelector((state) => state.uploads)

  useEffect(() => {
    dispatch(fetchUploads())
  }, [])

  return (
    <>
      <h1 className={styles.heading}>Your Previous Uploads</h1>
      {uploads.map((animal, i) => {
        return (
          <div key={i} className={styles.uploadsContainer}>
            <div className={styles.containerOne}>
              <img
                className={styles.image}
                src={animal.imageUrl}
                alt={animal.name}
              />
            </div>
            <div className={styles.containerTwo}>
              <p>Hi, my name is {animal.name}</p>
              <p>About me: {animal.description}</p>
            </div>
          </div>
        )
      })}
    </>
  )
}
