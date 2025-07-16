import IsAuth from "@/components/IsAuth.jsx";
import { UserProfile } from "@clerk/clerk-react";
import LayoutAuth from "@/components/DashboardComponents/LayoutAuth";


const ProfilePage = () => {
  


  return (
    <IsAuth>
        <LayoutAuth>
            <UserProfile/>
        </LayoutAuth>
    </IsAuth>
  )
}

export default ProfilePage