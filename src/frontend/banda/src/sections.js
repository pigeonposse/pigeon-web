/**
 * SECTIONS.
 *
 * Class to create sections faster and easier.
 *
 * Since    1.0.0
 * version  1.0.0.
 */ 
  
import { Core } from '../core/core'

class Sections extends Core {

	constructor() {

		super()
		this.functs = this.functs()
		this._rules = this.dRules()

	}

	/**
	 * GETTERs & SETTERs.
	 *
	 * The methods options and generalOptions of the core class are inherited.
	 *
	 */

	get rules(){

		return this._rules
	
	}

	set rules( { name, funct } ){

		this._rules[name] = funct
	
	}

	/**
	 * DEFAULT OPTIONS.
	 *
	 * Overrides the default options of Core class.
	 *
	 */

	dGeneralOptions() {

		return {
			styles : {
				popUpClassSelector : 'body',
				appendSelector     : 'body',
				popupClasses       : 'pigeon-popup',
				bgClasses          : 'pigeon-popup-bg',
				sectionsClasses    : 'pigeon-popup-sections',
			},
		}

	}
	dOptions() {
	}

	/**
	 * FUNCTIONALITY.
	 *
	 * All the functions to the class are stored here.
	 *
	 */

	functs() {

		let core = this.core,
		 functs = {}

		functs.click = ( sectionQuery, partQuery, btnQuery, goQuery ) => {
            
			var partBTNs = document.querySelectorAll( sectionQuery + ' ' + btnQuery )

			for ( var i = partBTNs.length - 1; i >= 0; i-- ) {

				partBTNs[i].addEventListener(
					'click', 
					function( event ){

						var partNum = event.currentTarget.closest( partQuery ).getAttribute( partQuery ),
						 partSelector = '[data-part="' + partNum + '"]',
						 part         = document.querySelector( partSelector ),

						 nextNum      = event.currentTarget.getAttribute( goQuery ),
						 nextSelector = '[data-part="' + nextNum + '"]',
						 nextPart     = document.querySelector( nextSelector )
                        
						nextPart.dataset.mode = 'open' 
						part.dataset.mode     = 'close'

					},
					false,
				)
			
			}

		}

		functs.html = ( data = {} ) => {

			var sectionQuery = document.querySelector( data.queryID ),
			 parts        = data.parts,

			 html    = ''
			html            += '<div data-type="section" >'

			for ( var i = parts.length - 1; i >= 0; i-- ) {

				var dataMode = ( i === 0 ) ? 'open' : 'close',
				 next     = ++i

				html += '<div data-part="' + i + '" data-mode="' + dataMode + '" >' +
                    parts[i].content +
                    '<div data-type="btn" data-go="' + next + '"></div>' +
                '</div>'

			}

			html += '</div>'

			sectionQuery.innerHTML = html

		}

	}

	/**
	 * RULES.
	 *
	 * All the rules to the class are stored here.
	 *
	 */

	dRules() {

		let functs = this.functs,
		 rules  = {}

		rules.click = () => {

			functs.click()

		}
    
	}

	/**
	 * LOADER.
	 *
	 */

	load () {

	}

	/**
	 * ADD SECTIONS .
	 *
	 * This function is used to add sections.
	 *
	 */

	add( values = {} ) {

		this.functs.html( values )
		this.functs.click( '[data-type="section"]','[data-part]', '[data-btn]', '[data-go]' )
    
	}

}

/**
 * EXPORT.
 *
 * A variable with an instance of the class is exported.
 *
 */

export let sections = new Sections()

