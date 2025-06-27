/**
 * SVELTE HOOKS.
 *
 * @description TODO.
 */

import {
	redirect,
	type Handle,
} from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

import {
	handle as handlei18n,
	handleError,
} from '$lib/core/i18n/hook'

const redirections: Handle = async ( {
	event, resolve,
} ) => {

	const searchParams = new URLSearchParams( event.url.search )

	// ?popup=donate || ?popup=about
	if ( searchParams.get( 'popup' ) === 'donate' ) throw redirect( 308, '/contribute' )
	else if ( searchParams.get( 'popup' ) === 'about' ) throw redirect( 308, '/about' ) // 308 — for permanent redirects

	return resolve( event )

}
export const handle = sequence( redirections, handlei18n )

export { handleError }

