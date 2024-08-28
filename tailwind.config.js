const animate = require("tailwindcss-animate")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}',
    './index.html'
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        sans: ['Barlow'],
      },
      fontSize:{
        "title":"3rem",
        "body":"1rem",
        "small":"0.7rem",
      },
      colors:{
        "primary": {'50': '#eafff7',
          '100': '#cbffe9',
          '200': '#9dfdd9',
          '300': '#5df8c6',
          '400': '#16dea5',
          '500': '#00d09a',
          '600': '#00aa7f',
          '700': '#008869',
          '800': '#006b54',
          '900': '#005847',
          '950': '#003229',},
          "background": "#111213",
          "secondary": "#EF8354",
        },
        boxShadow: {
          'button': 'rgb(0, 0, 0) 0px 10px 13px -7px, 1px 1px 20px 3px rgba(239,131,84,0.27)',
          'button-hover': 'rgb(0, 0, 0) 0px 10px 13px -7px, 1px 1px 20px 3px rgba(0,136,105,0.27)',
          'buttonRight':'20px 1px 20px 3px rgba(239,131,84,0.27)',
          'buttonLeft':'-20px 1px 20px 3px rgba(239,131,84,0.27)',
        }
    },
  },
  plugins: [animate],
}