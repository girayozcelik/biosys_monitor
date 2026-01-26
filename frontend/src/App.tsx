import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./store/store";
import { toggleEmergency } from "./store/monitorSlice";
import { useSimulation } from "./hooks/useSimulation";
import { Header } from "./components/Header";
import { StatCard } from "./components/StatCard";
import { AlarmPanel } from "./components/AlarmPanel";
import {
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Wind, Power, Activity } from "lucide-react";

function App() {
  useSimulation();
  const dispatch = useDispatch();
  const { liveData, alerts, isEmergency, isConnected } = useSelector(
    (state: RootState) => state.monitor,
  );

  const currentData = liveData[liveData.length - 1] || {
    pressure: 0,
    flow: 0,
    volume: 0,
  };

  return (
    <div
      className={`min-h-screen p-6 md:p-10 font-sans transition-colors duration-700 ${isEmergency ? "bg-red-50" : "bg-biosys-bg"}`}
    >
      <div className="max-w-7xl mx-auto">
        <Header isConnected={isConnected} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="col-span-1 lg:col-span-8 space-y-8">
            {/* Pressure Chart */}
            <div className="bg-biosys-card p-6 rounded-3xl shadow-ios border border-white relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-biosys-subtext font-bold flex items-center gap-2 text-sm uppercase tracking-wide">
                  <Activity size={18} className="text-medical-green" /> Airway
                  Pressure
                </h3>
                <span
                  className={`text-4xl font-black ${isEmergency ? "text-alert-red animate-pulse" : "text-biosys-text"}`}
                >
                  {currentData.pressure}{" "}
                  <span className="text-lg text-biosys-subtext font-medium">
                    cmH2O
                  </span>
                </span>
              </div>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={liveData}>
                    <defs>
                      <linearGradient
                        id="colorPressure"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#34C759"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor="#34C759"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <YAxis domain={[0, 40]} hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        borderRadius: "12px",
                        border: "none",
                        color: "#fff",
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                      }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="pressure"
                      stroke="#34C759"
                      strokeWidth={3}
                      fill="url(#colorPressure)"
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Flow Chart */}
            <div className="bg-biosys-card p-6 rounded-3xl shadow-ios border border-white relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-biosys-subtext font-bold flex items-center gap-2 text-sm uppercase tracking-wide">
                  <Wind size={18} className="text-biosys-blue" /> Flow Rate
                </h3>
                <span
                  className={`text-4xl font-black ${isEmergency ? "text-alert-red animate-pulse" : "text-biosys-text"}`}
                >
                  {currentData.flow}{" "}
                  <span className="text-lg text-biosys-subtext font-medium">
                    L/min
                  </span>
                </span>
              </div>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={liveData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <YAxis domain={[-60, 60]} hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        borderRadius: "12px",
                        border: "none",
                        color: "#fff",
                      }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="flow"
                      stroke="#007AFF"
                      strokeWidth={3}
                      dot={false}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-5">
              <StatCard
                label="Tidal Vol."
                value={currentData.volume}
                unit="mL"
              />
              <StatCard label="SpO2" value="98" unit="%" isGreen />
              <StatCard label="I:E Ratio" value="1:2.0" />
              <StatCard label="PEEP" value="5.0" />
            </div>

            <AlarmPanel alerts={alerts} isEmergency={isEmergency} />

            <button
              onClick={() => dispatch(toggleEmergency())}
              className={`w-full font-bold py-6 px-4 rounded-3xl flex items-center justify-center gap-4 transition-all duration-300 shadow-xl active:scale-[0.98]
                ${isEmergency ? "bg-yellow-400 text-yellow-900 shadow-yellow-200" : "bg-alert-red text-white shadow-red-200 hover:shadow-red-300"}`}
            >
              <div className="bg-white/20 p-2 rounded-full">
                <Power
                  size={24}
                  className={isEmergency ? "" : "animate-pulse"}
                />
              </div>
              <div className="text-left">
                <div className="text-xs opacity-90 font-medium uppercase tracking-wider">
                  {isEmergency ? "System Paused" : "Safety Control"}
                </div>
                <div className="text-lg font-black">
                  {isEmergency ? "RESTART SYSTEM" : "EMERGENCY STOP"}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
