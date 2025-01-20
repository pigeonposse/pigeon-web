/**
 * URL FILE CONTAINS FUNCTIONALITY FOR LIKS.
 *
 * - changeURL
 * - parameter
 * - request
 * - fetch.
 */

/**
 * CHANGE URL .
 *
 * Function to set/update/refresh actual link.
 *
 * Since    1.0.0
 * version  1.0.0.
 */

/**
 *
 * @param url
 * @param update
 * @param refresh
 * @param history
 */
function changeURL(
	url,
	update = true,
	refresh = true,
	history = true,
) {

	// RETURN URL
	if ( update == true ) {

		if ( refresh == true ) {

			window.location.href = url

		}
		else {

			if ( history == false ) {

				window.history.replaceState( { }, '', url )

			}
			else {

				window.history.pushState( { page: 1 }, '', url )

			}

		}

	}
	else {

		return url

	}

}

/**
 * URL PARAMETER.
 *
 * Function to change url by adding/changing one or more parameters.
 *
 * Since    1.0.0
 * version  1.0.0.
 * @param url
 * @param param
 * @param paramVal
 * @param update
 * @param refresh
 * @param history
 */
export function urlParameter(
	url,
	param = '',
	paramVal = '',
	update = true,
	refresh = true,
	history = true,
) {

	var finalURL

	if ( param != '' ) {

		var TheAnchor = null,
			newAdditionalURL = '',
			tempArray        = url.split( '?' ), // Split the url into two parts separated by '?' if contains '?'
			baseURL       = tempArray[0], // Take base url
			additionalURL = tempArray[1], // Get the second part of url
			temp          = '',
			tmpAnchor, TheParams, rowsTXT

		// If exist url with '?'
		if ( additionalURL ) {

			tmpAnchor = additionalURL.split( '#' ) // Split the url into two parts separated by '#'
			TheParams = tmpAnchor[0] // Take parameters without the anchor
			TheAnchor = tmpAnchor[1] // Take only the anchor value

			// If exist url with '#', variable 'additionalURL' remove 'anchor'
			if ( TheAnchor ) {

				additionalURL = TheParams

			}

			tempArray = additionalURL.split( '&' ) // Split the url into various parts separated by '&'

			// For each '&' paameters
			for ( var i = 0; i < tempArray.length; i++ ) {

				// if parameter is not equal to the param of the functon, add to 'newAdditionalURL' variable with '&'
				if ( tempArray[i].split( '=' )[0] != param ) {

					newAdditionalURL += temp + tempArray[i]
					temp              = '&'

				}

			}

		}
		else {

			tmpAnchor = baseURL.split( '#' ) // Split the url into two parts separated by '#'
			TheParams = tmpAnchor[0] // Take base url without the anchor
			TheAnchor = tmpAnchor[1] // Take only the anchor value

			// If exist url with '#', variable 'baseURL' remove 'anchor'
			if ( TheParams ) {

				baseURL = TheParams

			}

		}

		// If exist url with '#' add anchor in the final of parameters
		if ( TheAnchor ) {

			paramVal += '#' + TheAnchor

		}

		// Add url with all parameters and the new parameter with his value
		rowsTXT = temp + '' + param + '=' + paramVal

		if ( paramVal == '' ) {

			newAdditionalURL = ( newAdditionalURL != '' ) ? '?' + newAdditionalURL : ''
			finalURL         = baseURL + newAdditionalURL

		}
		else {

			finalURL = baseURL + '?' + newAdditionalURL + rowsTXT

		}

	}
	else {

		finalURL = url

	}

	// RETURN URL
	changeURL( finalURL, update, refresh, history )

}

/**
 * XHR REQUEST .
 *
 * A simple url request.
 *
 * Since    1.0.0
 * version  1.0.0.
 */

/**
 *
 * @param root0
 * @param root0.url
 * @param root0.method
 * @param root0.headers
 * @param root0.done
 * @param root0.error
 * @param root0.async
 */
export function request( {
	url,
	method = 'GET',
	headers = { 'Content-Type': 'application/json' },
	done = doneDefault,
	error = errorDefault,
	async = true,
} ) {

	const request = new XMLHttpRequest()

	var response, send

	request.onload = () => {

		if ( headers['Content-Type'] == 'application/json' ) {

			response = request.response
			send     = ''

		}
		else {

			response = request.responseText
			send     = null

		}

		if ( request.status >= 200 && request.status < 300 ) {

			if ( request.status ) {

				done( response, url )

			}
			else {

				error( request.status, url )

			}

		}

	}

	request.open( method, url, async )

	Object.keys( headers ).forEach( key => {

		request.setRequestHeader( key, headers[key] )

	} )

	request.send( send )

}

/**
 *
 * @param root0
 * @param root0.url
 * @param root0.method
 * @param root0.headers
 * @param root0.done
 * @param root0.error
 */
export function fetch( {
	url = '',
	method = 'GET',
	headers = { 'Content-Type': 'application/json' },
	done = doneDefault,
	error = errorDefault,
} ) {

	/**
	 *
	 */
	async function call() {

		try {

			const req = await fetch( url, {
				method  : method,
				headers : headers,
			} )

			const res = await req.json()

			done( res, url )

		}
		catch ( e ) {

			error( e, url )

		}

	}
	call()

}

/**
 * DEFAULT REQUEST ( done ).
 * @param response
 * @param url
 */
function doneDefault( response, url ) {

	console.log( 'response: ' + response + ' in the url: ' + url )

}
/**
 * DEFAULT REQUEST ( error ).
 * @param error
 * @param url
 */
function errorDefault( error, url ) {

	console.warn( 'Error: ' + error + ' in the url: ' + url )

}
