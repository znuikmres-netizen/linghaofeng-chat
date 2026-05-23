import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        comic: ["'Comic Neue'", "'Nunito'", "cursive"],
        display: ["'Fredoka One'", "cursive"],
      },
      colors: {
        space: {
          deep: "#0a0a2e",
          navy: "#0d1b4b",
          purple: "#1a0a3c",
          star: "#FFD700",
          cyan: "#00E5FF",
          pink: "#FF4DA6",
          green: "#00FF87",
        },
      },
      backgroundImage: {
        "space-gradient":
          "radial-gradient(ellipse at top, #1a0a3c 0%, #0d1b4b 40%, #0a0a2e 100%)",
        "nebula-gradient":
          "radial-gradient(ellipse at 30% 50%, rgba(100,0,200,0.3) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(0,100,200,0.3) 0%, transparent 60%)",
        "button-glow":
          "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "star-twinkle": "starTwinkle 1.5s ease-in-out infinite",
        "bounce-soft": "bounceSoft 0.6s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.8s ease-out",
        "zoom-in": "zoomIn 0.4s ease-out",
        "spin-slow": "spin 8s linear infinite",
        "wiggle": "wiggle 0.5s ease-in-out",
        "star-collect": "starCollect 0.8s ease-out forwards",
        "energy-pulse": "energyPulse 1s ease-in-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,229,255,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(0,229,255,0.8)" },
        },
        starTwinkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.3", transform: "scale(0.7)" },
        },
        bounceSoft: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        zoomIn: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        starCollect: {
          "0%": { transform: "scale(0) rotate(0deg)", opacity: "1" },
          "50%": { transform: "scale(1.5) rotate(180deg)", opacity: "1" },
          "100%": { transform: "scale(0) rotate(360deg) translateY(-80px)", opacity: "0" },
        },
        energyPulse: {
          "0%": { transform: "scaleX(1)" },
          "50%": { transform: "scaleX(1.05)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};

export default config;
