import React, { useEffect } from 'react'
import { fetchResults } from '../actions/results'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Results.module.scss'

export default function Results() {
  const dispatch = useDispatch()
  const results = useSelector((state) => state.results)

  useEffect(() => {
    dispatch(fetchResults())
  }, [])
  

  return (
    <>
      <h1 className={styles.resultsheading} >Your Previous Results</h1>
      {results.map((result) => {
        const { id, created, disposition, name, description, imageUrl } = result

        const date = new Date(`${created}` * 1).toLocaleString()

        const friendOrFoeColour = (`${disposition}` == 'friend' ? 'green' : 'red')
        const textColour = {
          color: `${friendOrFoeColour}`,
        }

        if (!result) return <></>
        return (
          <div className={styles.resultscontainer} key={id}>
            <div className={styles.item1}>
              <img className={styles.image} src={imageUrl} width={400} alt={name} />
            </div>
            <div className={styles.item2}>
              <h2 className={styles.friendorfoe} > Friend or Foe? <p style={textColour}>{disposition.toUpperCase()}</p></h2>
              <p className={styles.name} >My name is {name}</p>
              <p>We met on: {date}</p>
              <p>About me: {description}</p>
            </div>
          </div>
        )
      }
      )}
    </>
  )
}
