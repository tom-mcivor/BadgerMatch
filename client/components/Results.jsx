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
      {results.map((result, key) => {
        const date = new Date(`${result?.created}`*1).toLocaleString()
      
        const friendOrFoeColour = ( `${result?.disposition}` == 'friend' ? 'green' : 'red')
        const textColour = {
          color: `${friendOrFoeColour}`,
        }

      return (
        <div className={styles.resultscontainer} key={key}> 
          <div className={styles.item1}>
          <img className={styles.image} src={result?.imageUrl} width={400} alt={result?.name}/>
          </div>
          <div className={styles.item2}>
          <div className={styles.friendorfoe} > Friend or Foe? <div style={textColour}>{result?.disposition.toUpperCase()}</div></div>
          <div className={styles.name} >My name is {result?.name}</div>
          <div>We met on: {date}</div>
          <div>About me: {result?.description}</div>
          </div>
        </div>
      )}
      )}
    </>
)}
