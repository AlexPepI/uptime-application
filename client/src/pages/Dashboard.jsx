import { useEffect,useState } from "react";
import IsAuth from "../components/IsAuth";
import { useAuth } from "@clerk/clerk-react";

const Dashboard = () =>{

    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const [user,setUser] = useState(null)

      const { getToken } = useAuth();

  useEffect(()=>{
    
    const testFetch = async () =>{

      const token = await getToken();
      const response = await fetch(`${API_BASE_URL}/user/whoami`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      const json = await response.json();
      if(response.ok){
        setUser(json.username)
      }
    }

    testFetch();
  },[])

    return(
        <IsAuth>
            Dashboard
            User : {user}
        </IsAuth>
    )


}

export default Dashboard