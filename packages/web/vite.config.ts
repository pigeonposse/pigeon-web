import { sveltekit }    from '@sveltejs/kit/vite'
import { internalIpV4 } from 'internal-ip'
import process          from 'process'
import {
	defineConfig,
	type UserConfig,
} from 'vite'

import pkg from './package.json'

const mobile = process.env.TAURI_ENV_PLATFORM  ? !!/android|ios/.exec( process.env.TAURI_ENV_PLATFORM ) : false
const host   = await internalIpV4()
const port   = 13124

if ( !process.env.PUBLIC_API_URL ) process.env.PUBLIC_API_URL = 'https://api.pigeonposse.com/v1'

const server: UserConfig['server'] = {
	port,
	strictPort : true,
	host       : '0.0.0.0', // important for docker image
	hmr        : mobile
		? {
			protocol : 'ws',
			host,
			port,
		}
		: undefined,
	proxy : { '/api' : {
		target       : process.env.PUBLIC_API_URL,
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
