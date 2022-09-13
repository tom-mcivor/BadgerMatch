import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './Home.module.scss'

import { fetchHomeContent } from '../actions/home'

export default function Home() {
  const dispatch = useDispatch()
  const homeContent = useSelector((state) => state.home)

  useEffect(() => dispatch(fetchHomeContent()), [])

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}> Welcome to Lettuce Meat!</h1>
      <div className={styles.text}>
        <p>Yummy {homeContent.name}!</p>
      </div>
      <div>
        <img
          className={styles.image}
          src={homeContent.imageUrl}
          alt={homeContent.description}
        />
      </div>
      <Link to='/play'>
        <button className={styles.button}>Meat your match!</button>
      </Link>
    </div>
  )
}
