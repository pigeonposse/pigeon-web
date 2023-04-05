/**
 * CORE.
 *
 * Function to create pop ups faster and easier.
 *
 * Since    1.0.0
 * version  1.0.0.
 */  

import { urlParameter, request, fetch } from './url'

export class Core {

	/**
	 * CONSTRUCTOR.
	 *
	 */
	constructor() {

		this.core            = this.core()
		this._options        = this.dOptions()
		this._generalOptions = this.dGeneralOptions()
		
	}

	/**
	 * GETTERs & SETTERs.
	 *
	 */

	// Options
	get options () {

		return this._options

	}

	set options ( newValues ) {

		var defaultOptions = this.dOptions()

		if ( newValues == 'default' || newValues == '' ) {

			this._options = defaultOptions
		
		}else {

			this._options = this.core.merge( defaultOptions, newValues )
		
		}

	}

	// General options
	get generalOptions () {

		return this._generalOptions

	}

	set generalOptions ( newValues ) {

		var defaultOptions = this.dGeneralOptions()

		if ( newValues == 'default' || newValues == '' ) {

			this._generalOptions = defaultOptions
		
		}else {

			this._generalOptions = this.core.merge( defaultOptions, newValues )
		
		}

	}

	/**
	 * DEFAULT OPTIONS.
	 *
	 */

	dGeneralOptions() {

		return {}

	}
	dOptions() {

		return {}
	
	}
	
	/**
	 * CORE FUNCTIONALITY.
	 *
	 * All the functions to the core class are stored here.
	 *
	 */

	core(){
		
		let functs = {}

		// functs.optionsConstructor = ( property, defaultOptions, newOptions ) => {

		// 	if ( newOptions == 'default' || newOptions == '' ) {
		// 		property = defaultOptions;
		// 	}else {
		// 		property = functs.mergeRecursive( defaultOptions, newOptions );
		// 	}
		// 	console.log( property );
		// };

		functs.merge = ( target, source ) => {

			/**
			 *
			 * @param item
			 */
			function isObject( item ) {

				return ( item && typeof item === 'object' && !Array.isArray( item ) )
			
			}
			/**
			 *
			 * @param target
			 * @param source
			 */
			function mergeDeep( target, source ) {

				let output = Object.assign( {}, target )
				if ( isObject( target ) && isObject( source ) ) {

					Object.keys( source ).forEach( key => {

						if ( isObject( source[key] ) ) {

							if ( !( key in target ) )
								Object.assign( output, { [key]: source[key] } )
							else
								output[key] = mergeDeep( target[key], source[key] )
						
						} else {

							Object.assign( output, { [key]: source[key] } )
						
						}
					
					} )
				
				}
				return output
			
			}
			return mergeDeep( target, source )

		}

		functs.urlParameter = ( url, param, paramVal, update, refresh ) => {

			urlParameter( url, param, paramVal, update, refresh )
		
		}

		functs.request = ( url, method, headers, done, error, async ) => {

			request( url, method, headers, done, error, async )
		
		}

		functs.fetch = ( url, method, headers, done, error ) => {

			fetch( url, method, headers, done, error )
		
		}

		return functs

	}

}
