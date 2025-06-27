// import { Collectium }             from '@collectium/core'
// import { setConfig }              from '@pigeonposse/api-config-2025'
import { ENV as PIGEONPOSSE_ENV } from '@pigeonposse/api-config-2025'

import {
	KEYS,
	MAIN_KEY,
} from './const'
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

export default { async fetch( request: Request, env: Env, _ctx: ExecutionContext ): Promise<Response> {

	if ( ![ 'GET', 'OPTIONS' ].includes( request.method.toUpperCase() ) ) throw Error( 'Request method not allowed' )
	if ( !env.PIGEONPOSSE_API_KV || !env.GH_TOKEN ) throw Error( 'Variable PIGEONPOSSE_API_KV or GH_TOKEN not set' )

	const url     = new URL( request.url )
	const getData = async ( k:string ) => {

		const keys = new Keys( env.PIGEONPOSSE_API_KV )
		const data = await keys.get( k )

		if ( data && Object.values( data ).length ) return addResponse( data, 200 )
		else return addResponse( 'Error getting data', 400 )

	}

	if ( url.pathname === '/all' ) return getData( MAIN_KEY )
	else if ( url.pathname === '/2023' ) return getData( KEYS[2023] )
	else if ( url.pathname === '/2024' ) return getData( KEYS[2024] )
	else if ( url.pathname === '/2025' ) return getData( KEYS[2025] )
	else return addResponse( 'Page does not exists. Visit "/all" for get All api data', 404 )

} }
