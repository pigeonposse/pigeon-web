/**
 * Todo.
 * @description Todo.
 * @version 1.0.0
 */

export const menu = query => {

	let sel

	sel = document.querySelector( query )

	const id    = 'active'
	const width = 500

	const removeClass = sel => {

		if ( sel.parentElement && sel.parentElement.classList.contains( id ) && window.innerWidth > width ) {

			sel.parentElement.classList.remove( id )

		}

	}

	const toggleClass = sel => {

		if ( window.innerWidth < width ) {

			if ( sel.parentElement ) sel.parentElement.classList.toggle( id )

		}

	}

	if ( sel ) {

		window.addEventListener( 'resize', () => {

			if ( window.innerWidth > width ) removeClass( sel )

		} )

		removeClass( sel )

		sel.addEventListener( 'click', ( ) => {

			toggleClass( sel )

		} )

	}

}

