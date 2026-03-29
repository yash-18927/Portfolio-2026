import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-space-mono)", "'Space Mono'", "monospace"],
      },
      colors: {
        "ag-black": "#000000",
        "ag-white": "#FFFFFF",
        "ag-border": "rgba(255,255,255,0.15)",
        "ag-glass": "rgba(255,255,255,0.04)",
        "ag-muted": "rgba(255,255,255,0.4)",
      },
      backdropBlur: {
        xs: "2px",
        "3xl": "64px",
        "4xl": "100px",
      },
      letterSpacing: {
        tightest: "-0.05em",
        widest: "0.25em",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
