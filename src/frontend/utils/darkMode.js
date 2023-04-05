/**
 * Todo.
 *
 * @description Todo.
 *
 */

export const darkMode = ( btns = false ) => {

	const prefersDarkMode = window.matchMedia( '(prefers-color-scheme: dark)' ).matches
	const id              = 'darkmode'
	
	const isDarkmode = () => {

		let bool, value
		
		value = localStorage.getItem( id )
		bool  = value == 'true' || value == true

		return value === null ? prefersDarkMode : bool

	}
	
	const bodyClass = ( mode ) => {

		let exists

		exists = document.body.classList.contains( id )
		
		if ( mode && !exists ) document.body.classList.add( id )
		if ( !mode && exists )document.body.classList.remove( id )
	
	}

	const setUserTheme = ( value ) => {

		let bool 

		bool = value == 'true' || value == true

		localStorage.setItem( id, bool )
		bodyClass( bool )

	}

	const run = () => {

		let mode

		mode = isDarkmode()
		
		bodyClass( mode )
		
		console.log( mode, btns )

		if ( !btns || btns.length === 0 ) return
		
		btns.forEach( btn => {

			btn.value = mode 
			
			btn.addEventListener(
				'click', 
				() => {

					let mode = !isDarkmode()
					
					console.log( 'click',isDarkmode(), mode )

					btn.value = mode 

					setUserTheme( mode )
				
				},
				false,
			)
		
		} )

	} 

	run()

}
