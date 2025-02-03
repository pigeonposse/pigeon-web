
import { server } from '@backan/server'

import { ENV }  from './env'
import appLocal from './local'
import app      from './standard'

import type { Env } from './env'

export type CreateLocalServerProps = Partial<Env>
export type CreateServerProps = Omit<Partial<Env>, 'API_STORE_PATH'>

export const createServer = async (
	props?: CreateServerProps,
) => {

	if ( props ) Object.entries( props ).forEach( ( [ key, value ] ) => {

		// @ts-ignore
		if ( key in ENV ) ENV[key] = value

	} )

	if ( ENV.DEBUG === 'true' ) console.log( { ENV } )

	await server( {
		app  : app(),
		port : ENV.API_PORT,
	} )

}

export const createLocalServer = async (
	props?: CreateLocalServerProps,
) => {

	if ( props ) Object.entries( props ).forEach( ( [ key, value ] ) => {

		// @ts-ignore
		if ( key in ENV ) ENV[key] = value

	} )

	if ( ENV.DEBUG === 'true' ) console.log( { ENV } )

	await server( {
		app  : appLocal(),
		port : ENV.API_PORT,
	} )

}
