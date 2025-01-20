/**
 * Todo.
 * @description Todo.
 * @version 1.0.0
 */

export const getObjectValue = ( object, path ) => {

	// Convert the path to an array of keys
	const keys = Array.isArray( path ) ? path : path.split( '.' )

	// Iterate through the keys to retrieve the nested value
	for ( let i = 0; i < keys.length; i++ ) {

		if ( !object || !object.hasOwnProperty( keys[i] ) ) {

			// If the value is undefined or the key doesn't exist, return the default value
			return false

		}

		// Otherwise, update the object to the next nested value
		object = object[keys[i]]

	}

	// If we successfully retrieved the nested value, return it
	return object

}
