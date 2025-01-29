import { error } from '@sveltejs/kit'

import { Api }       from '$lib/core/api/main'
import * as i18n     from '$lib/core/i18n/main'
import { routes }    from '$lib/core/routes/main'
import { appWindow } from '$lib/core/window/main'

// eslint-disable-next-line jsdoc/require-jsdoc
export async function load( event ) {

	const { url }      = event
	const { pathname } = url
	const {
		route, lang,
	} =  await i18n.layoutFunct( pathname )

	const res = {
		routes,
		route,
		lang,
		t               : i18n.t,
		currLocaleRoute : i18n.currLocaleRoute,
		locale          : i18n.locale,
		locales         : i18n.locales,
	}

	const api = new Api()
	await api.init()

	if ( !api.data ) throw error( 500, {
		id      : 'error-data',
		message : 'error-data',
		data    : res,
	} )

	if ( !api.data.user ) throw error( 500, {
		id      : 'error-org',
		message : 'Organization data is missing from API response',
		data    : res,
	} )

	return {
		...res,
		api,
		apiData : api.data,
		appWindow,
		appName : 'name' in api.data.user && typeof api.data.user.name === 'string' ? api.data.user.name : 'PigeonPosse',
	}

}

// export const prerender = true // must be true for i18n
export const ssr = false
