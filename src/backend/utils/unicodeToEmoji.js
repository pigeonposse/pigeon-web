/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

export const unicodeToEmoji = ( str ) => {

	const regex = /([\u{1F300}-\u{1F6FF}])/gu
	return str.replace( regex, ( match, p1 ) => {

		return String.fromCodePoint( p1.codePointAt( 0 ) )
			
	} )

}
