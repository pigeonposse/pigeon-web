/**
 * Todo.
 * @description Todo.
 * @version 1.0.0
 */

export const location = ( ) => {

	let res
	res = window.location
	res = res.toString()
	res = res.replace( '?popup=about', '' ).replace( '&popup=about', '' )
	return res

}

