/**
 * Tailwind config.
 * @description Tailwind config.
 * @see https://tailwindcss.com/docs/
 * @see https://flowbite.com/docs/
 */
import flowbitePlugin from 'flowbite/plugin'

export const primaryColor = {
	50  : '#DFDFF7',
	100 : '#D7D7F4',
	200 : '#C3C2EF',
	300 : '#AFAEEA',
	400 : '#9796E4',
	500 : '#7978DC',
	600 : '#6B69D8',
	700 : '#5755D3',
	800 : '#3B39CC',
	900 : '#22217E',
	950 : '#000000',
}

/** @type {import('tailwindcss').Config} */
export default {
	content  : [ './src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}' ],
	plugins  : [ flowbitePlugin ],
	darkMode : 'class',
	theme    : { extend : {
		textShadow : {
			sm      : '0 1px 2px var(--tw-shadow-color)',
			DEFAULT : '0 2px 4px var(--tw-shadow-color)',
			lg      : '0 8px 16px var(--tw-shadow-color)',
		},
		boxShadow : { btn: '0 0 20px 2px var(--tw-shadow-color)' },
		animation : {
			border : 'background ease-in-out infinite',
			fill   : 'fill 5s infinite',
		},
		keyframes : {
			background : {
				'0%, 100%' : { backgroundPosition: '0% 50%' },
				'50%'      : { backgroundPosition: '100% 50%' },
			},
			fill : {
				'0%'  : { fill: 'white' },
				'50%' : { fill: '#7978DC' },
				'75%' : { fill: '#9676d6' },
			},
		},
		colors : {
			/**
			 * Colors of interface.
			 * @see https://uicolors.app/create
			 * @see https://www.tints.dev/
			 */
			secondary : {
				50  : '#f9f7fd',
				100 : '#f1edfa',
				200 : '#e4ddf7',
				300 : '#d0c3ef',
				400 : '#b39ce4',
				500 : '#9676d6',
				600 : '#7e58c5',
				700 : '#6a45ab',
				800 : '#604096',
				900 : '#4a3172',
				950 : '#2f1a51',
			},
			primary : primaryColor,
			gray    : {
				50  : '#E6E6E6',
				100 : '#D9D9D9',
				200 : '#BFBFBF',
				300 : '#A6A6A6',
				400 : '#8C8C8C',
				500 : '#737373',
				600 : '#595959',
				700 : '#404040',
				800 : '#262626',
				900 : '#0D0D0D',
				950 : '#000000',
			},
		},
	} },
}

