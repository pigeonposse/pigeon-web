/**
 * SVELTE HOOKS.
 * @description TODO.
 */

import {
	redirect,
	type Handle,
} from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { get }      from 'svelte/store'

import {
	handle as handlei18n,
	handleError,
} from '$lib/core/i18n/hook'
import { routes } from '$lib/core/routes/main'

const redirections: Handle = async ( {
	event, resolve,
} ) => {

	const searchParams = new URLSearchParams( event.url.search )
	const $routes      = get( routes )

	if ( searchParams.get( 'popup' ) === 'donate' ) throw redirect( 308, $routes.contribute.path )
	else if ( searchParams.get( 'popup' ) === 'about' ) throw redirect( 308, $routes.about.path ) // 308 — for permanent redirects

	return resolve( event )

}
export const handle = sequence( redirections, handlei18n )

export { handleError }

