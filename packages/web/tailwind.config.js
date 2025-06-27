/**
 * Tailwind config.
 *
 * @description Tailwind config.
 * @see https://tailwindcss.com/docs/
 * @see https://flowbite.com/docs/
 */
import typographyPlugin from '@tailwindcss/typography'
import flowbitePlugin   from 'flowbite/plugin'
import plugin           from 'tailwindcss/plugin'

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
	content : [ './src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}' ],
	plugins : [
		flowbitePlugin,
		typographyPlugin,
		plugin( ( {
			addUtilities, theme,
		} ) => {

			const colors           = theme( 'colors' )
			const createGlowEffect = color => ( {
				position        : 'relative',
				backgroundSize  : '200% 100%',
				animation       : 'themeBgGlow 1s ease-in-out forwards',
				backgroundImage : `linear-gradient(120deg, rgba(0,0,0,0) 0%, ${color} 25%, rgba(0,0,0,0) 100%)`,
			} )
			const createTextGlow   = color => ( {
				...createGlowEffect( color ),
				backgroundClip       : 'text',
				WebkitBackgroundClip : 'text',
				color                : 'transparent',
			} )
			const glowEffects      = Object.keys( colors ).reduce( ( acc, k ) => {

				const color = colors[k]
				if ( typeof color === 'string' ) {

					acc[`.bg-glow-effect-${k}`]   = createGlowEffect( color )
					acc[`.text-glow-effect-${k}`] = createTextGlow( color )

				}
				else if ( typeof color === 'object' ) {

					for ( const key in color ) {

						acc[`.bg-glow-effect-${k}-${key}`]   = createGlowEffect( color[key] )
						acc[`.text-glow-effect-${k}-${key}`] = createTextGlow( color[key] )

					}

				}
				return acc

			}, {} )
			glowEffects['@keyframes themeBgGlow'] = {
				'0%'   : { backgroundPosition: '-100%' },
				'100%' : { backgroundPosition: '100%' },
			}
			addUtilities( {
				'.scrollbar-hidden' : {
					'&::-webkit-scrollbar' : { display: 'none' },
					'-ms-overflow-style'   : 'none', // IE & Edge
					'scrollbar-width'      : 'none', // Firefox
				},
				'.transition-theme' : {
					transitionProperty       : 'all',
					transitionDuration       : '300ms',
					transitionTimingFunction : 'ease-in-out',
				},
				...glowEffects,
			} )

		} ),
	],
	darkMode : 'class',
	theme    : { extend : {
		textShadow : {
			sm      : '0 1px 2px var(--tw-shadow-color)',
			DEFAULT : '0 2px 4px var(--tw-shadow-color)',
			lg      : '0 8px 16px var(--tw-shadow-color)',
		},

		borderRadius : { theme: '3rem' },
		boxShadow    : { btn: '0 0 40px 10px var(--tw-shadow-color)' },
		animation    : {
			'border'     : 'background ease-in-out infinite',
			'fill'       : 'fill 5s infinite',
			'theme-card' : 'fadeIn .5s ease-in-out',
		},
		keyframes : {
			fadeIn : {
				from : { opacity: 0 },
				to   : { opacity: 1 },
			},
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
		typography : ( { theme } ) => ( { primary : { css : {
			'--tw-prose-body'                 : theme( 'colors.primary[800]' ),
			'--tw-prose-headings'             : theme( 'colors.primary[900]' ),
			'--tw-prose-lead'                 : theme( 'colors.primary[700]' ),
			'--tw-prose-links'                : theme( 'colors.primary[900]' ),
			'--tw-prose-bold'                 : theme( 'colors.primary[900]' ),
			'--tw-prose-counters'             : theme( 'colors.primary[600]' ),
			'--tw-prose-bullets'              : theme( 'colors.primary[400]' ),
			'--tw-prose-hr'                   : theme( 'colors.primary[300]' ),
			'--tw-prose-quotes'               : theme( 'colors.primary[900]' ),
			'--tw-prose-quote-borders'        : theme( 'colors.primary[300]' ),
			'--tw-prose-captions'             : theme( 'colors.primary[700]' ),
			'--tw-prose-code'                 : theme( 'colors.primary[900]' ),
			'--tw-prose-pre-code'             : theme( 'colors.primary[100]' ),
			'--tw-prose-pre-bg'               : theme( 'colors.primary[900]' ),
			'--tw-prose-th-borders'           : theme( 'colors.primary[300]' ),
			'--tw-prose-td-borders'           : theme( 'colors.primary[200]' ),
			'--tw-prose-invert-body'          : theme( 'colors.primary[200]' ),
			'--tw-prose-invert-headings'      : theme( 'colors.white' ),
			'--tw-prose-invert-lead'          : theme( 'colors.primary[300]' ),
			'--tw-prose-invert-links'         : theme( 'colors.white' ),
			'--tw-prose-invert-bold'          : theme( 'colors.white' ),
			'--tw-prose-invert-counters'      : theme( 'colors.primary[400]' ),
			'--tw-prose-invert-bullets'       : theme( 'colors.primary[600]' ),
			'--tw-prose-invert-hr'            : theme( 'colors.primary[700]' ),
			'--tw-prose-invert-quotes'        : theme( 'colors.primary[100]' ),
			'--tw-prose-invert-quote-borders' : theme( 'colors.primary[700]' ),
			'--tw-prose-invert-captions'      : theme( 'colors.primary[400]' ),
			'--tw-prose-invert-code'          : theme( 'colors.white' ),
			'--tw-prose-invert-pre-code'      : theme( 'colors.primary[300]' ),
			'--tw-prose-invert-pre-bg'        : 'rgb(0 0 0 / 50%)',
			'--tw-prose-invert-th-borders'    : theme( 'colors.primary[600]' ),
			'--tw-prose-invert-td-borders'    : theme( 'colors.primary[700]' ),
		} } } ),
		colors : {
			/**
			 * Colors of interface.
			 *
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

