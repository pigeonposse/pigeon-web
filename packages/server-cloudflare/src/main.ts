import { Collectium }                     from '@collectium/core'
import config, { ENV as PIGEONPOSSE_ENV } from '@pigeonposse/config'

import { Keys } from './keys'

type Env = { PIGEONPOSSE_API_KV: KVNamespace } & typeof PIGEONPOSSE_ENV

const addResponse = ( v: object | string, status:number = 200 ) => {

	return new Response(
		JSON.stringify( {
			type : status !== 200 ? 'error' : 'success',
			data : v,
		}, null, 4 ),
		{
			headers : { 'Content-Type': 'application/json' },
			status,
		},
	)

}

export default {
	async scheduled( controller: ScheduledController, env: Env, _ctx: ExecutionContext ) {

		try {

			Object.keys( PIGEONPOSSE_ENV ).forEach( k => {

				const key = k as keyof typeof PIGEONPOSSE_ENV
				if ( key in env && typeof env[key] === 'string' ) {

					// @ts-ignore
					PIGEONPOSSE_ENV[key] =  env[key]

				}

			} )

			if ( !env.PIGEONPOSSE_API_KV || !env.GH_TOKEN ) throw Error( 'Variable not set' )

			if ( controller.cron === '*/10 * * * *' ) {

				const keys = new Keys( env.PIGEONPOSSE_API_KV )
				const gh   = new Collectium( config )

				const data = await gh.get()

				if ( data ) await keys.update( 'GH', JSON.stringify( data ) )

			}

		}
		catch ( e ) {

			console.error( {
				id   : 'server-scheduled',
				data : e,
			} )

			return addResponse( {
				id   : 'server-scheduled',
				data : 'Error in server. Please wait until the problem is solved.',
			}, 500 )

		}

	},
	async fetch( request: Request, env: Env, _ctx: ExecutionContext ): Promise<Response> {

		if ( request.method.toUpperCase() !== 'GET' )  throw Error( 'Request method not allowd' )
		const url = new URL( request.url )

		if ( !env.PIGEONPOSSE_API_KV || !env.GH_TOKEN ) throw Error( 'Variable not set' )
		if ( url.pathname === '/all' ) {

			const keys = new Keys( env.PIGEONPOSSE_API_KV )
			const data = await keys.get( 'GH' )
			return new Response( JSON.stringify( data || {} ), { headers: { 'content-type': 'application/json' } } )

		}
		return new Response( 'Not Found', { status: 404 } )

	},
}
