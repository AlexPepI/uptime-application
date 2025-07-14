import { Link } from "react-router-dom"
import { useAuth } from '@clerk/clerk-react';
import { UserButton } from "@clerk/clerk-react";

const Navbar = () => {

  const { userId } = useAuth();

    return(
        <div className="rounded-b-xl">
            <ul className="flex justify-between py-4 px-6">
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div className="flex gap-6 items-center">
                    {!userId?
                        <>
                            <Link to="/sign-in">
                                Sign In
                            </Link>
                            <Link to="/sign-up">
                                Sign Up
                            </Link>
                            </>
                            :
                        <>
                            <Link to="/dashboard">
                                Dashboard
                            </Link>
                            <li>
                                <UserButton/>
                            </li>
                        </>
                    }
                </div>
            </ul>
        </div>
    )

}

export default Navbar