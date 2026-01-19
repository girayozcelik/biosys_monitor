import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface DeviceData {
  timestamp: string;
  pressure: number;
  flow: number;
  volume: number;
  oxygenLevel: number;
}

export interface MonitorState {
  isConnected: boolean;
  isEmergency: boolean;
  liveData: DeviceData[];
  alerts: string[];
}

const initialState: MonitorState = {
  isConnected: false,
  isEmergency: false,
  liveData: [],
  alerts: [],
};

const monitorSlice = createSlice({
  name: "monitor",
  initialState,
  reducers: {
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    toggleEmergency: (state) => {
      state.isEmergency = !state.isEmergency;
      if (state.isEmergency) {
        state.alerts.unshift("EMERGENCY STOP ACTIVATED!");
      } else {
        state.alerts.unshift("System returned to normal operation.");
      }
    },
    addSensorData: (state, action: PayloadAction<DeviceData>) => {
      state.liveData.push(action.payload);
      if (state.liveData.length > 50) state.liveData.shift();
    },
    addAlert: (state, action: PayloadAction<string>) => {
      state.alerts.unshift(action.payload);
    },
  },
});

export const { setConnectionStatus, toggleEmergency, addSensorData, addAlert } =
  monitorSlice.actions;
export default monitorSlice.reducer;
