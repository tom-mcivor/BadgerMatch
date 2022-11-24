import React from 'react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { screen, render, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Final from '../Final'
import { fetchAnimal, addResult } from '../../actions/final'

const animalByIdMockData = {
  id: 1,
  auth0_id: '1',
  name: 'Bag Cat',
  description: 'Likes bags',
  imageUrl: '/images/bag-cat.jpg',
}

const resultMockData = {
  auth0_id: 1,
  animal_id: 1,
  created: new Date(Date.now()),
  disposition: 'friend',
}

jest.mock('../../actions/final')

beforeEach(() => {
  jest.clearAllMocks()
})

const fakeStore = {
  subscribe: jest.fn(),
  dispatch: jest.fn(),
  getState: jest.fn(() => {
    return { final: [animalByIdMockData, resultMockData] }
  }),
}

describe('<Final/>', () => {
  it('display image and animal name from redux state by ID.', () => {
    expect.assertions(2)
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Final />
        </BrowserRouter>
      </Provider>
    )
    const animalName = screen.getByText(animalByIdMockData.name, {
      exact: false,
    })
    expect(animalName).toBeTruthy()
    const image = screen.getByRole('img')
    console.log(image)
    expect(image.src).toMatch(animalByIdMockData.imageUrl)
  })

  it('dispatch the fetchAnimal thunk', () => {
    expect.assertions(1)
    const fetchAnimalContentMockReturn = () => 'mockReturnFunctionsReturnValue'
    fetchAnimal.mockReturnValue(fetchAnimalContentMockReturn)
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Final />
        </BrowserRouter>
      </Provider>
    )
    expect(fakeStore.dispatch).toHaveBeenCalledWith(
      fetchAnimalContentMockReturn
    )
  })

  it('save button event to redux state', () => {
    expect.assertions(1)
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Final />
        </BrowserRouter>
      </Provider>
    )
    const result = screen.getAllByRole('button')[0]
    fireEvent.click(result, { target: { value: 'friend' } })
    const state = fakeStore.getState()
    expect(state.final[1].disposition).toContain(resultMockData.disposition)
  })
  it.todo('dispatch the addResult thunk', () => {
    expect.assertions(1)
    const addResultContentMockReturn = () => 'mockReturnFunctionsReturnValue'
    fetchAnimal.mockReturnValue(addResultContentMockReturn)
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Final />
        </BrowserRouter>
      </Provider>
    )
    expect(fakeStore.dispatch).toHaveBeenCalledWith(addResultContentMockReturn)
  })
})
