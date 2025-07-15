import IsAuth from "../components/IsAuth";
import { useEffect,useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import LayoutAuth from "@/components/DashboardComponents/LayoutAuth";

const Dashboard = () =>{

  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [allUsers,setAllUsers] = useState(null)

  const { getToken } = useAuth();

  useEffect(()=>{
    const testFetch = async () =>{
      const token = await getToken();
      const response = await fetch(`${API_BASE_URL}/user/all`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      const json = await response.json();
      if(response.ok){
        setAllUsers(json)
      }
    }
    testFetch();
  },[])

  return(
    <IsAuth>
      <LayoutAuth>
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4" >
          {/* <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2" >test</div>
          <div className="bg-primary-foreground p-4 rounded-lg" >test</div>
          <div className="bg-primary-foreground p-4 rounded-lg" >test</div>
          <div className="bg-primary-foreground p-4 rounded-lg" >test</div>
          <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2" >test</div>
          <div className="bg-primary-foreground p-4 rounded-lg" >test</div>  */}
          {allUsers && allUsers.map((item,i) => (<div key={i} className="bg-primary-foreground p-4 rounded-lg" >{item.clerk_Id}</div>))}
        </div>
      </LayoutAuth>
    </IsAuth>
  )
}

export default Dashboard