import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: "#0EA5E9", // sky blue (accent)
          light: "#38BDF8",   // light sky blue
          dark: "#0284C7",    // deep sky blue
        },
        cream: {
          DEFAULT: "#F0F9FF", // ice blue cream (background)
          dark: "#E0F2FE",    // light ice blue
        },
        maroon: {
          DEFAULT: "#0F3A5F", // deep oceanic blue (primary brand/headings)
          light: "#1C5B8C",   // medium steel blue
          dark: "#061D33",    // dark navy blue
        },
        haldi: {
          DEFAULT: "#06B6D4", // cyan
          muted: "#0891B2",   // deep cyan
        },
        terracotta: {
          DEFAULT: "#0284C7", // sky-600
          muted: "#0369A1",   // sky-700
        },
        spice: {
          brown: "#080F1E",   // midnight space blue background
          warm: "#111E35",    // dark navy card background
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        handwritten: ["var(--font-caveat)", "cursive"],
      },
      backgroundImage: {
        "paper-texture":
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c4a8' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        "rajasthan-pattern":
          "radial-gradient(circle at 20% 80%, rgba(14, 165, 233, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(15, 58, 95, 0.06) 0%, transparent 50%)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        steam: "steam 3s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        steam: {
          "0%, 100%": { opacity: "0.3", transform: "translateY(0) scale(1)" },
          "50%": { opacity: "0.6", transform: "translateY(-8px) scale(1.1)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
