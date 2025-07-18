import IsAuth from '@/components/IsAuth';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useParams, useNavigate } from 'react-router-dom';
import LayoutAuth from '@/components/DashboardComponents/LayoutAuth';
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
          LOADING ...
        </div>
    </div>
  )

  return (
    <IsAuth>
        <LayoutAuth>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-[8vh]'>
              <div className='bg-primary-foreground p-4 rounded-3xl'>Test</div>
              <div className='bg-primary-foreground p-4 rounded-3xl'>Test</div>
              <div className='bg-primary-foreground p-4 rounded-3xl'>Test</div>
              <div className='p-4 rounded-3xl md:col-span-3'><AreaChartResponseTime payload={payload} /></div>
            </div>
        </LayoutAuth>
    </IsAuth>
  );
}

export default DashboardPage