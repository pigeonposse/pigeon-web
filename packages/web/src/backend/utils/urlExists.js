/**
 * Todo.
 * @description Todo.
 * @version 1.0.0
 */

export const urlExists = async url => {

	try {

		let res

		res = await fetch( url )

		if ( res.status == 200 ) return true

		return false

	}
	catch ( error ) {

		return false

	}

}
