/**
 * Lang index.
 * @description Lang index.
 */

import lang from '../../../_locales/lang.json'

export type i18nLangId = keyof typeof lang
export type i18nTranslation = { [key in i18nLangId]: { lang: typeof lang } }

export const translations: i18nTranslation = {
	ca : { lang },
	es : { lang },
	en : { lang },
}

export const loaders = [
	// en
	{
		locale : 'en',
		key    : 'common',
		loader : async () => ( await import( '../../../_locales/en/common.json' ) ).default,
	},
	// es
	{
		locale : 'es',
		key    : 'common',
		loader : async () => ( await import( '../../../_locales/es/common.json' ) ).default,
	},
	// ca
	{
		locale : 'ca',
		key    : 'common',
		loader : async () => ( await import( '../../../_locales/ca/common.json' ) ).default,
	},
]

export const defaultLocale: i18nLangId = 'en'

export { lang }
