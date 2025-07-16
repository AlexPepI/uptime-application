import IsAuth from "@/components/IsAuth"
import LayoutAuth from "@/components/DashboardComponents/LayoutAuth"
import { Input } from "@/components/ui/input"
import { AddNewSiteModal } from "@/components/AddNewSiteModal.jsx"
import { Search } from "lucide-react"

const Console = () => {

    return(
        <IsAuth>
            <LayoutAuth>
             <div className="flex h-[80dvh] min-h-[320px] justify-center">
                <div className=" flex flex-col  w-full 2xl:w-[80%]">
                    <div className="flex justify-end gap-6 my-auto ">
                        <div className="relative w-[27%] max-w-50">
                            <Search 
                                size={16} 
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                            />
                            <Input
                                placeholder="Search URL"
                                className="pl-10 placeholder:text-xs placeholder:md:text-sm"
                            />
                        </div>
                        <AddNewSiteModal/>
                    </div>
                    <div className="border-1 h-8/10">
                        Table
                    </div>
                </div>
            </div>   
            </LayoutAuth>
        </IsAuth>
    )

}

export default Console