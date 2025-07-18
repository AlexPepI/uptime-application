import { Search } from "lucide-react";
import IsAuth from "@/components/IsAuth";
import { Input } from "@/components/ui/input";
import { useMonitors } from "@/hooks/useMonitorSocket";
import MonitoringDropdown from "@/components/monitoringDropdown"; 
import { Loader } from "@/components/Loader";
import { AddNewSiteModal } from "@/components/AddNewSiteModal.jsx";
import LayoutAuth from "@/components/DashboardComponents/LayoutAuth";

const Console = () => {

    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const {monitors,setMonitors} = useMonitors(API_BASE_URL);



      if (!monitors[0]) return(
    <div className='h-screen'>
      <div className="flex items-center justify-center h-full">
          <Loader size={60} color="#ff6b6b" /> 
        </div>
    </div>
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
                    <div className="border-1 h-8/10">
                         <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Active</th>
            <th>Status</th>
            <th>Latency (ms)</th>
            <th>Last Checked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {monitors.map(mon => (
            <tr key={mon.id}>
              <td>{mon.url}</td>
              <td>{mon.active ? "✅" : "❌"}</td>
              <td>{mon.lastCheck?.status ?? "—"}</td>
              <td>{mon.lastCheck?.latency ?? "—"}</td>
              <td>
                {mon.lastCheck
                  ? new Date(mon.lastCheck.createdAt).toLocaleTimeString()
                  : "—"}
              </td>
              <td>
                  <MonitoringDropdown id={mon.id} url={mon.url} apiBaseUrl={API_BASE_URL} setMonitors={setMonitors}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
                    </div>
                </div>
            </div>
            </LayoutAuth>
        </IsAuth>
    )

}

export default Console