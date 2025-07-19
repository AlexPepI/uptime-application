import IsAuth from '@/components/IsAuth';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Loader } from '@/components/Loader';
import { Indicator } from '@/components/Indicator';
import { UptimeBars } from '@/components/DashboardComponents/UptimeBars';
import { useParams, useNavigate } from 'react-router-dom';
import { addMinutes, formatDistanceToNow,formatDistanceToNowStrict } from 'date-fns'
import LayoutAuth from '@/components/DashboardComponents/LayoutAuth';
import CardComponent from '@/components/DashboardComponents/CardComponent';
import AreaChartResponseTime from '@/components/DashboardComponents/AreaChartResponseTime';

const DashboardPage = () => {
  const { id } = useParams();
  const {getToken} = useAuth();
  const navigate = useNavigate();
  const [payload, setPayload] = useState(null);
  const [statuses,setStatuses] = useState([]);
  const [relative,setRelative] = useState("");
  const [next,setNext] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!id) {
      navigate('/console');
      return;
    }
    
    (async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${API_BASE_URL}/uptime/monitor/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          navigate('/console');
          return;
        }
        const data = await res.json();
        const statuses = data.map(data => data.status)
        setStatuses(statuses);
        setPayload(data);
        const lastCheckedAt = new Date(data.at(-1).createdAt);
        const nextCheck = addMinutes(lastCheckedAt,5);
        setNext(formatDistanceToNowStrict(nextCheck), {
    addSuffix: true,
    roundingMethod: 'ceil',
  })
        setRelative(formatDistanceToNow(lastCheckedAt, { addSuffix: true }) )
      } catch (err) {
        console.error(err);
        navigate('/console');
      }
    })();
  }, [id, navigate]);

  if (!payload) return(
    <div className='h-screen'>
      <div className="flex items-center justify-center h-full">
          <Loader size={60} color="var(--custom-accent)" /> 
        </div>
    </div>
  )



  return (
    <IsAuth>
        <LayoutAuth>
            <div className='grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4 mt-[5vh]'>
              <div className='p-4 rounded-3xl'>
                <CardComponent
                title="Current Status"
                
                footer={<span>Up for : 3 months and 21 days</span>}
                className="p-4 rounded-3xl h-[100%] min-w-[230px]"
                >
                   {payload && payload.at(-1).status==="down" 
                   ? <><Indicator size={50} color="#ef4444" duration={1.2}/>
                      <div className='text-lg inline-block px-2 py-0.5  font-medium text-red-700 bg-red-100 rounded'>DOWN</div></>
                   : <><Indicator size={50} color="#37c77f" duration={1.2}/>
                   <div className='text-lg inline-block px-2 py-0.5  font-medium text-green-700 bg-green-100 rounded'>UP</div></> 
                   }
                  
                </CardComponent>
              </div>
              <div className='p-4 rounded-3xl'>
                <CardComponent
                title="Last Check"
                footer={<span>Next check in {next}</span>}
                className="p-4 rounded-3xl h-[100%] min-w-[230px]"
                >
                  {payload && <div className="font-semibold">{relative}</div>}
                </CardComponent>
              </div>
              <div className='p-4 rounded-3xl'>
                <CardComponent
                title={`Last ${(payload?.length ?? 0) } values`}
                footer={<span>{statuses.filter(s => s === 'down').length} Incidents</span>}
                className="p-4 rounded-3xl h-[100%] min-w-[230px]"
                >
                <UptimeBars statuses={statuses} gap={3} />
                </CardComponent>             
              </div>
              <div className='p-4 rounded-3xl sm:col-span-2 lg:col-span-3'><AreaChartResponseTime color={payload.at(-1).status==="down"?"#ef4444":"#37c77f"} numberOfValues={payload?.length ?? 0} payload={payload} /></div>
            </div>
        </LayoutAuth>
    </IsAuth>
  );
}

export default DashboardPage