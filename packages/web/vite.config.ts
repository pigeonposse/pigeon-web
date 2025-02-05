import { sveltekit } from '@sveltejs/kit/vite'
import process       from 'process'
import {
	defineConfig,
	type UserConfig,
} from 'vite'

import pkg from './package.json'

const port             = Number( process.env.PORT ) || 13124
const DEV_API_URL_PATH = '/api'

if ( process.env.NODE_ENV === 'development' ) process.env.PUBLIC_API_URL = 'http://localhost:' + port + DEV_API_URL_PATH
if ( !process.env.PUBLIC_API_URL ) process.env.PUBLIC_API_URL = 'https://api.pigeonposse.com'

const server: UserConfig['server'] = {
	port,
	strictPort : true,
	host       : '0.0.0.0', // important for docker image
	proxy      : { [DEV_API_URL_PATH] : {
		target       : 'http://localhost:13121',
		changeOrigin : true,
		rewrite      : path => path.replace( /^\/api/, '' ),
	} },
}

export default defineConfig( {
	// @ts-ignore
	plugins : [ sveltekit() ],
	server  : server,
	preview : server,
	define  : { PKG: pkg },
} )
