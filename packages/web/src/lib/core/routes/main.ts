import {
	derived,
	get,
} from 'svelte/store'

import { routesID } from './const'
import {
	currLocaleRoute,
	t,
} from '../i18n/main'

import type {
	RouteID,
	Routes,
} from './types'

import { page }    from '$app/stores'
import { joinURL } from '$core/utils/main'

export const isOnRoute = ( pageID: RouteID ) => {

	const $page = get( page )

	const activeUrl = $page.url.pathname.replace( '/' + $page.data.lang, '' )
	const pageRoute = pageID === 'home' ? pageID : '/' + pageID

	return activeUrl === pageRoute

}

export const currentRouteID = derived( page, $page => {

	const activeUrl = $page.url.pathname.replace( `/${$page.data.lang || ''}`, '' ).replace( /\/$/, '' )
	const pageID    = activeUrl === '' ? 'home' : activeUrl.replace( '/', '' )
	return pageID

} )

export const routes = derived( [ currLocaleRoute, t ], ( [ $currLocaleRoute, $t ] ) => {

	const localeRoute = $currLocaleRoute.endsWith( '/' ) ? $currLocaleRoute : $currLocaleRoute + '/'
	const res         = Object.fromEntries( Object.entries( routesID ).map( ( [ key, value ] ) => {

		const path = key === 'home' ? localeRoute : joinURL( localeRoute, key )
		return [
			key,
			{
				id     : key,
				path   : path,
				child  : ( v:string ) => joinURL( '/', path, v ),
				name   : $t( `common.${key}.title` ) as string,
				params : 'params' in value
					? Object.fromEntries( Object.entries( value.params ).map( ( [ k, v ] ) => ( [
						k,
						{
							id   : v,
							path : ( value?:string ) =>
								joinURL( '/', path, value ? ( `?${v}=` + value ) : `?${v}` ),
						},
					] ) ) )
					: undefined,
			},
		]

	} ) )
	return res as Routes

} )
