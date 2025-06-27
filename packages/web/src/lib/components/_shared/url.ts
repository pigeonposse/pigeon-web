import { goto } from '$app/navigation'
import { page } from '$app/state'

const updateURLParam = ( {
	key, value, values, defaultValue,
}:{
	key?          : string
	value         : string
	values        : string[]
	defaultValue? : string
} ) => {

	if ( !value ) return

	const curr = page.url.searchParams.get( key || value )
	if ( curr === value ) return
	if ( key ) {

		page.url.searchParams.delete( key )
		if ( defaultValue !== value ) page.url.searchParams.set( key, value )

	}
	else {

		values.forEach( item => page.url.searchParams.delete( item ) )
		if ( defaultValue !== value ) page.url.searchParams.set( value, '' )

	}
	goto( page.url.toString() )

}
const getURLParam = ( {
	key, values,
}:{
	key?   : string
	values : string[]
} ) => {

	const params = page.url.searchParams
	if ( key ) {

		const tabParam = params.get( key )
		if ( tabParam && values.some( item => item === tabParam ) ) {

			return tabParam

		}

	}
	else {

		let res: string | undefined
		for ( const item of values ) {

			const tabParam = params.has( item )
			if ( tabParam ) {

				res = item
				break

			}

		}

		return res

	}

}
export const URLParams = ( {
	key, values, defaultValue,
}:{
	key?          : string
	values        : string[]
	defaultValue? : string
} ) => {

	return {
		updateTo : ( value: string ) => updateURLParam( {
			key,
			value,
			values,
			defaultValue,
		} ),
		get : () => getURLParam( {
			key,
			values,
		} ),
	}

}
