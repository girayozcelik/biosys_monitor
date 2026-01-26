import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import {
  addSensorData,
  setConnectionStatus,
  addAlert,
  toggleEmergency,
} from "../store/monitorSlice";

export const useSimulation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isEmergency } = useSelector((state: RootState) => state.monitor);
  const socketUrl =
    import.meta.env.VITE_WS_URL?.trim() || "ws://127.0.0.1:8000/ws";

  // WebSocket referansı
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptsRef = useRef(0);

  useEffect(() => {
    if (isEmergency) {
      if (socketRef.current) {
        console.log("🛑 Emergency Shutdown");
        socketRef.current.close();
        socketRef.current = null;
      }
      return;
    }

    const connect = () => {
      // 🟢 BAĞLANTIYI BAŞLAT
      if (
        socketRef.current?.readyState === WebSocket.OPEN ||
        socketRef.current?.readyState === WebSocket.CONNECTING
      ) {
        return;
      }

      const socket = new WebSocket(socketUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("✅ WebSocket Bağlandı");
        reconnectAttemptsRef.current = 0;
        dispatch(setConnectionStatus(true));
        dispatch(addAlert("Connected to Biosys AI Engine..."));
      };

      socket.onmessage = (event) => {
        if (socketRef.current === null) return;

        try {
          const response = JSON.parse(event.data);

          if (response.type === "DATA") {
            dispatch(addSensorData(response.payload));
          } else if (response.type === "PREDICTION_WARNING") {
            dispatch(addAlert(response.message));
            if (response.payload) dispatch(addSensorData(response.payload));
          } else if (response.type === "STOPPED") {
            dispatch(addAlert(response.message));
            dispatch(toggleEmergency());
          }
        } catch (error) {
          console.error("Veri hatası:", error);
        }
      };

      socket.onclose = () => {
        console.log("⚠️ WebSocket Kapandı");
        dispatch(setConnectionStatus(false));

        if (isEmergency) return;

        const attempt = reconnectAttemptsRef.current + 1;
        reconnectAttemptsRef.current = attempt;
        const delayMs = Math.min(1000 * attempt, 5000);

        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, delayMs);
      };
    };

    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      const socket = socketRef.current;
      if (
        socket?.readyState === WebSocket.OPEN ||
        socket?.readyState === WebSocket.CONNECTING
      ) {
        socket.close();
      }
    };
  }, [dispatch, isEmergency, socketUrl]);
};
