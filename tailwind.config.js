const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    darkMode: 'class',
    container: {
      center: true,
      padding: '2rem'
    }
  },
  plugins: [],
});