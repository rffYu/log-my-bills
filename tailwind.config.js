/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}" // adjust if needed
  ],
  safelist: [
    'flex', 'flex-col', 'flex-row', 'gap-2', 'gap-4', 'rounded-xl',
    'text-sm', 'text-base', 'p-2', 'p-4', 'items-center', 'justify-between'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
        secondary: '#f5f5f5',
        danger: '#ff4d4f',
        success: '#52c41a',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // if preflight breaks native tag styling
  }
}

