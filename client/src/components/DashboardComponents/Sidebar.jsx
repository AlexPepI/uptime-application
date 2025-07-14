import { Link } from "react-router-dom";
import { Home,Inbox,Calendar,Search,Settings,User2,ChevronUp } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"
import { dark } from "@clerk/themes";
import { UserButton } from "@clerk/clerk-react";
import { useTheme } from "@/providers/ThemeProvider";

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

  const { theme } = useTheme();

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
      </SidebarContent>
            <SidebarSeparator className="m-0"/>
      <SidebarFooter className="mb-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className=" flex cursor-pointer h-10">
              <UserButton 
                appearance={{ 
                    baseTheme: theme === "dark" ? dark : ""
                }}  
              />
              <span className="">Alekos</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )

}

export default SideBar