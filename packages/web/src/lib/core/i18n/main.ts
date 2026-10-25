/**
 * TYPES.
 *
 * @description File for set core types.
 */

import { derived } from 'svelte/store'
import stores    from '@sveltekit-i18n/extension-stores'
import i18n      from 'sveltekit-i18n'

import {
	defaultLocale,
	loaders,
	translations as trans,
	type i18nLangId,
} from './get'

import { dev } from '$app/env'

const i18nObj = new i18n( {
	fallbackValue  : undefined,
	fallbackLocale : defaultLocale,
	log            : { level: dev ? 'warn' : 'error' },
	translations   : trans,
	loaders,
	extensions : [ stores ],
} )

export const {
	t,
	locales,
	loading,
	addTranslations,
	loadTranslations,
	translations,
	setRoute,
	setLocale,
	locale,
} = i18nObj

export { defaultLocale }

export const currLocaleRoute = derived( locale, $locale => {

	const route = ( '/' + ( $locale || $locale !== 'undefined' ? $locale : defaultLocale ) )
	return route

} )

export const layoutFunct = async ( pathname: string ) => {

	const storeLang = locale.get()
	const match     = pathname.match( /\w+?(?=\/|$)/ )

	const lang = `${match || storeLang || defaultLocale}` as i18nLangId
	// get route without lang
	const route = pathname.replace( new RegExp( `^/${lang}` ), '' )
	// console.log( {
	// 	pathname,
	// 	route,
	// 	match,
	// 	storeLang,
	// } )
	await loadTranslations( lang, route )

	await setLocale( lang )
	await setRoute( route )

	return {
		/**
		 * Route of url without lang.
		 */
		route,
		/**
		 * Current Lang ID of url.
		 */
		lang,
	}

}

