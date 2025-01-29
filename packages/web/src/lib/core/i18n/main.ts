/**
 * TYPES.
 *
 * @description File for set core types.
 */

import {
	derived, get, 
} from 'svelte/store'
import { dev }            from '$app/environment'
import i18n               from 'sveltekit-i18n'
import localeTranslations from './get'

import type { Config, Parser } from 'sveltekit-i18n';

const config: Config = {
	log : {
		level : dev ? 'warn' : 'error', 
	},
	translations : localeTranslations,
}

const i18nObj = new i18n<Parser.Params<{param?: number}>>( config )

export const { 
	t, 
	locale, 
	locales, 
	loading, 
	addTranslations, 
	loadTranslations,
	translations, 
	setRoute, 
	setLocale,
} = i18nObj

export const defaultLocale = 'en'

export const currLocaleRoute = derived( locale, $locale => {

	return $locale === defaultLocale ? '/' : '/' + $locale

} )

export const layoutFunct = async ( pathname: string ) =>{

	const storeLang = get( locale )
	const lang      = `${pathname.match( /\w+?(?=\/|$)/ ) || storeLang || defaultLocale}`
	const route     = pathname.replace( new RegExp( `^/${lang}` ), '' )

	await loadTranslations( lang, route )

	const trans = translations.get()
	
	await setLocale( lang )
	await setRoute( route )

	addTranslations( trans )

	return {
		route,
		lang,
	}

}

// Translations logs
loading.subscribe( async $loading => {

	if ( $loading ) {

		// console.log( 'Loading translations...' )
		await loading.toPromise()
		// console.log( 'Updated translations', translations.get() )
	
	}

} )
