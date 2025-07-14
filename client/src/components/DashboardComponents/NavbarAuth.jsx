import { Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const NavbarAuth = () => {

    return(
    <nav className="p-4 flex items-center justify-between">
        Collapse Button
        <div className=" gap-6 flex items-center justify-between">
            <Link to="/">Home</Link>
            <Moon/>
            <UserButton/>
        </div>
    </nav>
    )

}

export default NavbarAuth