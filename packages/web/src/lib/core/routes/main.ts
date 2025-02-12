import {
	derived,
	get,
} from 'svelte/store'

import {
	currLocaleRoute,
	t,
} from '../i18n/main'

import { page }    from '$app/stores'
import { joinURL } from '$core/utils/main'

/**
 * TYPES
 */
const routeIds = {
	home       : 'home',
	projects   : 'projects',
	about      : 'about',
	contribute : 'contribute',
	sponsors   : 'sponsors',
	policy     : 'policy',
	contact    : 'contact',
} as const

type ObjectValues<Values> = Values[keyof Values]
export type Route = {
	id      : RouteID
	path    : string
	name    : string
	params? : { [K:string]: {
		id   : string
		path : ( v?:string ) => string
	} }
}
export type RouteID = ObjectValues<typeof routeIds>
export type Routes = { [key in RouteID] : Route }

export const isOnRoute = ( pageID: RouteID ) => {

	const $page = get( page )

	const activeUrl = $page.url.pathname.replace( '/' + $page.data.lang, '' )
	const pageRoute = pageID === 'home' ? pageID : '/' + pageID

	return activeUrl === pageRoute

}

export const currentRouteID = derived( page, $page => {

	const activeUrl = $page.url.pathname.replace( `/${$page.data.lang || ''}`, '' ).replace( /\/$/, '' )
	const pageID    = activeUrl === '' ? routeIds.home : activeUrl.replace( '/', '' )
	return pageID

} )

export const routes = derived( [ currLocaleRoute, t ], ( [ $currLocaleRoute, $t ] ) => {

	const localeRoute = $currLocaleRoute.endsWith( '/' ) ? $currLocaleRoute : $currLocaleRoute + '/'

	return {
		home : {
			id   : routeIds.home,
			path : localeRoute,
			name : $t( 'common.home.title' ) as string,
		},
		projects : {
			id     : routeIds.projects,
			path   : localeRoute + routeIds.projects,
			name   : $t( 'common.projects.title' ) as string,
			params : {
				search : {
					id   : 's' as const,
					path : ( v?:string ) => {

						const p = joinURL( '/', localeRoute, routeIds.projects, v ? ( '?s=' + v ) : '' )
						console.log( p )
						return p

					},
				},
				order : {
					id   : 'order' as const,
					path : ( v?:string ) => joinURL( localeRoute, routeIds.projects, v ? ( '?order=' + v ) : '' ),
				},
			},
		},
		about : {
			id   : routeIds.about,
			path : localeRoute + routeIds.about,
			name : $t( 'common.about.title' ) as string,
		},
		contribute : {
			id   : routeIds.contribute,
			path : localeRoute + routeIds.contribute,
			name : $t( 'common.contribute.title' ) as string,
		},
		sponsors : {
			id   : routeIds.sponsors,
			path : localeRoute + routeIds.sponsors,
			name : $t( 'common.sponsors.title' ) as string,
		},
		policy : {
			id   : routeIds.policy,
			path : localeRoute + routeIds.policy,
			name : $t( 'common.policy.title' ) as string,
		},
		contact : {
			id   : routeIds.contact,
			path : localeRoute + routeIds.contact,
			name : $t( 'common.contact.title' ) as string,
		},
	} satisfies Routes

} )
