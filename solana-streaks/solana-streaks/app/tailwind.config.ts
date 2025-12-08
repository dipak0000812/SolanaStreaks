import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Cyberpunk Gaming Theme - AAA Quality
                'neon-green': '#00FF94',
                'neon-pink': '#FF006E',
                'neon-purple': '#8B5CF6',
                'neon-cyan': '#00D9FF',
                'neon-orange': '#FF8C00',
                'neon-gold': '#FFD700',
                'space-black': '#0A0E1A',
                'space-blue': '#151B2E',
                'space-gray': '#1F2937',
                
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'hero-gradient': 'radial-gradient(ellipse at top, #1F2937 0%, #0A0E1A 50%)',
                'card-glass': 'linear-gradient(135deg, rgba(31, 41, 55, 0.7) 0%, rgba(21, 27, 46, 0.5) 100%)',
                'success-gradient': 'linear-gradient(135deg, #00FF94 0%, #00D9FF 100%)',
                'streak-fire': 'linear-gradient(180deg, #FF006E 0%, #FF8C00 50%, #FFD700 100%)',
                'premium-badge': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
            },
            fontFamily: {
                'orbitron': ['Orbitron', 'sans-serif'],
                'inter': ['Inter', 'sans-serif'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' }
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '1', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.05)' }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                'slide-up': {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'shimmer': 'shimmer 2s infinite linear',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
                'slide-up': 'slide-up 0.5s ease-out',
                'fade-in': 'fade-in 0.3s ease-in'
            },
            backdropBlur: {
                'xs': '2px',
            },
            boxShadow: {
                'neon-green': '0 0 20px rgba(0, 255, 148, 0.5)',
                'neon-pink': '0 0 20px rgba(255, 0, 110, 0.5)',
                'neon-purple': '0 0 20px rgba(139, 92, 246, 0.5)',
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
