import { SignUp } from "@clerk/clerk-react"
import LayoutUnauth from "../components/LayoutUnauth.jsx"

const SignUpPage = () => {
  return (
    <LayoutUnauth>
      <SignUp signInUrl="/sign-in" forceRedirectUrl={"/dashboard"} />
    </LayoutUnauth>
  )
}

export default SignUpPage