import IsAuth from '@/components/IsAuth';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useParams, useNavigate } from 'react-router-dom';
import LayoutAuth from '@/components/DashboardComponents/LayoutAuth';


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
        console.log(data)
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
            Welcome to dashboard
        </LayoutAuth>
    </IsAuth>
  );
}

export default DashboardPage