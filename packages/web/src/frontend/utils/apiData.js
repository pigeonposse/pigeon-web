/**
 * Todo.
 * @description Todo.
 * @version 1.0.0
 */

export const apiData = async ( version = 'v1' ) => {

	try {

		let res

		res = window.location.origin + '/api/' + version
		res = await fetch( res )

		if ( res.status === 200 ) return res.json()

		return false

	}
	catch ( error ) {

		return false

	}

}

