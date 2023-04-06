/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

export const addInnerHTML = ( query = '', html = '' ) => {

	let sel 

	sel = document.querySelector( query )
	if ( sel ) sel.innerHTML = html
	
}
