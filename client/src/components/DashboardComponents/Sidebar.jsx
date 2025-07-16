import { Link } from "react-router-dom";
import { Home,Inbox,Calendar,Plus,ChartColumn } from "lucide-react";
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

import { UserButton } from "@clerk/clerk-react";


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
    },
    {
        title:"Calendar",
        url:"/",
        icon: Calendar
    }
]

const SideBar = () => {

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
            <Plus onClick={()=>{console.log("action")}}/> 
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
              <UserButton/>
              <span className="">Alekos</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )

}

export default SideBar