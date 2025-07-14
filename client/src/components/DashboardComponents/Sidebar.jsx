import { Link } from "react-router-dom";
import { Home,Inbox,Calendar,Search,Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"



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
    },
    {
        title:"Search",
        url:"/",
        icon: Search
    },
    {
        title:"Settings",
        url:"/",
        icon: Settings
    },
]


const SideBar = () => {

 return (
    <Sidebar>
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
      </SidebarContent>
    </Sidebar>
  )

}

export default SideBar