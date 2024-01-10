/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#0D5ACE",
				secondary: "#A1C7FF",
				background: "#CFE1FC",
				accent: "#AECCFA",
				shadow: "#0D5ACE",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
