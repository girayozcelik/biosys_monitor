import { Wifi } from "lucide-react";
import biosysLogo from "../assets/biosys-logo.png";

interface HeaderProps {
  isConnected: boolean;
}

export const Header = ({ isConnected }: HeaderProps) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 px-2">
      <div className="flex items-center gap-4">
        <img
          src={biosysLogo}
          alt="Biosys Medical"
          className="h-12 w-auto object-contain drop-shadow-sm"
        />

        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-tight text-biosys-text leading-none">
            BIOSYS
          </h1>
          <span className="text-[10px] text-biosys-blue font-bold tracking-[0.25em] uppercase">
            Biyovent Monitor
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
        <span
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shadow-sm border transition-all ${isConnected ? "bg-white text-medical-green border-green-100" : "bg-white text-alert-red border-red-100"}`}
        >
          <div
            className={`w-2 h-2 rounded-full ${isConnected ? "bg-medical-green animate-pulse" : "bg-alert-red"}`}
          ></div>
          <Wifi size={14} />
          {isConnected ? "ONLINE" : "OFFLINE"}
        </span>
        <span className="text-biosys-subtext text-xs bg-white px-4 py-2 rounded-full border border-gray-100 font-medium shadow-sm">
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </header>
  );
};
