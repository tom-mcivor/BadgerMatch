import { getResult } from '../apis/results'

export const SHOW_RESULTS = 'SHOW_RESULTS'

export function showResult(user) {
  return {
    type: 'SHOW_RESULTS',
    payload: user,
  }
}

export function fetchResults() {
  console.log('dispatched')
  return (dispatch) => {
    return getResult()
      .then((result) => {
        console.log('result action', result)
        dispatch(showResult(result))
        return null
      })
      .catch((err) => console.error(err.message))
  }
}
