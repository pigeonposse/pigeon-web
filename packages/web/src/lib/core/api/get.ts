import { createClient } from '@pigeonposse/api-client-2025'

import { env } from '$env/dynamic/public'

export const fetchData = async ( fetch: typeof window.fetch ) => {

	try {

		const client = createClient( {
			baseUrl : env.PUBLIC_API_URL,
			headers : { 'Content-Type': 'application/json' },
			fetch,
		} )

		const res = await client.GET( '/all' )

		if ( res.error ) throw new Error( res.error.message )
		else {

			if ( !res.data.github?.data ) throw new Error( 'Github data does not exists' )
			const key = Object.keys( res.data.github.data )[0]
			if ( !key ) throw new Error( `Github KEY ${key} data does not exists` )
			const data = res.data.github?.data[key]
			if ( !data.repo || !data.user ) throw new Error( `USER or REPO data does not exists` )
			return data as Required<typeof data>

		}

	}
	catch ( e ) {

		console.warn( 'Error getting api data', e )
		return undefined

	}

}

