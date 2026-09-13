/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Sora"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          50: '#f3f6f4',
          100: '#e2e8e4',
          700: '#2a3530',
          900: '#121a16',
        },
        moss: {
          DEFAULT: '#3d6b4f',
          dark: '#2f523c',
          light: '#6f9b7c',
        },
        sand: {
          DEFAULT: '#d4c4a8',
        },
      },
    },
  },
  plugins: [],
}
