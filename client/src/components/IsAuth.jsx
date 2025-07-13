import { useAuth } from '@clerk/clerk-react';
import { Navigate } from "react-router-dom";

const IsAuth = ({children}) =>{

    const { userId } = useAuth();

    if(!userId){
        return(
            <>
                <Navigate to="/"/>
            </>
        )
    }
    else{
        return(
            <>
                {children}
            </>
        )
    }

}

export default IsAuth