import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store'

import App from './components/App'
import { Auth0Provider } from '@auth0/auth0-react'






document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Auth0Provider store={store}
      domain = "https://aihe-ahoaho-22-tom.au.auth0.com"
      clientId = 'ozaykyAlM17peJrCOtU8wiJNIy4LItBn' 
      redirectUri = {window.location.origin}
      audience = 'https://fruit/api'
      
      >
      <BrowserRouter>
        <App />
      </BrowserRouter>
   
    </Auth0Provider>,
    document.getElementById('app')
  )
})
