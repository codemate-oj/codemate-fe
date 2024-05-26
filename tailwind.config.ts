import plugin, { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        yahei: ["Microsoft YaHei", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            div: {
              display: "flex",

              "flex-wrap": "wrap",
              "align-items": "center",

              "&:first-of-type": {
                "margin-bottom": "1rem",
                h2: {
                  " font-weight": "normal",
                  margin: "0",
                  display: "inline-block",
                  color: "#FF7D37",
                  "&::before": {
                    margin: "0",
                    content: '"【"',
                    color: "#FF7D37", // 根据需要更改颜色
                  },
                  "&::after": {
                    content: '"】"',
                    color: "#FF7D37", // 根据需要更改颜色
                  },
                },
              },
              "&:nth-of-type(n+2)": {
                "margin-bottom": "0.5rem",
                h2: {
                  display: "inline-block",
                  " font-weight": "normal",
                  "font-size": "1rem",
                  margin: "0",
                  "&::before": {
                    content: '"【"',
                    "margin-left": "0.3rem",
                  },
                  "&::after": {
                    content: '"】"',
                  },
                },
                p: {
                  color: "#797979",
                  "white-space": "normal",
                },
              },
            },
            p: {
              display: "inline-block",
              margin: "0",
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
