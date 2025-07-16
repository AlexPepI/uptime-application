import SideBar from "./Sidebar"
import NavbarAuth from "./NavbarAuth"
import { SidebarProvider } from "../ui/sidebar"

const LayoutAuth = ({children}) => {

    return(
        <SidebarProvider>
            <SideBar/>
                <main className="w-full flex-1 overflow-auto">
                    <NavbarAuth/>            
                    <div className="px-4">
                        {children}
                    </div>
                </main>
        </SidebarProvider>
    )


}

export default LayoutAuth