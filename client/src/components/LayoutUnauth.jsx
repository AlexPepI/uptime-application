import Navbar from "./Navbar"
import DarkVeil from "@/reactBits/Darkveil";

const LayoutUnauth = ({children}) => {

    return(
        <DarkVeil hueShift={221}>
        <div className="max-w-6xl mx-auto w-100vw">
            <div className="flex flex-col h-screen">
                <Navbar/>
                <div className="flex items-center justify-center h-full">
                    {children}
                </div>
                
            </div>
        </div>
        </DarkVeil>
    )

}

export default LayoutUnauth