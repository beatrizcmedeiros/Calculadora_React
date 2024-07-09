module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Inclua todos os arquivos JavaScript e TypeScript
    './public/index.html',         // Inclua o arquivo HTML principal
  ],
  theme: {
    extend: {
      screens: {
        '-sm': {max:	'640px'},
        '-md': {max:	'768px'},
        '-lg': {max:	'1024px'}, 
        '-xl': {max:	'1280px'}, 
        '-2xl': {max:	'1536px'},
      },
    },
  },
  plugins: [],
}
