import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Create from '../Create'

jest.spyOn(console, 'log').mockImplementation(() => {})
jest.spyOn(console, 'error').mockImplementation(() => {})

beforeEach(() => {
  jest.resetAllMocks()
})

describe('<Create />', () => {
  it('updates the form inputs with user input', async () => {
    render(<Create />)
    const nameInput = screen.getByTestId('name-input')
    const descriptionInput = screen.getByTestId('description-input')
    const fileInput = screen.getByTestId('image-input')

    fireEvent.change(nameInput, { target: { value: 'test name' } })
    fireEvent.change(descriptionInput, {
      target: { value: 'test description' },
    })
    fireEvent.change(fileInput, { target: { files: ['test file'] } })

    expect(nameInput.value).toBe('test name')
    expect(descriptionInput.value).toBe('test description')
    expect(fileInput.files[0]).toBe('test file')
  })
})
