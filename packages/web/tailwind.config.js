// @ts-nocheck

import typographyPlugin from '@tailwindcss/typography'
import plugin           from 'tailwindcss/plugin'

export const primaryColor = {
	50  : '#ecfdf5',
	100 : '#d1fae5',
	200 : '#a7f3d0',
	300 : '#6ee7b7',
	400 : '#34d399',
	500 : '#10b981',
	600 : '#059669',
	700 : '#047857',
	800 : '#065f46',
	900 : '#064e3b',
	950 : '#022c22',
}

/** @type {import('tailwindcss').Config} */
export default {
	content : [ './src/**/*.{html,js,svelte,ts}' ],
	plugins : [
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
	theme    : {
		extend : {
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
					'50%' : { fill: '#10b981' },
					'75%' : { fill: '#a855f7' },
				},
			},
			typography : ( { theme } ) => ( {
				primary : {
					css : {
						'--tw-prose-body'                 : theme( 'colors.gray.300' ),
						'--tw-prose-headings'             : theme( 'colors.gray.100' ),
						'--tw-prose-lead'                 : theme( 'colors.gray.400' ),
						'--tw-prose-links'                : theme( 'colors.primary.500' ),
						'--tw-prose-bold'                 : theme( 'colors.gray.100' ),
						'--tw-prose-counters'             : theme( 'colors.primary.600' ),
						'--tw-prose-bullets'              : theme( 'colors.primary.400' ),
						'--tw-prose-hr'                   : theme( 'colors.primary.900/30' ),
						'--tw-prose-quotes'               : theme( 'colors.gray.100' ),
						'--tw-prose-quote-borders'        : theme( 'colors.primary.900/30' ),
						'--tw-prose-captions'             : theme( 'colors.primary.600' ),
						'--tw-prose-code'                 : theme( 'colors.gray.100' ),
						'--tw-prose-pre-code'             : theme( 'colors.gray.100' ),
						'--tw-prose-pre-bg'               : theme( 'colors.black' ),
						'--tw-prose-th-borders'           : theme( 'colors.primary.900/30' ),
						'--tw-prose-td-borders'           : theme( 'colors.primary.900/20' ),
						'--tw-prose-invert-body'          : theme( 'colors.gray.300' ),
						'--tw-prose-invert-headings'      : theme( 'colors.white' ),
						'--tw-prose-invert-lead'          : theme( 'colors.primary.300' ),
						'--tw-prose-invert-links'         : theme( 'colors.white' ),
						'--tw-prose-invert-bold'          : theme( 'colors.white' ),
						'--tw-prose-invert-counters'      : theme( 'colors.primary.400' ),
						'--tw-prose-invert-bullets'       : theme( 'colors.primary.600' ),
						'--tw-prose-invert-hr'            : theme( 'colors.primary.900/30' ),
						'--tw-prose-invert-quotes'        : theme( 'colors.primary.100' ),
						'--tw-prose-invert-quote-borders' : theme( 'colors.primary.900/30' ),
						'--tw-prose-invert-captions'      : theme( 'colors.primary.400' ),
						'--tw-prose-invert-code'          : theme( 'colors.white' ),
						'--tw-prose-invert-pre-code'      : theme( 'colors.primary.300' ),
						'--tw-prose-invert-pre-bg'        : 'rgb(0 0 0 / 50%)',
						'--tw-prose-invert-th-borders'    : theme( 'colors.primary.600' ),
						'--tw-prose-invert-td-borders'    : theme( 'colors.primary.700' ),
					},
				},
			} ),
			colors : {
			/**
			 * Colors of interface.
			 * Ultra dark modern mode with subtle pigeon iridescent (green to violet).
			 */
				secondary : {
					50  : '#faf5ff',
					100 : '#f3e8ff',
					200 : '#e9d5ff',
					300 : '#d8b4fe',
					400 : '#c084fc',
					500 : '#a855f7',
					600 : '#9333ea',
					700 : '#7e22ce',
					800 : '#6b21a8',
					900 : '#581c87',
					950 : '#3b0764',
				},
				primary : primaryColor,
				/**
				 * Pigeon iridescent brand accents.
				 * Used for subtle green -> cyan -> violet details.
				 */
				pigeon  : {
					green   : '#10b981',
					emerald : '#34d399',
					cyan    : '#22d3ee',
					violet  : '#a855f7',
					purple  : '#9333ea',
					ink     : '#05070a',
				},
				gray : {
					50  : '#f8fafc',
					100 : '#f1f5f9',
					200 : '#e2e8f0',
					300 : '#cbd5e1',
					400 : '#94a3b8',
					500 : '#64748b',
					600 : '#475569',
					700 : '#334155',
					800 : '#1e293b',
					900 : '#0f172a',
					950 : '#020617',
				},
				dark : {
					50  : '#0a0a0f',
					100 : '#0a0a0f',
					200 : '#0a0a0f',
					300 : '#0a0a0f',
					400 : '#0a0a0f',
					500 : '#050507',
					600 : '#050507',
					700 : '#050507',
					800 : '#000000',
					900 : '#000000',
					950 : '#000000',
				},
				surface : {
					50  : 'rgba(10, 10, 15, 0.8)',
					100 : 'rgba(10, 10, 15, 0.6)',
					200 : 'rgba(10, 10, 15, 0.4)',
					300 : 'rgba(10, 10, 15, 0.3)',
					400 : 'rgba(10, 10, 15, 0.2)',
					500 : 'rgba(5, 5, 7, 0.9)',
					600 : 'rgba(5, 5, 7, 0.7)',
					700 : 'rgba(5, 5, 7, 0.5)',
					800 : 'rgba(5, 5, 7, 0.3)',
					900 : 'rgba(5, 5, 7, 0.15)',
					950 : 'rgba(5, 5, 7, 0.05)',
				},
			},
		},
	},
}
