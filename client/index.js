import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store'

import App from './components/App'
import { Auth0Provider } from '@auth0/auth0-react'


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Auth0Provider 
     domain = "cam-ahoaha-22.au.auth0.com"
      clientId = 'nEGzES790IAsLzglBLQsRUVpLBZuikfG' 
      redirectUri = {window.location.origin}
      audience = 'https://badger-match/api'
      >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
   
    </Provider>,
    </Auth0Provider>,
    document.getElementById('app')
  )
})
