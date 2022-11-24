import React from 'react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { screen, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Uploads from '../Uploads'
import fetchUploads from '../../actions/uploads'

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

jest.mock('../../actions/uploads')

beforeEach(() => {
  jest.clearAllMocks()
})

const fakeStore = {
  subscribe: jest.fn(),
  dispatch: jest.fn(),
  getState: jest.fn(() => {
    return { results: uploads }
  }),
}

describe('<Uploads />', () => {
  it('displays animal name, about me and imageUrl from redux state.', () => {
    expect.assertions(3)
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Uploads />
        </BrowserRouter>
      </Provider>
    )
    const animalName = screen.getAllByText(/Bag Cat/i)
    expect(animalName[0]).toBeInTheDocument()

    const animalDescription = screen.getByText(uploads[1].description, {
      exact: false,
    })
    expect(animalDescription.innerHTML).toContain(`Lives in mugs`)

    const image = screen.getAllByRole('img')[0]
    expect(image.src).toMatch('/images/bag-cat.jpg')
  })
  // This won't work until the back end is wired up
  it.skip('dispatches the fetchUploads thunk.', () => {
    expect.assertions(1)
    const fetchUploadContentMockReturn = () => 'mockReturnFunctionsReturnValue'
    fetchUploads.mockReturnValue(fetchUploadContentMockReturn)
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Uploads />
        </BrowserRouter>
      </Provider>
    )
    expect(fakeStore.dispatch).toHaveBeenCalledWith(
      fetchUploadContentMockReturn
    )
  })
  it('check amount of uploads matches', () => {
    render(<Uploads />)
    const listUpdates = screen.getAllByRole('img')
    expect(listUpdates).toHaveLength(4)
  })
})
