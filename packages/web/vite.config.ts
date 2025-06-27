/* eslint-disable camelcase */
import pwa                               from '@svaio/pwa'
import { setDefaultConfig as pwaConfig } from '@svaio/pwa/utils'
import sitemap                           from '@svaio/sitemap'
import { sveltekit }                     from '@sveltejs/kit/vite'
import process                           from 'node:process'
import {
	defineConfig,
	type UserConfig,
} from 'vite'

import pkg              from './package.json'
import { primaryColor } from './tailwind.config'
import pkgMain          from '../../package.json'

const port             = Number( process.env.PORT ) || 13124
const DEV_API_URL_PATH = '/api'
// const buildDir         = 'dist/web'
const i18n = {
	defaultLanguage : 'en',
	languages       : [
		'en',
		'es',
		'ca',
	],
}
// if ( process.env.NODE_ENV === 'development' ) process.env.PUBLIC_API_URL = 'http://localhost:' + port + DEV_API_URL_PATH
if ( !process.env.PUBLIC_API_URL ) process.env.PUBLIC_API_URL = 'https://api.pigeonposse.com'
if ( process.env.NODE_ENV === 'development' ) console.log( 'Is development MODE' )

console.log( `PUBLIC_API_URL=${process.env.PUBLIC_API_URL}` )

const server: UserConfig['server'] = {
	port,
	strictPort : true,
	host       : '0.0.0.0', // important for docker image
	proxy      : { [DEV_API_URL_PATH] : {
		target       : process.env.PUBLIC_API_URL,
		changeOrigin : true,
		rewrite      : path => path.replace( new RegExp( `^${DEV_API_URL_PATH}` ), '' ),
	} },
}

if ( process.env.PROXY === 'true' ) process.env.PUBLIC_API_URL = DEV_API_URL_PATH

export default defineConfig( {
	plugins : [
		sveltekit( ),
		pwa( pwaConfig( {
			name : pkgMain.extra.productName,

			description : 'Official PigeonPosse web',
			manifest    : {
				theme_color      : primaryColor['500'],
				background_color : primaryColor['950'],
				lang             : i18n.defaultLanguage,

			},
		} ) ),
		sitemap( {
			hostname      : pkgMain.homepage,
			// outDir   : buildDir,
			dynamicRoutes : [
				'sponsors',
				'projects',
				'contribute',
				'about',
				'policy',
			],
			robots : [
				{
					userAgent : '*',
					allow     : '/',
				},
			],
			i18n,
		} ),
	],
	server  : server,
	preview : server,
	define  : { PKG: pkg },
} )
