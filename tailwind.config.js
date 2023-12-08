/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-grey": "hsl(248deg 10% 15%)",
        grey: "hsl(251deg 9% 53%)",
        "almost-white": "hsl(252deg 11% 91%)",
        "very-dark-grey": "hsl(248deg 15% 11%)",
        "neon-green": "hsl(127deg 100% 82%)",
        red: "hsl(0deg 91% 63%)",
        orange: "hsl(13deg 95% 66%)",
        yellow: "hsl(42deg 91% 68%)",
      },
      fontFamily: {
        jetbrainsmono: ["Jet Brains Mono", "serif"],
      },
      fontSize: {
        body: ["1.125rem", "1.4375rem"],
        title: ["1rem", "1.32rem"],
        "heading-M": ["1.5rem", "2rem"],
        "heading-L": ["2rem", "2.6875rem"],
      },
    },
  },
  plugins: [],
};
