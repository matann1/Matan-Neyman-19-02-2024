/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Pacifico: ["Pacifico", "cursive"],
        mont: ["Montserrat"],
      },
      boxShadow: {
        cardShadow: "0 0 70px -10px rgba(0, 0, 0, 0.2)",
        cardInnerShadow: "0 0 20px -10px rgba(0, 0, 0, 0.2)",
      },
      backgroundImage: {
        myGrad: "linear-gradient( 135deg, #72EDF2 10%, #5151E5 100%)",
      },
    },
  },
  plugins: [],
};
