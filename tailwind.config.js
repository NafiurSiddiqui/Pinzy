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
        '65vh': '65vh',
        '76vh': '76vh',
        '80vh': '80vh',
      },
      backgroundColor: {
        primary: '#f7fee7',
      },
    },
  },
  plugins: [],
};
