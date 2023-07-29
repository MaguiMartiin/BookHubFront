/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			primary: ["Baloo", "sans-serif"],
			secondary: ["Abel", "serif"],
			tertiary: ["Alegreya Sans"],
		},
		container: {
			padding: {
				DEFAULT: "15px",
			},
		},
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},

		extend: {
			colors: {
				primary: "#ff988b",
				secondary: "ffd8d4",
				tertiary: "ffbfb7",
			},
		},
	},
	plugins: [],
};
