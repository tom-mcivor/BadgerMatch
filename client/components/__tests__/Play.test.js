import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { screen, render, waitFor } from '@testing-library/react'
import Play from '../Play'
import { useNavigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../store'
import { getUnRatedAnimals } from '../../apis/play'

const playAnimalsMockData = [
  {
    id: 1,
    uploaderId: 'mockID',
    name: 'mockName',
    description: 'mockCaptionText',
    imageUrl: 'mockImageUrl',
  },
  {
    id: 2,
    uploaderId: 'mockID',
    name: 'mockName',
    description: 'mockCaptionText',
    imageUrl: 'mockImageUrl',
  },
  {
    id: 3,
    uploaderId: 'mockID',
    name: 'mockName',
    description: 'mockCaptionText',
    imageUrl: 'mockImageUrl',
  },
]

beforeEach(() => {
  jest.resetAllMocks()
})

jest.mock('react-router-dom')
jest.mock('../../apis/play')

describe('<Play />', () => {
  it('displays two random animals images from api call', () => {
    expect.assertions(3)
    getUnRatedAnimals.mockReturnValue(Promise.resolve(playAnimalsMockData))
    render(
      <Provider store={store}>
        <Play />
      </Provider>
    )
    return waitFor(() => getUnRatedAnimals.mock.calls.length > 0).then(() => {
      const animalName = screen.getAllByTestId('animalTile')
      expect(animalName).toHaveLength(2)
      const buttons = screen.getAllByRole('button')
      const pickButtons = screen.getAllByRole('button', { name: 'Pick Me' })
      // Tiles count as buttons due to its component design
      expect(pickButtons).toHaveLength(2)
      expect(buttons).toHaveLength(5)
    })
  })
  it('Navigates to Final page', async () => {
    expect.assertions(1)
    useNavigate.mockImplementation(() => {})
    getUnRatedAnimals.mockReturnValue(Promise.resolve(playAnimalsMockData))
    render(
      <Provider store={store}>
        <Play />
      </Provider>
    )
    return waitFor(() => getUnRatedAnimals.mock.calls.length > 0).then(() => {
      userEvent.click(screen.getAllByRole('button')[0])
      expect(useNavigate).toHaveBeenCalled()
    })
  })
})
