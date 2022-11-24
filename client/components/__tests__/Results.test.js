import React from 'react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { screen, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Results from '../Results'
import { fetchResults } from '../../actions/results'

const resultContentMockData = [{
  name: 'Penguin',
  imageUrl: '/penguin.png',
  description: `I'm a lovely penguin`,
  disposition: 'friend'
},
{
  name: 'Puppy',
  imageUrl: '/puppy.png',
  description: `I'm a naughty puppy`,
  disposition: 'foe'
},
{
  name: 'Potato',
  imageUrl: '/potato.png',
  description: `I'm a stud I mean spud`,
  disposition: 'friend'
}
]

jest.mock('../../actions/results')

beforeEach(() => {
  jest.clearAllMocks()
})

const fakeStore = {
  subscribe: jest.fn(),
  dispatch: jest.fn(),
  getState: jest.fn(() => {
    return { results: resultContentMockData }
  }),
}

describe('<Results />', () => {
  it('displays image, animal name, description and disposition from redux state.', () => {
    expect.assertions(4)
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Results />
        </BrowserRouter>
      </Provider>
    )
    const animalName = screen.getAllByText(/penguin/i)
    expect(animalName[0]).toBeInTheDocument()
    const animalDescription = screen.getByText(resultContentMockData[1].description, {
      exact: false,
    })
    expect(animalDescription).toBeInTheDocument(`I'm a naughty puppy`)
    const animalDisposition = screen.getAllByText(resultContentMockData[2].disposition, {
      exact: false,
    })
    expect(animalDisposition[4].innerHTML).toContain('FRIEND')
    
    const image = screen.getAllByRole('img')[0]
    expect(image.src).toMatch('/penguin.png')
  })
  it('dispatches the fetchResults thunk.', () => {
    expect.assertions(1)
    const fetchResultContentMockReturn = () => 'mockReturnFunctionsReturnValue'
    fetchResults.mockReturnValue(fetchResultContentMockReturn)
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Results />
        </BrowserRouter>
      </Provider>
    )
    expect(fakeStore.dispatch).toHaveBeenCalledWith(fetchResultContentMockReturn)
  })
  it('checks if the correct amount of animals show on the page', () => {
    expect.assertions(1)
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Results />
        </BrowserRouter>
      </Provider>
    )
    const animalLength = screen.getAllByRole('banner')
    expect(animalLength).toHaveLength(3)
  })
})

// const animalsLength = resultContentMockData.length