/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "biosys-bg": "#F3F4F6",
        "biosys-card": "#FFFFFF",
        "biosys-text": "#1e293b",
        "biosys-subtext": "#64748b",
        "biosys-blue": "#007AFF",
        "medical-green": "#34C759",
        "alert-red": "#FF3B30",
      },
      boxShadow: {
        ios: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
