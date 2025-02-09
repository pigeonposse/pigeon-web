import { Collectium }             from '@collectium/core'
import { setConfig }              from '@pigeonposse/api-config-2024'
import { ENV as PIGEONPOSSE_ENV } from '@pigeonposse/api-config-2024'

import { Keys } from './keys'

type Env = { PIGEONPOSSE_API_KV: KVNamespace } & typeof PIGEONPOSSE_ENV

const addResponse = ( v: object | string, status:number = 200 ) => {

	return new Response(
		JSON.stringify( typeof v === 'string' ? { message: v } : v, null, 4 ),
		{
			headers : {
				'Content-Type'                 : 'application/json',
				'Access-Control-Allow-Origin'  : '*',
				'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS', // Options are required for use within Cloudflare pages
				'Access-Control-Allow-Headers' : 'Content-Type, Authorization',
			},
			status,
		},
	)

}

const KEYS     = {
	2023 : 'GH',
	2024 : 'GH_2024',
	2025 : 'GH_2025',
} as const
const MAIN_KEY = KEYS[2024]

export default {
	async scheduled( controller: ScheduledController, env: Env, _ctx: ExecutionContext ) {

		try {

			Object.keys( PIGEONPOSSE_ENV ).forEach( k => {

				const key = k as keyof typeof PIGEONPOSSE_ENV
				if ( key in env && typeof env[key] === 'string' ) {

					// @ts-ignore
					PIGEONPOSSE_ENV[key] = env[key]

				}

			} )

			console.log( {
				env,
				PIGEONPOSSE_ENV : {
					...PIGEONPOSSE_ENV,
					GH_TOKEN : PIGEONPOSSE_ENV.GH_TOKEN ? '***' : undefined,
				},
			} )

			if ( !env.PIGEONPOSSE_API_KV || !env.GH_TOKEN ) throw Error( 'Variable PIGEONPOSSE_API_KV or GH_TOKEN not set' )

			if ( controller.cron === '*/10 * * * *' ) {

				const keys = new Keys( env.PIGEONPOSSE_API_KV )
				const conf = setConfig( PIGEONPOSSE_ENV )

				if ( conf.github ) conf.github[Object.keys( conf.github )[0]].requestHeaders = {
					'X-Source'             : 'Cloudflare-Workers',
					'X-GitHub-Api-Version' : '2022-11-28',
				}

				const gh = new Collectium( conf )

				const data = await gh.get()

				if ( !(
					data
					&& Object.values( data ).length
					&& data.github?.data
					&& Object.values( data.github.data )[0].repo
				) ) throw Error( 'Error getting data from GH function' )

				await keys.update( MAIN_KEY, JSON.stringify( data ) )
				console.log( `Key [${MAIN_KEY}] updated successfully!` )

			}

		}
		catch ( e ) {

			console.error( {
				id   : 'server-scheduled',
				data : e instanceof Error
					? {
						...e,
						message : e.message,
						stack   : e.stack?.split( '\n' ),
						request : 'request' in e ? e.request : undefined,
						cause   : 'cause' in e ? e.cause : undefined,
					}
					: e,
			} )

			// return addResponse( {
			// 	id   : 'server-scheduled',
			// 	data : 'Error in server. Please wait until the problem is solved.',
			// }, 500 )

		}

	},
	async fetch( request: Request, env: Env, _ctx: ExecutionContext ): Promise<Response> {

		if ( ![ 'GET', 'OPTIONS' ].includes( request.method.toUpperCase() ) ) throw Error( 'Request method not allowed' )
		if ( !env.PIGEONPOSSE_API_KV || !env.GH_TOKEN ) throw Error( 'Variable PIGEONPOSSE_API_KV or GH_TOKEN not set' )

		const url     = new URL( request.url )
		const getData = async ( k:string ) => {

			const keys = new Keys( env.PIGEONPOSSE_API_KV )
			const data = await keys.get( k )

			if ( data && Object.values( data ).length )
				return addResponse( data, 200 )
			else return addResponse( 'Error getting data', 400 )

		}

		if ( url.pathname === '/all' ) return getData( MAIN_KEY )
		else if ( url.pathname === '/2023' ) return getData( KEYS[2023] )
		else if ( url.pathname === '/2024' ) return getData( KEYS[2024] )
		else if ( url.pathname === '/2025' ) return getData( KEYS[2025] )
		else return addResponse( 'Page does not exists. Visit "/all" for get All api data', 404 )

	},
}
