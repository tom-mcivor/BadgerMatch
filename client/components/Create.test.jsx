import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Create from './Create'

jest.mock('../apis/create', () => ({
  create: jest.fn(),
  getS3Url: jest.fn(),
  fetchUrl: jest.fn(),
}))

describe('Create', () => {
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
