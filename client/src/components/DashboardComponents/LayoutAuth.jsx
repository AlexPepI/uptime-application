import SideBar from "./Sidebar"
import NavbarAuth from "./NavbarAuth"


const LayoutAuth = ({children}) => {

    return(
        <div className="flex h-screen">
            <SideBar/>
            <main className="w-full">
                <NavbarAuth/>            
                <div className="px-4">
                    {children}
                </div>
            </main>
        </div>
    )


}

export default LayoutAuth