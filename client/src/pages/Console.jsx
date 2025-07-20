import { Search } from "lucide-react";
import IsAuth from "@/components/IsAuth";
import { Loader } from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { useMonitors } from "@/hooks/useMonitorSocket";
import { MonitorsTable } from "@/components/DashboardComponents/MonitorsTable";
// import MonitoringDropdown from "@/components/monitoringDropdown"; 
import { AddNewSiteModal } from "@/components/AddNewSiteModal.jsx";
import LayoutAuth from "@/components/DashboardComponents/LayoutAuth";

const Console = () => {

    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const {monitors,setMonitors} = useMonitors(API_BASE_URL);

      if (!monitors) return(
    <div className='h-screen'>
      <div className="flex items-center justify-center h-full">
          <Loader size={60} color="var(--custom-accent)" /> 
        </div>
    </div>
  )

        if (!monitors[0]) return(
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
                        <AddNewSiteModal />
                    </div>
                    <div className="h-8/10 flex overflow-x-auto justify-center">
                    <div className="text-2xl  mt-[10vh]">No active uptime monitors. </div>
                    </div>
                </div>
            </div>
            </LayoutAuth>
        </IsAuth>
  )

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
                        <AddNewSiteModal />
                    </div>
                    <div className="h-8/10 flex overflow-x-auto">
                      <MonitorsTable API_BASE_URL={API_BASE_URL} monitors={monitors} setMonitors={setMonitors}/>
                    </div>
                </div>
            </div>
            </LayoutAuth>
        </IsAuth>
    )

}

export default Console