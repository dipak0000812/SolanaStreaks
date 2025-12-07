import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}", // For non-src directory structure
    ],
    theme: {
        extend: {
            colors: {
                background: '#0F172A', // slate-900
                foreground: '#F8FAFC', // slate-50
                card: {
                    DEFAULT: '#1E293B', // slate-800
                    foreground: '#F8FAFC'
                },
                popover: {
                    DEFAULT: '#1E293B',
                    foreground: '#F8FAFC'
                },
                primary: {
                    DEFAULT: '#0EA5E9', // sky-500
                    foreground: '#FFFFFF'
                },
                secondary: {
                    DEFAULT: '#A855F7', // purple-500
                    foreground: '#FFFFFF'
                },
                muted: {
                    DEFAULT: '#334155', // slate-700
                    foreground: '#94A3B8' // slate-400
                },
                accent: {
                    DEFAULT: '#1E293B',
                    foreground: '#F8FAFC'
                },
                destructive: {
                    DEFAULT: '#EF4444',
                    foreground: '#FFFFFF'
                },
                border: '#334155',
                input: '#334155',
                ring: '#0EA5E9',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "shimmer": "shimmer 2s linear infinite",
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
                shimmer: {
                    from: { backgroundPosition: "0 0" },
                    to: { backgroundPosition: "-200% 0" },
                }
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;
