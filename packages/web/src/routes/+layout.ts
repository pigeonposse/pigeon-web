import type { ApiData } from '$lib/core/api/types'

import { Api }       from '$lib/core/api/main'
import * as i18n     from '$lib/core/i18n/main'
import { routes }    from '$lib/core/routes/main'
import { appWindow } from '$lib/core/window/main'

export async function load( event ) {

	const { url }      = event
	const { pathname } = url
	const {
		route,
		lang,
	} =  await i18n.layoutFunct( pathname )

	const res = {
		routes,
		route,
		lang,
		t               : i18n.t,
		currLocaleRoute : i18n.currLocaleRoute,
		locale          : i18n.locale,
		locales         : i18n.locales,
		appWindow,
		error           : undefined as string | undefined,
	}

	const api = new Api()
	await api.init()

	if ( !api.data ) res.error = 'Error getting API data'
	else if ( !api.data?.user ) res.error = 'Organization data is missing from API response'

	return {
		...res,
		api,
		apiData : api.data as ApiData, // force data type for use in page
		appName : typeof api.data?.user?.name === 'string' ? api.data.user.name : 'PigeonPosse',
	}

}

// export const prerender = true // must be true for i18n
export const ssr = false
