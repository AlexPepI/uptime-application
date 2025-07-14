import {dark} from "@clerk/themes";
import { Moon,Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { useTheme } from "@/providers/ThemeProvider";
import { SidebarTrigger } from "../ui/sidebar";

const NavbarAuth = () => {

    const { theme, setTheme } = useTheme();

    return(
    <nav className=" px-4 flex h-[60px] items-center justify-between">
        <SidebarTrigger/>
        <div className=" gap-6 flex items-center justify-between">
            <Link to="/">Home</Link>
            {
                theme==="light" 
                ?
                    <Moon className="cursor-pointer" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}/>
                :
                    <Sun className="cursor-pointer" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}/>}
            <UserButton
                appearance={{ 
                    baseTheme: theme === "dark" ? dark : ""
                }}  
            />
        </div>
    </nav>
    )

}

export default NavbarAuth