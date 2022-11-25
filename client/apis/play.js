import request from 'superagent'

export function getUnRatedAnimals() {
  return request
    .get(`/api/v1/play/`)
    .then((res) => {
      return res.body
    })
    .catch((e) => console.log(e))
}
