import { SET_ANIMAL, ADD_RESULT } from '../../actions/final'
import final from '../final'

const animalByIdMockData = {
  id: 2,
  auth0_id: '1',
  name: 'Mug Pup',
  description: 'Lives in mugs',
  image_url: '/images/mug-pup.jpg',
}

const resultMockData = {
  auth0_id: 1,
  animal_id: 1,
  created: new Date(Date.now()),
  disposition: 'friend',
}
