/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./*.php', './src/**/*.{html,js,php,css}'],
  theme: {
    screens: {
      'android-md': '400px',
      'android-md/2': '450px',
      tablet: '640px',
      'tablet-md': '768px',
      laptop: '1024px',
      desktop: '1280px',
      'desktop-md': '1536px',
    },
    extend: {
      height: {
        '68vh': '68vh',
        '76vh': '76vh',
        '80vh': '80vh',
        '90vh': '90vh',
      },
      backgroundColor: {
        primary: '#f7f6f1',
      },
      fontFamily: {
        caveat: ['Caveat', 'cursive'],
      },
    },
    animation: {
      'fade-up': 'fade-up 1s ease-in-out',
      'fade-down': 'fade-down 1s ease-in-out',
    },
    keyframes: {
      'fade-up': {
        '0%': {
          bottom: '-100%',
        },
        '100%': {
          bottom: '0',
        },
      },
      'fade-down': {
        '0%': {
          bottom: '0',
        },
        '100%': {
          bottom: '-100%',
        },
      },
    },
  },
  plugins: [],
};
