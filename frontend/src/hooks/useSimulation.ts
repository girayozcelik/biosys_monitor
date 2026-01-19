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

  // WebSocket referansı
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (isEmergency) {
      if (socketRef.current) {
        console.log("🛑 Emergency Shutdown");
        socketRef.current.close(); 
        socketRef.current = null; 
      }
      return; 
    }

    // 🟢 BAĞLANTIYI BAŞLAT
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    const socket = new WebSocket("ws://127.0.0.1:8000/ws");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("✅ WebSocket Bağlandı");
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
    };

    return () => {
      if (
        socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING
      ) {
        socket.close();
      }
    };
  }, [dispatch, isEmergency]); 
};
