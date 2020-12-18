module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        ripple: 'ripple 600ms linear',
      },
      keyframes: {
        ripple: {
          'to': { transform: 'scale(4)', opacity: '0' }
        }
      },
      transitionProperty: {
        'label': 'color, top, font-size, line-height'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
