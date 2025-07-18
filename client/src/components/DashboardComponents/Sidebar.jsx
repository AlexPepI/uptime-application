import { Link,useNavigate } from "react-router-dom";
import { Home,Inbox,Plus,ChartColumn } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"

import { useUser } from "@clerk/clerk-react";


const items =[
    {
        title:"Home",
        url:"/",
        icon: Home
    },
    {
        title:"Inbox",
        url:"/",
        icon: Inbox
    }
]

const SideBar = () => {

  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <Sidebar>
      <SidebarHeader className="flex h-[60px]">
        <SidebarMenuItem className="list-none  my-auto">
          <Link to="/">
            Peps Monitor Logo
          </Link>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarSeparator className="m-0"/>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Monitoring</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus onClick={()=>{navigate("/console")}}/> 
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/console">
                    <ChartColumn/>
                    Uptime
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>     
      <SidebarSeparator className="m-0"/>
      <SidebarFooter className="mb-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className=" flex cursor-pointer h-10">
              <img
                src={user.imageUrl}
                alt={user.fullName}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                }}
              />
              <span className="">{user.fullName}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )

}

export default SideBar