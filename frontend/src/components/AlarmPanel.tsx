import { AlertTriangle, RefreshCw } from "lucide-react";

interface AlarmPanelProps {
  alerts: string[];
  isEmergency: boolean;
}

export const AlarmPanel = ({ alerts, isEmergency }: AlarmPanelProps) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-ios border border-white h-[350px] flex flex-col transition-all relative overflow-hidden">
      <h3 className="text-alert-red font-bold flex items-center gap-2 mb-4 text-sm uppercase tracking-wide shrink-0">
        <AlertTriangle size={18} />
        {isEmergency ? "Emergency Mode" : "Recent Events"}
      </h3>
      <div className="overflow-y-auto flex-1 space-y-3 pr-2 custom-scrollbar">
        {alerts.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-300 space-y-3">
            <RefreshCw size={32} />
            <p className="text-sm font-medium">System Nominal</p>
          </div>
        ) : (
          alerts.map((alert, idx) => (
            <div
              key={idx}
              className="bg-red-50 p-3 rounded-2xl text-xs text-gray-700 flex justify-between items-center gap-3 border border-red-100 animate-in fade-in slide-in-from-bottom-1 duration-300"
            >
              <span className="font-semibold text-gray-800 break-words w-2/3">
                {alert}
              </span>
              <span className="text-[10px] text-gray-400 font-mono whitespace-nowrap bg-white px-2 py-1 rounded-md shadow-sm">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
