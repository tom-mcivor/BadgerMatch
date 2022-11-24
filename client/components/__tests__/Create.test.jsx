import React from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import Create from '../Create'
import Dropzone from 'react-dropzone'
import { useAuth0 } from '@auth0/auth0-react'
import '@testing-library/jest-dom'
import { create, getS3Url } from '../../apis/create'

jest.spyOn(console, 'log').mockImplementation(() => {})
jest.spyOn(console, 'error').mockImplementation(() => {})

jest.mock('@auth0/auth0-react')
jest.mock('../../apis/create')

beforeEach(() => {
  useAuth0.mockReturnValue({
    getAccessTokenSilently: () => {
      return Promise.resolve('this-is-a-token')
    },
  })
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

  it('displays a loading message when the form is submitted', async () => {
    render(<Create />)
    const nameInput = screen.getByTestId('name-input')
    const descriptionInput = screen.getByTestId('description-input')
    const fileInput = screen.getByTestId('image-input')
    const submitButton = screen.getByTestId('submit-button')

    fireEvent.change(nameInput, { target: { value: 'test name' } })
    fireEvent.change(descriptionInput, {
      target: { value: 'test description' },
    })
    fireEvent.change(fileInput, { target: { files: ['test file'] } })

    fireEvent.click(submitButton)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  // it('displays a success message when the form is submitted', async () => {
  //   render(<Create />)
  //   const nameInput = screen.getByTestId('name-input')
  //   const descriptionInput = screen.getByTestId('description-input')
  //   const fileInput = screen.getByTestId('image-input')
  //   const submitButton = screen.getByTestId('submit-button')

  //   fireEvent.change(nameInput, { target: { value: 'test name' } })
  //   fireEvent.change(descriptionInput, {
  //     target: { value: 'test description' },
  //   })
  //   fireEvent.change(fileInput, { target: { files: ['test file'] } })

  //   fireEvent.click(submitButton)

  //   await waitFor(() => {
  //     expect(screen.getByText('Success!')).toBeInTheDocument()
  //   })
  // })

  // it('calls the create api when the form is submitted', async () => {
  //   render(<Create />)
  //   const nameInput = screen.getByTestId('name-input')
  //   const descriptionInput = screen.getByTestId('description-input')
  //   const fileInput = screen.getByTestId('image-input')
  //   const submitButton = screen.getByTestId('submit-button')

  //   fireEvent.change(nameInput, { target: { value: 'test name' } })
  //   fireEvent.change(descriptionInput, {
  //     target: { value: 'test description' },
  //   })
  //   fireEvent.change(fileInput, { target: { files: ['test file'] } })

  //   fireEvent.click(submitButton)

  //   await waitFor(() => {
  //     expect(create).toHaveBeenCalledWith(
  //       {
  //         name: 'test name',
  //         description: 'test description',
  //         imageUrl: 'test image url',
  //       },
  //       'this-is-a-token'
  //     )
  //   })
  // })

  // it('calls the getS3Url api when the form is submitted', async () => {
  //   render(<Create />)
  //   const nameInput = screen.getByTestId('name-input')
  //   const descriptionInput = screen.getByTestId('description-input')
  //   const fileInput = screen.getByTestId('image-input')
  //   const submitButton = screen.getByTestId('submit-button')

  //   fireEvent.change(nameInput, { target: { value: 'test name' } })
  //   fireEvent.change(descriptionInput, {
  //     target: { value: 'test description' },
  //   })
  //   fireEvent.change(fileInput, { target: { files: ['test file'] } })

  //   fireEvent.click(submitButton)

  //   await waitFor(() => {
  //     expect(getS3Url).toHaveBeenCalledWith('test file', 'this-is-a-token')
  //   })
  // })
})

// import React from 'react'
// import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
// import Create from '../Create'
// import Dropzone from 'react-dropzone'
// import { useAuth0 } from '@auth0/auth0-react'
// import '@testing-library/jest-dom'
// import { create, getS3Url } from '../../apis/create'

// jest.spyOn(console, 'log').mockImplementation(() => {})
// jest.spyOn(console, 'error').mockImplementation(() => {})

// jest.mock('@auth0/auth0-react')
// jest.mock('../../apis/create')

// beforeEach(() => {
//   useAuth0.mockReturnValue({
//     getAccessTokenSilently: () => {
//       return Promise.resolve('this-is-a-token')
//     },
//   })
// })

// describe('<Create />', () => {
//   it('updates the form inputs with user input', async () => {
//     render(<Create />)
//     const nameInput = screen.getByTestId('name-input')
//     const descriptionInput = screen.getByTestId('description-input')
//     const fileInput = screen.getByTestId('image-input')

//     fireEvent.change(nameInput, { target: { value: 'test name' } })
//     fireEvent.change(descriptionInput, {
//       target: { value: 'test description' },
//     })
//     fireEvent.change(fileInput, { target: { files: ['test file'] } })

//     expect(nameInput.value).toBe('test name')
//     expect(descriptionInput.value).toBe('test description')
//     expect(fileInput.files[0]).toBe('test file')
//   })

//   it('displays a loading message when the form is submitted', async () => {
//     render(<Create />)
//     const nameInput = screen.getByTestId('name-input')
//     const descriptionInput = screen.getByTestId('description-input')
//     const fileInput = screen.getByTestId('image-input')
//     const submitButton = screen.getByTestId('submit-button')

//     fireEvent.change(nameInput, { target: { value: 'test name' } })
//     fireEvent.change(descriptionInput, {
//       target: { value: 'test description' },
//     })
//     fireEvent.change(fileInput, { target: { files: ['test file'] } })

//     fireEvent.click(submitButton)

//     expect(screen.getByTestId('loading')).toBeInTheDocument()
//   })
// })
