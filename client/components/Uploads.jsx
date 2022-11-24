/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Uploads.module.scss'
import fetchUploads from '../actions/uploads'

export default function Uploads() {
  // Not using atm - using mock data instead

  // const dispatch = useDispatch()
  // const uploads = useSelector((state) => state.uploads)

  // useEffect(() => {
  //   dispatch(fetchUploads())
  // }, [])

  return (
    <>
      <h1 className={styles.heading}>Your Previous Uploads</h1>
      {uploads.map((animal, i) => {
        return (
          <div key={i} className={styles.uploadscontainer}>
            <div className={styles.containerone}>
              <img
                className={styles.image}
                src={animal.image_url}
                alt={animal.name}
              />
            </div>
            <div className={styles.containertwo}>
              <p>Hi, my name is {animal.name}</p>
              <p>About me: {animal.description}</p>
            </div>
          </div>
        )
      })}
    </>
  )
}

const uploads = [
  {
    id: 1,
    auth0_id: '1',
    name: 'Bag Cat',
    description: 'Likes bags',
    image_url: '/images/bag-cat.jpg',
  },
  {
    id: 2,
    auth0_id: '1',
    name: 'Mug Pup',
    description: 'Lives in mugs',
    image_url: '/images/mug-pup.jpg',
  },
  {
    id: 3,
    auth0_id: '2',
    name: 'Elephant',
    description: 'Just happy to exist',
    image_url:
      'https://www.top5.com/wp-content/uploads/2018/08/cute-baby-animals-baby-elements.jpeg',
  },
  {
    id: 4,
    auth0_id: '3',
    name: 'Snow Fox',
    description: 'Wants a blanket',
    image_url:
      'https://www.top5.com/wp-content/uploads/2018/08/cute-baby-photos-fox-in-the-snow.png',
  },
]
