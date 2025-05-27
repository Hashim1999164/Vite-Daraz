/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#5A31F4',
          secondary: '#A66EFE',
        },
        backgroundImage: {
          'gradient-purple': 'linear-gradient(135deg, #5A31F4 0%, #A66EFE 100%)',
        },
        animation: {
            'bounce-slow': 'bounce 2s infinite',
        },
      },
    },
    plugins: [],
  }