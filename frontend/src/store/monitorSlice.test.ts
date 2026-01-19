import monitorReducer, { toggleEmergency, addSensorData } from "./monitorSlice";
import type { MonitorState } from "./monitorSlice";

describe("Biosys Monitor Redux Logic", () => {
  const initialState: MonitorState = {
    isConnected: false,
    isEmergency: false,
    liveData: [],
    alerts: [],
  };

  test("should handle initial state", () => {
    expect(monitorReducer(undefined, { type: "unknown" })).toEqual({
      isConnected: false,
      isEmergency: false,
      liveData: [],
      alerts: [],
    });
  });

  test("should toggle emergency mode correctly", () => {
    const activeState = monitorReducer(initialState, toggleEmergency());
    expect(activeState.isEmergency).toBe(true);
    expect(activeState.alerts[0]).toBe("EMERGENCY STOP ACTIVATED!");

    const normalState = monitorReducer(activeState, toggleEmergency());
    expect(normalState.isEmergency).toBe(false);
    expect(normalState.alerts[0]).toBe("System returned to normal operation.");
  });

  test("should handle sensor data flow", () => {
    const newData = {
      timestamp: "12:00:00",
      pressure: 25,
      flow: 10,
      volume: 500,
      oxygenLevel: 98,
    };

    const nextState = monitorReducer(initialState, addSensorData(newData));
    expect(nextState.liveData).toHaveLength(1);
    expect(nextState.liveData[0].pressure).toBe(25);
  });
});
