/**
 * POP UP .
 *
 * Class to create pop ups faster and easier.
 *
 * Since    1.0.0
 * version  1.0.0.
 */

import { Core } from '../core/core'

class Popup extends Core {

	constructor() {

		super()
		this.functs = this.functs()
		this._rules = this.dRules()
		this.loaded = true

	}

	/**
	 * GETTERs & SETTERs.
	 *
	 * The methods options and generalOptions of the core class are inherited.
	 *
	 */

	// Rules
	get rules() {

		return this._rules

	}

	set rules( {
		name, funct,
	} ) {

		this._rules[name] = funct

	}

	/**
	 * DEFAULT OPTIONS.
	 *
	 * Overrides the default options of Core class.
	 *
	 */

	// General
	dGeneralOptions() {

		return {
			classSelector  : 'body',
			appendSelector : 'body',
			styles         : {
				popupClasses    : 'pigeon-popup',
				bgClasses       : 'pigeon-popup-bg',
				sectionsClasses : 'pigeon-popup-sections',
			},
		}

	}

	// For each popup
	dOptions() {

		return {
			id       : '',
			position : 'center',
			content  : {
				title    : '',
				body     : '',
				footer   : '',
				closeBtn : true,
				urlParam : false,
			},
			rules : {
				onClick : {
					active         : false,
					querySelectors : [ '' ],
					delay          : 4000,
				},
				onScroll : {
					active         : false,
					querySelectors : [],
					delay          : 4000,
				},
				onPageViews : {
					active        : false,
					viewsNum      : '',
					querySelector : 'body',
					classNames    : [ '' ],
				},
				afterinactivity : {
					active           : false,
					miliseconds      : 30000,
					returnActivityCB : () => {},
					delay            : 2000,
				},
				onPageExitIntent : {
					active : false,
					delay  : 0,
				},
				onSpecificPages : {
					active        : false,
					querySelector : 'body',
					classNames    : [ '' ],
					delay         : 0,
				},
			},
			styles : {
				classes         : 'pop-up-section', // for styles, animations etc
				btnPosition     : [ 'pop-up', 'top-right' ], // [ 'pop-up/window', 'left/right/top/bottom/top-left/top-right/bottom-left/bottom-right' ]
				closeBtnClasses : 'pigeon-close fas fa-times',
			},
			callback : () => {},
		}

	}

	/**
	 * FUNCTIONALITY.
	 *
	 * All the functions to the class are stored here.
	 *
	 */

	functs() {

		const core   = this.core
		const functs = {}

		functs.html = ( type, data ) => {

			var selector, classSelector, html

			if ( type === 'main' ) {

				selector      = document.querySelector( data.appendSelector )
				classSelector = document.querySelector( data.classSelector )
				html          = '<div class="' + data.styles.popupClasses + '"  data-type="pop-up" data-mode="close" data-position="" >'
				+ '<div data-type="pop-up-bg" class="' + data.styles.bgClasses + '">'
				+ '<div data-type="pop-up-sections" class="' + data.styles.sectionsClasses + '">'
				+ '</div>'
				+ '</div>'
				+ '</div>'

				selector.insertAdjacentHTML( 'beforeend', html )
				classSelector.classList.add( 'popup' )

			}

			if ( type === 'section' ) {

				// set button class name as ID if ID variable does not exist
				var ppID, ppPosition, ppUrlParam, ppCloseBtn, ppRules, ppTitle, ppFooter, ppCallBack,

					verify = selector => {

						return ( selector === '' || selector === null || selector === false ) ? 'false' : 'true'

					}

				ppID       = ( verify( data.id ) === 'false' ) ? '' : data.id
				ppPosition = ( verify( data.position ) === 'false' ) ? 'center' : data.position
				ppUrlParam = ( data.content.urlParam === true ) ? 'true' : 'false'
				ppCloseBtn = ( data.content.closeBtn === true ) ? 'open' : 'close'
				ppCloseBtn = '<div data-type="btn" data-mode="' + ppCloseBtn + '" data-position="' + data.styles.btnPosition + '" class="' + data.styles.closeBtnClasses + '"></div>'
				ppTitle    = ( data.content.title != '' ) ? '<div class="pigeon-title">' + data.content.title + '</div>' : ''
				ppFooter   = ( data.content.footer != '' ) ? '<div class="pigeon-footer">' + data.content.footer + '</div>' : ''
				ppCallBack = ( typeof data.callback != 'function' ) ? 'false' : data.callback.name
				ppRules    = JSON.stringify( data.rules )
				ppRules    = ppRules.replace( /"/g, '\'' )

				selector = document.querySelector( '[data-type="pop-up-sections"]' )
				html     = '<div class="' + data.styles.classes + '" data-id="' + ppID + '" data-mode="close" data-param="' + ppUrlParam + '" data-rules="' + ppRules + '" data-position="' + ppPosition + '" data-cb="' + ppCallBack + '" >' + ppCloseBtn + ppTitle + data.content.body + ppFooter + '</div>'

				selector.insertAdjacentHTML( 'beforeend', html )

			}

		}

		functs.position = function ( selector ) {

			var position = selector.dataset.position,
				pp       = selector.closest( '[data-type="pop-up"]' )

			pp.dataset.position = position

		}

		functs.url = function ( selector, id ) {

			var param = 'popup=' + id

			// if is entering by url
			if ( window.location.href.indexOf( param ) > -1 ) {

				functs.show( selector )

			}
			else {

				functs.hide( selector )

			}

			// if change url
			window.addEventListener(
				'popstate', () => {

					if ( window.location.href.indexOf( param ) > -1 ) {

						functs.show( selector )

					}
					else {

						functs.hide( selector )

					}

				},
				false,
			)

		}

		functs.callback = function ( selector ) {

			var callback = selector.dataset.cb
			if ( callback != 'false' || callback != null ) {

				//callback();

			}

		}

		functs.toggle = function ( selector, mode, url, id ) {

			var pp = selector.closest( '[data-type="pop-up"]' )

			pp.dataset.mode       = mode
			selector.dataset.mode = mode

			if ( selector.dataset.param == 'true' ) {

				core.urlParameter(
					url, // url to change
					'popup', // parameter key
					id, // parameter value
					true, // update
					false, // refresh
				)

			}

		}

		functs.event = function ( querys, event, eventFunct, delay ) {

			var selector

			if ( Array.isArray( querys ) ) {

				for ( var i = querys.length - 1; i >= 0; i-- ) {

					selector = document.querySelector( querys[i] )

					if ( !selector ) {

						console.warn( 'There is no identifier to open the pop up "' + querys[i] + '"' )

					}
					else {

						for ( var e = selector.length - 1; e >= 0; e-- ) {

							selector[e].addEventListener(
								event,
								() => {

									setTimeout( () => {

										eventFunct()

									}, delay )

								},
								false,
							)

						}

					}

				}

			}
			else {

				if ( querys === 'window' ) {

					selector = window

				}
				else {

					selector = document.querySelectorAll( ( querys ) )

				}

				if ( !selector ) {

					console.warn( 'There is no identifier to open the pop up "' + querys + '"' )

				}
				else {

					for ( var u = selector.length - 1; u >= 0; u-- ) {

						selector[u].addEventListener(
							event,
							() => {

								setTimeout( () => {

									eventFunct()

								}, delay )

							},
							false,
						)

					}

				}

			}

		}

		functs.show = function ( selector ) {

			if ( selector.dataset.mode === 'close' ) {

				functs.toggle( selector, 'open', location.href, selector.dataset.id )
				functs.position( selector )
				functs.callback( selector )

			}

		}

		functs.hide = function ( selector ) {

			if ( selector.dataset.mode === 'open' ) {

				functs.toggle( selector, 'close', location.href, '' )

			}

		}

		return functs

	}

	/**
	 * RULES.
	 *
	 * All the rules to the class are stored here.
	 *
	 */

	dRules() {

		const functs = this.functs
		const rules 	= {}

		rules.onClick = function ( selector, dataRule ) {

			var querys = dataRule.querySelectors,
				delay 	= dataRule.delay,
				funct  = () => functs.show( selector )

			functs.event( querys, 'click', funct, delay )

		}

		rules.onScroll = function ( selector, dataRule ) {

			var querys = dataRule.querySelectors,
				delay 	= dataRule.delay,
				funct  = () => functs.show( selector )

			functs.event( querys, 'scroll', funct, delay )

		}

		rules.onPageViews = function ( selector, dataRule ) {

			var delay = dataRule.delay,
				selectorID      = selector.dataset.id,
				classNamesQuery = dataRule.classNames,
				pageQuery       = dataRule.querySelector,
				viewsNum        = dataRule.viewsNum,
				page            = document.querySelector( pageQuery ),

				//var mySession 		= window.sessionStorage, pageCount;
				sesionName = 'pageCount_' + selectorID,
				session    = sessionStorage.getItem( sesionName )

			window.addEventListener( 'load', () => {

				for ( var i = classNamesQuery.length - 1; i >= 0; i-- ) {

					if ( page.classList.contains( classNamesQuery[i] ) ) {

						sessionsCount()

					}

				}

				set()

			} )

			/**
			 *
			 */
			function sessionsCount() {

				if ( session === null ) {

					session = 0

				}
				session++
				sessionStorage.setItem( sesionName, session )

			}

			/**
			 *
			 */
			function set() {

				if ( session == viewsNum ) {

					setTimeout(
						() => {

							functs.show( selector )

						},
						delay,
					)

				}

			}

		}

		rules.afterinactivity = function ( selector, dataRule ) {

			var delay = dataRule.delay,
				miliseconds      = dataRule.miliseconds,
				returnActivityCB = dataRule.returnActivityCB

			/**
			 *
			 * @param millis
			 * @param onIdle
			 * @param onUnidle
			 */
			function setIdleTimeout( millis, onIdle, onUnidle ) {

				var timeout = 0
				startTimer()

				/**
				 *
				 */
				function startTimer() {

					timeout = setTimeout( onExpires, millis )
					document.addEventListener( 'mousemove', onActivity )
					document.addEventListener( 'keypress', onActivity )

				}

				/**
				 *
				 */
				function onExpires() {

					timeout = 0
					onIdle()

				}

				/**
				 *
				 */
				function onActivity() {

					if ( timeout ) clearTimeout( timeout )
					else onUnidle()
					//since the mouse is moving, we turn off our event hooks for 1 second
					document.removeEventListener( 'mousemove', onActivity )
					document.removeEventListener( 'keypress', onActivity )
					setTimeout( startTimer, 1000 )

				}

			}

			setIdleTimeout(
				miliseconds,
				() => {

					setTimeout(
						() => {

							functs.show( selector )

						},
						delay,
					)

				},
				() => {

					returnActivityCB()

				},
			)

		}

		rules.onPageExitIntent = function ( selector, dataRule ) {

			var delay = dataRule.delay

			document.addEventListener( 'mouseout', e => {

				if ( !e.toElement && !e.relatedTarget ) {

					setTimeout(
						() => {

							functs.show( selector )

						},
						delay,
					)

				}

			} )

		}

		rules.onSpecificPages = function ( selector, dataRule ) {

			var delay = dataRule.delay,
				selectorQuery  		= dataRule.querySelector,
				classNamesQuerys = dataRule.classNames,
				page             = document.querySelector( selectorQuery )

			for ( var i = classNamesQuerys.length - 1; i >= 0; i-- ) {

				if ( page.classList.contains( classNamesQuerys[i] ) ) {

					setTimeout(
						() => {

							functs.show( selector )

						},
						delay,
					)

				}

			}

		}

		rules.close = function ( selector ) {

			var closeBTN = selector.querySelector( '[data-type="btn"]' ),
				pp       = selector.closest( '[data-type="pop-up"]' ),

				closeFunct = function () {

					functs.hide( selector )

				}

			// Close popup when the user clicks outside the popup div
			closeBTN.addEventListener( 'click', closeFunct, false )
			pp.addEventListener( 'click', closeFunct, false )
			selector.addEventListener( 'click', e => {

				e.stopPropagation()

			}, false )

		}

		return rules

	}

	/**
	 * LOADER.
	 *
	 */

	load( ) {

		this.loaded = false

		// document.addEventListener( 'DOMContentLoaded', ( ) => {

		// console.log( 'loaded' )
		var functs = this.functs,
			rules      = this.rules,
			ppSections = document.querySelectorAll( '[data-type="pop-up-sections"] > div' )

		for ( var i = ppSections.length - 1; i >= 0; i-- ) {

			var selector = ppSections[i],
				dataRules     = selector.dataset.rules,
				dataParam     = selector.dataset.param,
				dataRulesJSON = JSON.parse( dataRules.replace( /'/g, '"' ) )

			Object.keys( dataRulesJSON ).forEach( key => {

				var dataRule = dataRulesJSON[key]

				if ( dataRule.active === true ) {

					rules[key]( selector, dataRule )

				}

			} )

			// Show popup if is in set url
			if ( dataParam == 'true' ) {

				var id = selector.dataset.id
				functs.url( selector, id )

			}

			rules.close( selector )

		}

		// } )

	}

	/**
	 * ADD POP UPS.
	 *
	 * This function is used to add pop ups.
	 *
	 */

	add( values = {} ) {

		var core = this.core,
			functs      = this.functs,
			generalData = this.generalOptions,
			dataV       = this.options,

			data = core.merge( dataV, values ),

			ppSelector = document.querySelector( generalData.classSelector )

		// Set popup main HTML
		if ( !ppSelector.classList.contains( 'popup' ) ) {

			functs.html( 'main', generalData )

		}

		// Set popup Section
		functs.html( 'section', data )

		// Set popups
		// if ( this.loaded === true ) {

		this.load()

		// }

	}

}

/**
 * EXPORT.
 *
 * A variable with an instance of the class is exported.
 *
 */

export const popup = new Popup()

