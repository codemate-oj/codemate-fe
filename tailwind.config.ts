import { Config } from "tailwindcss";

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
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },
        fail: {
          DEFAULT: "var(--fail)",
          foreground: "var(--fail-foreground)",
        },
        progress: {
          DEFAULT: "var(--progress)",
          foreground: "var(--progress-foreground)",
        },
        invalid: {
          DEFAULT: "var(--invalid)",
          foreground: "var(--invalid-foreground)",
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
      screens: {
        "4xl": "1920px",
      },
      fontFamily: {
        yahei: ["Microsoft YaHei", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            pre: {
              background: "transparent",
              border: "1px solid #e2e8f0", // gray.300
              borderRadius: "0.25rem",
            },
            code: {
              color: "#2d3748", // gray.800
            },
          },
        },
        // 定制题目详情页的prose样式
        pdetail: {
          css: {
            // 定义code样式
            pre: {
              background: "transparent",
              border: "1px solid #e2e8f0", // gray.300
              borderRadius: "0.25rem",
            },
            code: {
              color: "#2d3748", // gray.800
            },
            // 配合flexify插件使用
            div: {
              margin: "0.5rem 0",

              // 内部标题的通用规则
              h2: {
                display: "inline-block",
                fontWeight: "bold",
                margin: "0",
                "&::before": {
                  content: '"【"',
                  margin: "0",
                },
                "&::after": {
                  content: '"】"',
                  margin: "0",
                },
              },

              p: {
                display: "inline-block",
                margin: 0,
              },

              // 首个标题的特殊规则
              "&:first-of-type": {
                alignItems: "flex-start",
                flexDirection: "column",
                gap: "0.5rem",
                marginBottom: "1rem",
                h2: {
                  display: "block",
                  color: "#FF7D37",
                  marginBottom: "0.5rem",
                  "&::before": {
                    color: "#FF7D37", // 根据需要更改颜色
                  },
                  "&::after": {
                    color: "#FF7D37", // 根据需要更改颜色
                  },
                },
              },
              // 后续标题的规则
              "&:nth-of-type(n+2)": {
                h2: {
                  fontSize: "1rem",
                },
                p: {
                  color: "#797979",
                  whiteSpace: "normal",
                  margin: 0,
                },
              },
            },
          },
        },
      },
    },
  },
  safelist: ["text-success", "text-fail", "text-progress", "text-invalid"],
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography"), "tailwindcss/nesting"],
} satisfies Config;

export default config;
