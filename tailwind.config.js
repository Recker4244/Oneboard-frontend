/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      minWidth: {
        '1/2': '50%',
        '1/4': '25%'
      },
      height: {
        '10v': '10vh',
        '20v': '20vh',
        '25v': '25vh',
        '30v': '30vh',
        '40v': '40vh',
        '50v': '50vh',
        '60v': '60vh',
        '70v': '70vh',
        '80v': '80vh',
        '90v': '90vh',
        '100v': '100vh'
      },
      width: {
        '10w': '10vw',
        '20w': '20vw',
        '30w': '30vw',
        '40w': '40vw',
        '50w': '50vw',
        '60w': '60vw',
        '70w': '70vw',
        '80w': '80vw',
        '90w': '90vw',
        '100w': '100vw'
      },
      colors: {
        button: {
          primary: '#061ae6',
          hover: '#3a4aeb'
        },
        body: {
          bg: '#f4f3f3'
        },
        navbar: {
          bg: '#000000'
        },
        white: '#ffffff',
        black: '#000000',
        gray: '#F4F3F3',
        light_black: '#1e1e1e',
        dark_gray: '#303941',
        grey: '#808080',
        form: {
          bg: '#F8F9FB'
        },
        dialog: {
          bg: '#F4F3F3'
        },
        blue: '#0f1ae6',
        light_blue: '#f4f8fb',
        green: '#15ff1a',
        red: '#f24727',
        neutral: '#404040',
        McKinseyBlue: '#051C2C',
        McKinseyElectric: '#2251FF',
        McKinseyCyan: '#00A9F4',
        orangeBadge: '#FF7F50'
      }
    },
    plugins: []
  }
};
