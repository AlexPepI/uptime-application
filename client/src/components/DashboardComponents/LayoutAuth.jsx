import SideBar from "./Sidebar"
import NavbarAuth from "./NavbarAuth"
import { SidebarProvider } from "../ui/sidebar"

const LayoutAuth = ({children}) => {

    return(
        <SidebarProvider>
            <div className="flex h-screen">
                <SideBar/>
                <main className="w-full">
                    <NavbarAuth/>            
                    <div className="px-4">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )


}

export default LayoutAuth