import {
  getUpload,
} from '../apis/uploads'

export const SHOW_UPLOADS = 'SHOW_UPLOADS'

export function showUpload(user){
  return {
    type: 'SHOW_UPLOADS',
    payload: user
  }
}

export default function fetchUploads(){
  return (dispatch) => {
    return getUpload()
    .then((user) => {
      dispatch(showUpload(user))
      return null
    })
    .catch((err) => console.error(err.message))
  }
}