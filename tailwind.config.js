/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#FF988B",
				primaryLight: "#FAFAFA",
				secondaryBorderLight: "#E5E5E5",
				customColor0: "#ff90c0",
				customColor1: "#ff65a9",
				customColor2: "#c3418e",
				customColor3: "#793474",
				customColor4: "#44295f",
			},
		},
	},
	plugins: [],
};