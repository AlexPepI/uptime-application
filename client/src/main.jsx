import './index.css'
import App from './App.jsx'
import { dark } from '@clerk/themes'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Loader } from './components/Loader.jsx'
import { ThemeProvider } from './providers/ThemeProvider'
import { useTheme } from "@/providers/ThemeProvider";
import { ClerkProvider,ClerkLoaded,ClerkLoading } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}


const Root = () => {
  const { theme } = useTheme();
  
  return(
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY} 
      afterSignOutUrl='/'
      appearance={{ 
        baseTheme: theme === "dark" ? dark : ""
      }}  
      >
        <ClerkLoading>
            <div className='h-screen'>
              <div className="flex items-center justify-center h-full">
                 <Loader size={60} color="var(--custom-accent)" />
              </div>
            </div>
        </ClerkLoading>
        <ClerkLoaded>
          <App />  
        </ClerkLoaded>
      </ClerkProvider>
  )
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Root/>
    </ThemeProvider>
  </StrictMode>,
)
