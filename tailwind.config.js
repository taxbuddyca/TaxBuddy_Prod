/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'sm': '0.8rem',
        'base': '0.95rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
      },
      colors: {
        navy: {
          950: "#01040D",
          900: "#020817",
          800: "#0F172A",
          DEFAULT: "#020817",
        },
        growth: {
          500: "#3B82F6", // Blue-500
          600: "#2563EB", // Blue-600
          DEFAULT: "#2563EB",
        },
        primary: {
          DEFAULT: "#020817",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#00D97E",
          foreground: "#FFFFFF",
        },
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.3))',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(15, 23, 42, 0.1)',
        'premium': '0 20px 50px -12px rgba(15, 23, 42, 0.15)',
        'emerald': '0 10px 30px -10px rgba(11, 79, 59, 0.3)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
