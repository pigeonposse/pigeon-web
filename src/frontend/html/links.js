/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

const social = ( data ) => {

	let res = ''

	Object.keys( data.social ).forEach( k => {

		if ( data.social[k] && data.social[k].url && data.social[k].name ) {

			res += `<a href="${data.social[k].url}" target="_blank">${data.social[k].name}</a>`
			
		}
		
	} )

	return res
	
}

const funding = ( data ) => {

	let res = ''

	Object.keys( data.funding ).forEach( k => {

		if ( ( k == 'kofi' || k == 'github' ) && data.funding[k].url && data.funding[k].name ) {

			res += `<a href="${data.funding[k].url}" target="_blank">${data.funding[k].name}</a>`
			
		}
		
	} )

	Object.keys( data.social ).forEach( k => {

		if ( ( k == 'email' ) && data.social[k].url && data.social[k].name ) {

			res += `<a href="${data.social[k].url}" target="_blank">${data.social[k].name}</a>`
			
		}
		
	} )

	return res

}

export const links = {
	social,
	funding,
}

