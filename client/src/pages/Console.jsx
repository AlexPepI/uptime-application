import { Search } from "lucide-react";
import { io } from "socket.io-client";
import IsAuth from "@/components/IsAuth";
import { useState,useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Input } from "@/components/ui/input";
import { AddNewSiteModal } from "@/components/AddNewSiteModal.jsx";
import LayoutAuth from "@/components/DashboardComponents/LayoutAuth";

const Console = () => {


    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const [monitors, setMonitors] = useState([])
      const { getToken } = useAuth();

  useEffect(()=>{
    const fetchMonitors = async () =>{
        const token = await getToken();
        try {
            const response = await fetch(`${API_BASE_URL}/uptime/active-monitors`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
        if(!response.ok){
            throw new Error(`HTTP ${res.status}`)
        }
        const json = await response.json();
        setMonitors(json);
      } catch (error) {
        console.error('Error loading monitors:', error)
      }
    }
    fetchMonitors();
  },[])

  useEffect(()=>{
    let socket
    const setupSocket = async () => {
        try {
            const token = await getToken();
            socket = io(`${API_BASE_URL}/refresh-values`, {
            auth: { token },
            transports: ['websocket']
            })
            socket.on('connect', () =>
            console.log('WS connected, id=', socket.id)
            )
            socket.on('connect_error', err =>
            console.error('WS connect error:', err.message)
            )
            socket.on('new-check', ({ monitorId, status, latency, timestamp }) =>{
                console.log({ monitorId, status, latency, timestamp })
            })
        } catch (error) {
            console.error('Socket setup failed:', error)
        }    
    }
    setupSocket()
  },[])




    
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
                        {monitors.map((m, i) => {
                            const chk = m.lastCheck
                            return (
                                <div key={m.id || i} className="py-2 border-b">
                                    <strong>{m.url}</strong> is <em>{chk?.status || '—'}</em> in {chk?.latency ?? '—'}ms at{' '}
                                    {chk
                                    ? new Date(chk.createdAt).toLocaleString()
                                    : 'no checks yet'}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>   
            </LayoutAuth>
        </IsAuth>
    )

}

export default Console