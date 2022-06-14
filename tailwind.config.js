module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dancingscripts: ["Dancing Script", "cursive"],
      },
      screens: {
        A51: { raw: "(max-aspect-ratio: 412/914)" },
        tablet: "600px",
        "190screen": { raw: "(max-width: 190px)" },
        "330screen": "330px",
        "560screen": "560px",
      },
    },
    colors: {
      primary: "white",
      error: "#FF5733",
      "color-one": "#1B208C",
      "color-two": "#464AA6",
      "color-three": "#787CBF",
      "color-four": "#F2F2F0",
      "color-five": "#F2BC79",
    },
  },
  plugins: [],
};
