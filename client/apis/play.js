import request from 'superagent'

export function getAnimals() {
  return request
    .get(`/api/v1/play/`)
    .then((res) => {
      return res.body
    })
    .catch((e) => console.log(e))
}
