import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import Navbar from '../Navbar'
import { useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import '@testing-library/jest-dom'

const fakeUser = {
  name: '',
  email: '',
}
// OUR ONE
jest.mock('@auth0/auth0-react')
const fakeLogin = jest.fn()
const fakeLogout = jest.fn()

beforeEach(() => {
  useAuth0.mockReturnValue({
    isAuthenticated: true,
    user: {
      ...fakeUser,
      nickname: 'nickky',
    },
    logout: fakeLogout,
    loginWithRedirect: fakeLogin,
    getAccessTokenSilently: () => {
      return Promise.resolve('token')
    },
  })
  fakeLogin.mockClear()
})

describe('<Navbar />', () => {
  it('displays Sign out when the user is signed in', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    )
    const navbar = screen.getByText(/Sign out/i)
    expect(navbar).toHaveTextContent('Sign out')
  })
  it('Allows a user to Sign out', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    )
    const link = screen.getByText('Sign out')
    fireEvent.click(link)
    expect(fakeLogout).toHaveBeenCalled()
  })
})
