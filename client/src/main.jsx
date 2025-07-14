import './index.css'
import App from './App.jsx'
import LayoutUnauth from './components/LayoutUnauth'
import {dark} from "@clerk/themes"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './providers/ThemeProvider'
import { ClerkProvider,ClerkLoaded,ClerkLoading } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ClerkProvider
      publishableKey={PUBLISHABLE_KEY} 
      afterSignOutUrl='/'
      appearance={{baseTheme:dark}}
      >
        <ClerkLoading>
            <div className='h-screen'>
              LOADING ...
            </div>
        </ClerkLoading>
        <ClerkLoaded>
          <App />  
        </ClerkLoaded>
      </ClerkProvider>
    </ThemeProvider>
  </StrictMode>,
)
