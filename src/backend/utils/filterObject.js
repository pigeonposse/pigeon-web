/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

export const filterObject = ( obj, callback ) => {

	return Object.fromEntries( Object.entries( obj ).
		filter( ( [ key, val ] ) => callback( key, val ) ) )

}
