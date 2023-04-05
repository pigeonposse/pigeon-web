/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

export const setPopups = async ( library, args ) => {

	/**
	 * Set defaults popups.
	 */
	library.generalOptions = args.generalOptions

	/**
	 * Set popups.
	 */
	let ppObjectKeys = Object.keys( args.popups )

	for ( let i = ppObjectKeys.length - 1; i >= 0; i-- ) {
			
		let value, query, selector , section
		
		value    = ppObjectKeys[i]
		query    = '[data-open="' + value + '"]'
		selector = document.querySelector( query )
		
		/**
		 * Add pigeon popup.
		 */
		if ( selector ) {

			section = args.popups[value]['section']

			await library.add( {
				id       : value, 
				position : args.popups[value]['position'], 
				content  : {
					title    : args.popups[value]['title'],
					body     : section,
					footer   : args.popups[value]['footer'],
					closeBtn : false,
					urlParam : true,
				},
				rules : {
					onClick : {
						active         : true,
						querySelectors : query,
						delay          : 0,
					},
				},
			} )
		
		}
			
	}

}
