import Navbar from "./Navbar"

const LayoutUnauth = ({children}) => {

    return(
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col h-screen">
                <Navbar/>
                <div className="flex items-center justify-center h-full">
                    {children}
                </div>
            </div>
        </div>
    )

}

export default LayoutUnauth