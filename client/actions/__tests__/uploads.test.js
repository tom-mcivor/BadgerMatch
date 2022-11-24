import fetchUploads, { SHOW_UPLOADS } from '../uploads'
import { getUploads } from '../../apis/uploads'

jest.mock('../../apis/uploads')

const fakeDispatch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

const uploads = [
  {
    id: 1,
    auth0_id: '1',
    name: 'Bag Cat',
    description: 'Likes bags',
    image_url: '/images/bag-cat.jpg',
  },
  {
    id: 2,
    auth0_id: '1',
    name: 'Mug Pup',
    description: 'Lives in mugs',
    image_url: '/images/mug-pup.jpg',
  },
  {
    id: 3,
    auth0_id: '2',
    name: 'Elephant',
    description: 'Just happy to exist',
    image_url:
      'https://www.top5.com/wp-content/uploads/2018/08/cute-baby-animals-baby-elements.jpeg',
  },
  {
    id: 4,
    auth0_id: '3',
    name: 'Snow Fox',
    description: 'Wants a blanket',
    image_url:
      'https://www.top5.com/wp-content/uploads/2018/08/cute-baby-photos-fox-in-the-snow.png',
  },
]

describe('Uploads page', () => {
  it('dispatches the SHOW_UPLOADS action.', () => {
    getUploads.mockReturnValue(Promise.resolve(uploads))
    return fetchUploads()(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: SHOW_UPLOADS,
        payload: uploads,
      })
    })
  })
  it('should console.error() if api request fails.', () => {
    expect.assertions(1)
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
    getUploads.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return fetchUploads()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('Something went wrong')
    })
  })
})
