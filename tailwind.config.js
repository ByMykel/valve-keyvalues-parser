const animate = require("tailwindcss-animate")
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx,vue}",
        "./components/**/*.{ts,tsx,vue}",
        "./app/**/*.{ts,tsx,vue}",
        "./src/**/*.{ts,tsx,vue}"
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px"
            }
        },
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
                mono: [
                    "JetBrains Mono",
                    "Fira Code",
                    ...defaultTheme.fontFamily.mono
                ]
            },
            colors: {
                bento: {
                    bg: "rgb(var(--bento-bg) / <alpha-value>)",
                    card: "rgb(var(--bento-card) / <alpha-value>)",
                    cardHover: "rgb(var(--bento-card-hover) / <alpha-value>)",
                    border: "rgb(var(--bento-border) / <alpha-value>)",
                    borderHover:
                        "rgb(var(--bento-border-hover) / <alpha-value>)",
                    accent: "rgb(var(--bento-accent) / <alpha-value>)",
                    accentLight:
                        "rgb(var(--bento-accent-light) / <alpha-value>)",
                    text: "rgb(var(--bento-text) / <alpha-value>)",
                    textMuted: "rgb(var(--bento-text-muted) / <alpha-value>)",
                    success: "rgb(var(--bento-success) / <alpha-value>)",
                    error: "rgb(var(--bento-error) / <alpha-value>)",
                    warning: "rgb(var(--bento-warning) / <alpha-value>)"
                }
            },
            borderRadius: {
                "4xl": "2rem",
                "5xl": "2.5rem"
            },
            boxShadow: {
                bento: "var(--bento-shadow)",
                "bento-hover": "var(--bento-shadow-hover)"
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" }
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 }
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out"
            }
        }
    },
    plugins: [animate]
}
