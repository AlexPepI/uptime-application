import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {dark} from "@clerk/themes"
import { ClerkProvider,ClerkLoaded,ClerkLoading } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
     publishableKey={PUBLISHABLE_KEY} 
     afterSignOutUrl='/'
     appearance={{baseTheme:dark}}
    >
      <ClerkLoading>
        LOADING ...
      </ClerkLoading>
      <ClerkLoaded>
        <App />  
      </ClerkLoaded>
    </ClerkProvider>
  </StrictMode>,
)
