import {dark} from "@clerk/themes"
import { SignUp } from "@clerk/clerk-react"
import { useTheme } from "@/providers/ThemeProvider";
import LayoutUnauth from "../components/LayoutUnauth.jsx"

const SignUpPage = () => {
  
    const { theme } = useTheme();

  return (
    <LayoutUnauth>
      <SignUp 
        signInUrl="/sign-in" 
        forceRedirectUrl={"/dashboard"}
        appearance={{ 
          baseTheme: theme === "dark" ? dark : ""
        }}  
      />
    </LayoutUnauth>
  )
}

export default SignUpPage