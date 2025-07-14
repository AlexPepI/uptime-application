import {dark} from "@clerk/themes"
import { SignIn } from "@clerk/clerk-react"
import { useTheme } from "@/providers/ThemeProvider";
import LayoutUnauth from "../components/LayoutUnauth.jsx"

const SignInPage = () => {

  const { theme } = useTheme();

  return (
    <LayoutUnauth>
      <SignIn 
        signUpUrl="/sign-up" 
        forceRedirectUrl={"/dashboard"} 
        appearance={{ 
            baseTheme: theme === "dark" ? dark : ""
          }}   
      />
    </LayoutUnauth>
  )
}

export default SignInPage