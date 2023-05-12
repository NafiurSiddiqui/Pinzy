/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,php}'],
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
        '76vh': '76vh',
      },
      backgroundColor: {
        primary: '#f7fee7',
      },
    },
  },
  plugins: [],
};
