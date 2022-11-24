import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { screen, render, waitFor } from '@testing-library/react'
import Play from '../Play'
import { useNavigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../store'
import { getAnimals } from '../../apis/play'

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
    expect.assertions(1)
    getAnimals.mockReturnValue(Promise.resolve(playAnimalsMockData))
    render(
      <Provider store={store}>
        <Play />
      </Provider>
    )
    return waitFor(() => getAnimals.mock.calls.length > 0).then(() => {
      const animalName = screen.getAllByTestId('animalTile')
      expect(animalName).toHaveLength(2)
    })
  })
  it('executes save to Thunk on clickhandler, and navigates to final', async () => {
    expect.assertions(2)
    getAnimals.mockReturnValue(Promise.resolve(playAnimalsMockData))
    render(
      <Provider store={store}>
        <Play />
      </Provider>
    )
    return waitFor(() => getAnimals.mock.calls.length > 0).then(() => {
      userEvent.click(screen.getAllByRole('button')[0])
      useNavigate.mockImplementation(() => {})
      expect(useNavigate).toHaveBeenCalled()
      const buttons = screen.getAllByRole('button')
      // Tiles count as buttons due to its component design
      expect(buttons).toHaveLength(4)
    })
  })
})
