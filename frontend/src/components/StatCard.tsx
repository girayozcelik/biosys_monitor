interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  isGreen?: boolean;
}

export const StatCard = ({
  label,
  value,
  unit,
  isGreen = false,
}: StatCardProps) => (
  <div className="bg-biosys-card p-5 rounded-3xl border border-gray-100 shadow-ios hover:shadow-lg transition-all duration-300 text-center">
    <p className="text-biosys-subtext text-[11px] font-bold uppercase tracking-widest mb-2">
      {label}
    </p>
    <div
      className={`text-3xl md:text-4xl font-extrabold flex justify-center items-end gap-1 ${isGreen ? "text-medical-green" : "text-biosys-text"}`}
    >
      {value}
      {unit && (
        <span className="text-sm text-biosys-subtext mb-1.5 font-medium">
          {unit}
        </span>
      )}
    </div>
  </div>
);
