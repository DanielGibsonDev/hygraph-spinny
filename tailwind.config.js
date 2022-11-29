module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Work Sans'],
    },
    extend: {
      colors: {
        "ash-black": "#1B1C22",
        "venture-blue": "#4A4AFF",
        "studio-red": "#FF4A70",
        "highlight-yellow": "#FFE300",
        "caribbean-green": "#2EC8A4",
      },
    },
  },
  variants: {
    extend: {
      scale: ["active"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};