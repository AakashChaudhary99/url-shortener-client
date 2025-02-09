import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {AppProvider} from './context/AppContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='524894987002-pns7pq4i06ibni33pbb1r7t5p982vi1s.apps.googleusercontent.com' >
    <AppProvider>
      <StrictMode>
        <App />
      </StrictMode>,
    </AppProvider>
  </GoogleOAuthProvider> 
)
