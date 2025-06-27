import { Collectium } from '@collectium/core'
import {
	getObjectFromTOMLFile,
	getCurrentDir,
	joinPath,
} from '@dovenv/core/utils'
import { setConfig } from '@pigeonposse/api-config-2025'
import process       from 'node:process'

import { MAIN_KEY } from './const'

const getConfig = async ( configEnv: Parameters<typeof setConfig>[0] ) => {

	const conf = setConfig( {
		...configEnv,
		DEBUG : 'false',
	} )

	if ( conf.github ) conf.github[Object.keys( conf.github )[0]].requestHeaders = {
		'X-Source'             : 'Cloudflare-Workers',
		'X-GitHub-Api-Version' : '2022-11-28',
	}

	const gh = new Collectium( conf )

	const data = await gh.get()

	console.log( data )

	if ( !(
		data
		&& Object.values( data ).length
		&& data.github?.data
		&& Object.values( data.github.data )[0].repo
	) ) throw Error( 'Error getting data from GH function. GH_TOKEN maybe invalid' )

	return data

}
const updateKV = async ( {
	accountId,
	namespaceId,
	apiToken,
	key,
	value,
}: {
	accountId   : string
	namespaceId : string
	apiToken    : string
	key         : string
	value       : string
} ) => {

	const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${encodeURIComponent(
		key,
	)}`

	const res = await fetch( url, {
		method  : 'PUT',
		headers : {
			'Authorization' : `Bearer ${apiToken}`,
			'Content-Type'  : 'application/json',
		},
		body : value,
	} )

	const result = await res.json()
	if ( !res.ok ) {

		// @ts-ignore
		throw new Error( result?.errors?.[0]?.message || 'Unknown error' )

	}

	console.log( `✅ Key "${key}" updated successfully` )

}

const run = async () => {

	try {

		const data = await getObjectFromTOMLFile<{
			vars          : Parameters<typeof setConfig>[0]
			kv_namespaces : { id: string }[]
		}>( joinPath( getCurrentDir( import.meta.url ), '../wrangler.toml' ) )

		const configEnv     = data.vars
		const namespaceId   = data.kv_namespaces[0].id
		const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID
		const CF_API_TOKEN  = process.env.CF_API_TOKEN
		const GH_TOKEN      = process.env.GH_TOKEN

		if ( !CF_ACCOUNT_ID || !CF_API_TOKEN || !GH_TOKEN ) throw Error( 'Variable CF_ACCOUNT_ID, CF_API_TOKEN, GH_TOKEN not set' )

		const values = await getConfig( {
			...configEnv,
			GH_TOKEN,
		} )

		await updateKV( {
			accountId   : CF_ACCOUNT_ID,
			namespaceId : namespaceId,
			apiToken    : CF_API_TOKEN,
			key         : MAIN_KEY,
			value       : JSON.stringify( values ),
		} )

	}
	catch ( e ) {

		console.error( '❌ Error updating keys:', e instanceof Error ? e.message : e )

		process.exit( 1 )

	}

}

run()
