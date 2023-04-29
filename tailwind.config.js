/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textColor: "#252422",
        secTextColor: "#403D39",
        textColorLight: "#FFFCF2",
        borderColor: "#CED4DA",
        secondBgColor: "#E9ECEF",
        accentColor: "#EB5E28",
        accentColorHover: "#F07A4D",
      },
    },
  },
  plugins: [],
};
