import React from "react"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import MonitoringDropdown from "../monitoringDropdown"
import { Indicator } from "../Indicator"

export function MonitorsTable({ API_BASE_URL,monitors, setMonitors }) {
  return (
    <div className="self-start mx-auto overflow-x-auto rounded-lg border border-gray-200 shadow-sm w-[60%] min-w-[450px] mt-[3vh]">
      <Table>
        <TableHeader >
          <TableRow>
            <TableHead className="w-[28%]">URL</TableHead>
            <TableHead className="w-[18%]">Status</TableHead>
            <TableHead className="w-[18%]">Latency (ms)</TableHead>
            <TableHead className="w-[18%]">Last Checked</TableHead>
            <TableHead className="w-[18%] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {monitors?.map((mon) => (
            <TableRow key={mon.id} >
              <TableCell className="font-medium text-custom-accent hover:underline">
                <a href={mon.url} target="_blank" rel="noopener">
                  {mon.url}
                </a>
              </TableCell>
              <TableCell>
                {mon.lastCheck?.status=="up" ? <Indicator color="#4caf50"/>:<Indicator color="#ef4444"/>}
              </TableCell>
              <TableCell>
                {mon.lastCheck?.latency != null 
                  ? `${mon.lastCheck.latency} ms` 
                  : <span className="text-gray-400">—</span>}
              </TableCell>
              <TableCell>
                {mon.lastCheck
                  ? new Date(mon.lastCheck.createdAt).toLocaleString()
                  : <span className="text-gray-400">—</span>}
              </TableCell>
              <TableCell className="text-center">
                <MonitoringDropdown
                  id={mon.id}
                  url={mon.url}
                  setMonitors={setMonitors}
                  apiBaseUrl={API_BASE_URL}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
