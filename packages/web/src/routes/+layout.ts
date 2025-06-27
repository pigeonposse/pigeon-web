import { Api }    from '$lib/core/api/main.svelte'
import * as i18n  from '$lib/core/i18n/main'
import { routes } from '$lib/core/routes/main'

export const load = async ( {
	url, fetch,
} ) => {

	const { pathname } = url

	const {
		route,
		lang,
	} = await i18n.layoutFunct( pathname )

	const res = {
		routes,
		route,
		lang,
		t               : i18n.t,
		currLocaleRoute : i18n.currLocaleRoute,
		locale          : i18n.locale,
		locales         : i18n.locales,
	}

	const api = new Api( fetch )
	await api.get()

	return {
		...res,
		api,
		apiData  : api.data,
		apiRepos : api.repos,
		apiUser  : api.user,
		appName  : api.name,
	}

}

export const ssr = false
