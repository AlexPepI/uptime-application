import { SignIn } from "@clerk/clerk-react"
import LayoutUnauth from "../components/LayoutUnauth.jsx"

const SignInPage = () => {



  return (
    <LayoutUnauth>
      <SignIn 
        signUpUrl="/sign-up" 
        forceRedirectUrl={"/sites"} 
      />
    </LayoutUnauth>
  )
}

export default SignInPage