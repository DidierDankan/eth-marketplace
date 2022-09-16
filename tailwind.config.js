/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			screens: {
				xs: '475px',
				...defaultTheme.screens,
			},
			maxWidth: {
				'8xl': '1920px', // this is a created class for tailwind (by default, it doesnt exist)
			},
			flex: {
				2: '2 2 0%', // this is a created class for tailwind (by default, it doesnt exist)
				3: '3 3 0%',
				4: '4 4 0%',
			},
		},
	},
	variants: {
		extend: {
			opacity: ['disabled'],
			cursor: ['disabled'],
		},
	},
	plugins: [],
};
