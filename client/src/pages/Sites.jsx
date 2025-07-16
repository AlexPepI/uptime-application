import IsAuth from "@/components/IsAuth"
import LayoutAuth from "@/components/DashboardComponents/LayoutAuth"
import { Input } from "@/components/ui/input"
import { AddNewSiteModal } from "@/components/AddNewSiteModal.jsx"


const Sites = () => {

    return(
        <IsAuth>
            <LayoutAuth>
             <div className="flex h-[80dvh] min-h-[320px] justify-center">
                <div className=" flex flex-col  w-full 2xl:w-[80%]">
                    <div className="flex justify-end gap-6 my-auto ">
                        <Input placeholder={`Search URL`} 
                        className="
                            w-[27%]
                            max-w-50
                            placeholder:text-xs
                            placeholder:md:text-sm
                            "
                        />
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

export default Sites