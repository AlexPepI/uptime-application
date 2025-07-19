import IsAuth from '@/components/IsAuth';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Loader } from '@/components/Loader';
import { Indicator } from '@/components/Indicator';
import { UptimeBars } from '@/components/DashboardComponents/UptimeBars';
import { useParams, useNavigate } from 'react-router-dom';
import LayoutAuth from '@/components/DashboardComponents/LayoutAuth';
import CardComponent from '@/components/DashboardComponents/CardComponent';
import AreaChartResponseTime from '@/components/DashboardComponents/AreaChartResponseTime';

const DashboardPage = () => {
  const { id } = useParams();
  const {getToken} = useAuth();
  const navigate = useNavigate();
  const [payload, setPayload] = useState(null);
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
        setPayload(data);
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

    const statuses1 = [
    'up','up','up','up','up','up','up',
    'up','up','down','up','up','up','up','up'

  ];

  // Example 2: derive from a percentage
  const percent = 87; // e.g. 87% uptime
  const totalBars = 24;
  const upCount = Math.round((percent / 100) * totalBars);
  const statuses2 = Array.from({ length: totalBars }, (_, i) =>
    i < upCount ? 'up' : 'down'
  );


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
                  <Indicator size={50} color="#4caf50" duration={1.2}/>
                  Test
                </CardComponent>
              </div>
              <div className='p-4 rounded-3xl'>
                <CardComponent
                title="Last Check"
                footer={<span>Average Today: 1125 ms</span>}
                className="p-4 rounded-3xl h-[100%] min-w-[230px]"
                >
                  Test
                </CardComponent>
              </div>
              <div className='p-4 rounded-3xl'>
                <CardComponent
                title="Last 15 values"
                footer={<span>Average Today: 1125 ms</span>}
                className="p-4 rounded-3xl h-[100%] min-w-[230px]"
                >
                    <UptimeBars statuses={statuses1} gap={3} />
                </CardComponent>                
              </div>
              <div className='p-4 rounded-3xl sm:col-span-2 lg:col-span-3'><AreaChartResponseTime payload={payload} /></div>
            </div>
        </LayoutAuth>
    </IsAuth>
  );
}

export default DashboardPage