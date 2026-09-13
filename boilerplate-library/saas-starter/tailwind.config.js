/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-monospace', 'monospace'],
      },
      colors: {
        slateink: {
          50: '#f2f5f8',
          100: '#e4eaf0',
          800: '#1a2330',
          900: '#0f1620',
        },
        accent: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
}
