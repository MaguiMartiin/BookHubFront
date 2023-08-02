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
				violeta: "#45090e",
				rojo: "#7e0912",

				negro: "#0f1b36",
				gris: "#76777c",
				blanco: "#e2e2e2",

				primary: "#FF988B",
				primaryLight: "#FAFAFA",
				secondaryBorderLight: "#E5E5E5", //blanco
				customColor0: "#ff90c0",
				customColor1: "#ff65a9",
				customColor2: "#c3418e",
				customColor3: "#793474",
				customColor4: "#44295f",
			},
			animation: {
				"slide-left": "slide-left 5s linear infinite",
			},
			keyframes: {
				"slide-left": {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(calc(-100% + 100px))" }, // Adjust the distance as needed
				},
			},
		},
	},
	plugins: [],
};
