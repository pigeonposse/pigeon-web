
import { cwd }          from 'node:process'
import process          from 'process'
import { createServer } from 'vite'

import {
	copyDir,
	getDirFromUrl,
	overridePaths,
	writeFile,
	join,
} from './_utils'

export class Core {

	opts
	root
	webRoot

	constructor( opts?: {
		apiUrl? : string
		port?   : number
		config? : string
		debug?  : boolean
		output? : string
		assets? : string
	} ) {

		this.opts = {
			apiUrl : opts?.apiUrl || 'https://ai.pigeonposse.com',
			port   : opts?.port || 1312,
			output : opts?.output || join( cwd(), 'build', 'web' ),
			debug  : opts?.debug || false,
			config : opts?.config ?  join( cwd(), opts.config ) : undefined,
			assets : opts?.assets || join( cwd(), 'assets' ),
		}

		if ( !this.opts.debug ) console.debug = () => {}

		process.env.PUBLIC_API_URL = this.opts.apiUrl
		process.env.PORT           = String( this.opts.port )

		this.root    = join( getDirFromUrl(  import.meta.url ), '..', '..' )
		this.webRoot = join( this.root, 'dist', 'web' )

		console.debug( 'Core options:', {
			...this.opts,
			root    : this.root,
			webRoot : this.webRoot,
		} )

	}

	async #addWeb() {

		await copyDir( this.webRoot, this.opts.output )

	}

	async #addAssets() {

		if ( !this.opts.assets ) return
		await overridePaths( this.opts.assets, this.opts.output )

	}

	async #getConfig() {

		if ( !this.opts.config ) return
		const c = ( await import( this.opts.config ) ).default
		return c

	}

	async #changeEnv( dev: boolean = false ) {

		const config  = await this.#getConfig()
		const content = config
			? `export const env={"PUBLIC_API_URL":"${dev ? '/api' : this.opts.apiUrl}", "PUBLIC_CONFIG":${JSON.stringify( JSON.stringify( config ) )}}`
			: `export const env={"PUBLIC_API_URL":"${dev ? '/api' : this.opts.apiUrl}"}`
		const path    = join( this.opts.output, '_app', 'env.js' )

		await writeFile( path, content )

	}

	async #createServer() {

		const server = await createServer( {
			configFile : false,
			root       : this.opts.output,
			server     : {
				port  : this.opts.port,
				host  : '0.0.0.0', // important for docker image
				proxy : { '/api' : {
					target       : this.opts.apiUrl,
					changeOrigin : false,
					rewrite      : path => path.replace( /^\/api/, '' ),
				} },
			},
			mode : process.env.NODE_ENV,
		} )

		console.debug( server.config.server )

		await server.listen()
		server.printUrls()
		server.bindCLIShortcuts( { print: true } )

	}

	async build( dev: boolean = false ) {

		await this.#addWeb()
		await this.#addAssets()
		await this.#changeEnv( dev )

	}

	async dev() {

		process.env.NODE_ENV = 'development'
		await this.build( true )
		await this.#createServer()

	}

	async prod() {

		process.env.NODE_ENV = 'production'
		await this.#createServer()

	}

	async serve() {

		await this.build( true )
		await this.prod()

	}

}
