import request from 'superagent'


//maybe this if just get it based off the auth user?
// export function getResult(auth0Id) {
//   return request.get(`/api/v1/results/${auth0Id}`).then((res) => res.body)
// }

//maybe this if need all??
export function getResult() {
  return request.get('/api/v1/results/').then((res) => {
    return res.body
  })
}