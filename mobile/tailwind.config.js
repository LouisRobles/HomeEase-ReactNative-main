/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E40AF",
          dark: "#0C2340",
          light: "#3B82F6",
          white: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#0EA5E9",
          light: "#06B6D4",
          muted: "#0284C7",
        },
        card: {
          DEFAULT: "#3B82F6",
          light: "#60A5FA",
          dark: "#1E40AF",
        },
        surface: "#FFFFFF",
        white: "#FFFFFF",
        text: {
          primary: "#000000",
          secondary: "#D3D3D3",
          muted: "#9CA3AF",
        },
        gold: "#F59E0B",
        success: "#10B981",
        error: "#EF4444",
        warning: "#F59E0B",
        pending: "#F59E0B",
        active: "#0EA5E9",
        completed: "#10B981",
        cancelled: "#EF4444",
        divider: "#E5E7EB",
      },
    },
  },
  plugins: [],
};
