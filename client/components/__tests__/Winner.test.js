import React from 'react'
import { useSelector } from 'react-redux'
import { render, screen, fireEvent } from '@testing-library/react'
import Winner from '../Winner'

jest.mock('react-redux')

const winningAnimal = useSelector.mockReturnValue({
  id: 1,
  auth0_id: '1',
  name: 'Bag Cat',
  description: 'Likes bags',
  image_url: '/images/bag-cat.jpg',
  disposition: 'friend',
})

beforeEach(() => {
  jest.resetAllMocks()
})

describe('<Winner/>', () => {
  it('display animal image, name, disposition', () => {
    expect.assertions(1)
    render(<Winner />)
    const animalName = screen.getByText(winningAnimal.name, { exact: false })

    expect(animalName).toBeTruthy()
  })
})
