// src/hooks/useMonitors.js
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "@clerk/clerk-react";

export const useMonitors = (apiBaseUrl) => {
  const [monitors, setMonitors] = useState();
  const { getToken } = useAuth();

  useEffect(() => {
    let socket;

    const init = async () => {
      // 1) fetch initial list
      try {
        const token = await getToken();
        const res = await fetch(`${apiBaseUrl}/uptime/active-monitors`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setMonitors(data);
      } catch (err) {
        console.error("Error loading monitors:", err);
        return;
      }

      // 2) connect socket
      try {
        const token2 = await getToken();
        socket = io(`${apiBaseUrl}/refresh-values`, {
          auth: { token: token2 },
          transports: ["websocket"],
        });

        socket.on("connect_error", (err) =>
          console.error("WS connect error:", err.message)
        );

        // 3) handle updates & additions
        socket.on(
          "new-check",
          ({ monitorId, url, status, latency, timestamp }) => {
            setMonitors((prev) => {
              const exists = prev.some((mon) => mon.url === url);

              if (exists) {
                return prev.map((mon) =>
                  mon.id === monitorId
                    ? {
                        ...mon,
                        lastCheck: {
                          status,
                          latency,
                          createdAt: timestamp,
                        },
                      }
                    : mon
                );
              } else {
                return [
                  ...prev,
                  {
                    id: monitorId,
                    url,
                    active: true,
                    createdAt: timestamp,
                    lastCheck: {
                      status,
                      latency,
                      createdAt: timestamp,
                    },
                  },
                ];
              }
            });
          }
        );
      } catch (err) {
        console.error("Socket setup failed:", err);
      }
    };

    init();

    return () => {
      if (socket) socket.disconnect();
    };
  }, [apiBaseUrl, getToken]);

  return {monitors,setMonitors};
};
