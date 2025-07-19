import { useNavigate } from 'react-router-dom';
import { useAuth } from "@clerk/clerk-react";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const MonitoringDropdown = ({ id, url, apiBaseUrl, setMonitors }) => {

    const navigate = useNavigate();
    const {getToken} =useAuth();
    const onStop = async (url) => {

        try {
            const token = await getToken();
            const res = await fetch(
            `${apiBaseUrl}/uptime/stop`,
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ url: url })
            }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setMonitors((prev) => prev.filter((mon) => mon.url !== url));
        } catch (err) {
            console.error("Error stopping monitor:", err);
        }
    };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button aria-label="Actions">
          <MoreVertical size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
         <DropdownMenuItem className="cursor-pointer" onSelect={() => navigate(`/dashboard/${id}`)} > {/*  */}
          Details
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => {
            onStop(url);
          }}
        >
          Stop Monitoring
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MonitoringDropdown