// initialState to be an empty array upon "Play" ticket completion
const initialState = [
  {
    id: 1,
    uploaderId: '1',
    name: 'Bag Cat',
    description: 'Likes bags',
    image_url: '/images/bag-cat.jpg',
  },
  {
    id: 2,
    uploaderId: '1',
    name: 'Mug Pup',
    description: 'Lives in mugs',
    image_url: '/images/mug-pup.jpg',
  },
]

const play = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'ADD_DESTINATION':
      return [...state, payload]
    case 'DELETE_DESTINATION':
      return {
        ...state,
        items: state.items.filter((item, index) => index !== action.payload),
      }
    default:
      return state
  }
}

export default play
