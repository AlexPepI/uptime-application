import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "@clerk/clerk-react";

export function useMonitorSocket(monitorId, onCheck) {
  const { getToken } = useAuth();

  useEffect(() => {
    let socket;
    (async () => {
      // 1) get your Clerk session token
      const token = await getToken();

      // 2) open socket with auth
      socket = io("http://localhost:3001", {
        auth: { token },
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        console.log("WS connected", socket.id);
      });

      // 3) listen for just your monitor
      socket.on("monitor:check", msg => {
        if (msg.monitorId === monitorId) {
          onCheck(msg);
        }
      });
    })();

    return () => {
      socket?.disconnect();
    };
  }, [monitorId, getToken, onCheck]);
}
