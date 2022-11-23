import React, { useEffect } from 'react'
import { fetchResults } from '../actions/results'
import { useDispatch, useSelector } from 'react-redux'

export default function Results() {
  const dispatch = useDispatch()
  const results = useSelector((state) => state.results)

  console.log(results, 'results');

  useEffect(() => {
    dispatch(fetchResults())
  }, [])
  
  return (
    <>
     <h1>Your Previous Results</h1>
      {results.map((result, key) => {
      return (
        <div key={key}> 
        <img src={result?.imageUrl} width={400} alt={result?.name}/>
        </div>
      )}
      )}
    </>
)}
