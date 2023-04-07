/**
 * Todo.
 *
 * @description Todo.
 */

export const replaceUrls = async ( data, replaceText = false ) =>{

	if ( typeof data === 'object' ) {

		// If the data is an object, loop through its properties and recursively call the function
		for ( let key in data ) {

			data[key] = await replaceUrls( data[key] )
		
		}
	
	} else if ( typeof data === 'string' ) {

		// If the data is a string, check if it contains a URL
		const urlRegex = /(https?:\/\/[^\s]+)/g
		const urls     = data.match( urlRegex )
		
		if ( urls ) {

			// If a URL exists, check if it is valid
			for ( let url of urls ) {

				try {

					const res = await fetch( url, { method: 'HEAD' } )
					
					if ( res.status === 404 ) {

						data = data.replace( url, replaceText )
					
					}
				
				} catch ( e ) {

					// If the URL is not valid, replace it with false
					data = data.replace( url, replaceText )
				
				}

			}
		
		}
	
	}

	// Return the updated data
	return data

}
