/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'class',
  safelist: [
    'w-64',
    'w-1/2',
    'rounded-l-lg',
    'rounded-r-lg',
    'bg-gray-200',
    'grid-cols-4',
    'grid-cols-7',
    'h-6',
    'leading-6',
    'h-9',
    'leading-9',
    'shadow-lg'
  ],
  theme: {
    extend: {
      colors: {
        primary: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a" }
      }
    },
    // fontFamily: {
    //   'body': [
    //     'Inter',
    //     'ui-sans-serif',
    //     'system-ui',
    //     '-apple-system',
    //     'system-ui',
    //     'Segoe UI',
    //     'Roboto',
    //     'Helvetica Neue',
    //     'Arial',
    //     'Noto Sans',
    //     'sans-serif',
    //     'Apple Color Emoji',
    //     'Segoe UI Emoji',
    //     'Segoe UI Symbol',
    //     'Noto Color Emoji'
    //   ],
    //   'sans': [
    //     'Inter',
    //     'ui-sans-serif',
    //     'system-ui',
    //     '-apple-system',
    //     'system-ui',
    //     'Segoe UI',
    //     'Roboto',
    //     'Helvetica Neue',
    //     'Arial',
    //     'Noto Sans',
    //     'sans-serif',
    //     'Apple Color Emoji',
    //     'Segoe UI Emoji',
    //     'Segoe UI Symbol',
    //     'Noto Color Emoji'
    //   ]
    // }
  }
}

