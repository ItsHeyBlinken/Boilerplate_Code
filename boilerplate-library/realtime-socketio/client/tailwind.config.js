/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        display: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f4f6f8',
          100: '#e8ecef',
          800: '#1c2430',
          900: '#101820',
        },
        signal: {
          DEFAULT: '#0d9488',
          dark: '#0f766e',
        },
      },
    },
  },
  plugins: [],
}
