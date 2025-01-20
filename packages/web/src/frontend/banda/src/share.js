/**
 * Share Links.
 *
 * Class to create share links faster and easier.
 *
 * Since    1.0.0
 * version  1.0.0.
 */

import { Core } from '../core/core'

class Share extends Core {

	constructor( ) {

		super()
		this.functs = this.functs()

	}

	/**
	 * DEFAULT OPTIONS.
	 *
	 */
	dGeneralOptions() {

		return {
			// Nothing
		}

	}

	dOptions() {

		return {
			get   : 'html',
			types : {
				/*
		        facebook: {
		            title: 'Facebook',
		            message: '',
		        },
		        twitter: {
		            title: 'Twitter',
		            message: '',
		        },
		        pinterest: {
		            title: 'pinterest',
		            message: '',
		            media :'',
		        },
		        whatsapp: {
		            title: 'Whatsapp',
		            message: '',
		        },
		        telegram: {
		            title: 'Telegram',
		            message: '',
		        },
		        linkedin: {
		            title: 'Linkedin',
		            message: '',
		        },
		        reddit: {
		            title: 'Reddit',
		            message: '',
		        },
		        houzz: {
		            title: 'Houzz',
		            message: '',
		        },
		        mail: {
		            title: 'Mail',
		            subject: '',
		            message: '',
		        },
		        copy: {
		            title: 'Copy link here',
		            link: '',
		            button: false,
		            successMessage : '',
		        },
		        custom: {
		            title: 'custom',
		            link: '',
		        },
		        */
			},
		}

	}

	functs() {

		const functs = {}

		functs.copy = selector => {

			var copyBTN = selector.querySelector( '[data-type="btn"]' ),
				copyInput = selector.querySelector( '[data-type="input"]' ),
				succesMSG = selector.querySelector( '[data-mode="close"]' )

			copyBTN.onclick = () => {

				copyInput.select()
				document.execCommand( 'copy' )

				if ( succesMSG ) {

					succesMSG.dataset.mode = 'open'
					setTimeout(
						() => {

							succesMSG.dataset.mode = 'close'

						},
						3000,
					)

				}

			}

		}

		functs.array = values => {

			var array = [],
				types    = values,
				arrayNum = 0

			// Create ARRAY with all information
			for ( const type in types ) {

				var message = types[type].message ? encodeURIComponent( types[type].message ) : '%20',
					title   = ( types[type].title ) ? types[type].title : '',
					url     = encodeURIComponent( window.location ),
					link    = types[type].link ? ( types[type].link ) : url

				if ( type == 'facebook' ) {

					array[arrayNum] = {
						type : type,
						text : title,
						link : 'https://www.facebook.com/sharer/sharer.php?u=' + url + '&t=' + message,
					}

				}
				else if ( type == 'twitter' ) {

					array[arrayNum] = {
						type : type,
						text : title,
						link : 'https://twitter.com/intent/tweet?url=' + url + '&text=' + message,
					}

				}
				else if ( type == 'pinterest' ) {

					var media       = types[type].media ? encodeURIComponent( types[type].media ) : '%20'
					array[arrayNum] = {
						type : type,
						text : title,
						link : 'http://pinterest.com/pin/create/button/?url=' + url + '&media=' + media + '&description=' + message,
					}

				}
				else if ( type == 'whatsapp' ) {

					array[arrayNum] = {
						type : type,
						text : title,
						link : 'https://wa.me/?text=' + url + '%20' + message,
					}

				}
				else if ( type == 'telegram' ) {

					array[arrayNum] = {
						type : type,
						text : title,
						link : 'https://telegram.me/share/url?url=' + url + '&amp;text=' + message,
					}

				}
				else if ( type == 'linkedin' ) {

					array[arrayNum] = {
						type : type,
						text : title,
						link : 'http://www.linkedin.com/shareArticle?mini=true&url=' + url + '&amp;title=' + message,
					}

				}
				else if ( type == 'reddit' ) {

					array[arrayNum] = {
						type : type,
						text : types[type].title,
						link : 'https://www.reddit.com/submit?url=' + url + '&title=' + message,
					}

				}
				else if ( type == 'houzz' ) {

					array[arrayNum] = {
						type : 'houzz',
						text : title,
						link : 'http://www.houzz.com/imageClipperUpload?=' + url + '&title=' + message,
					}

				}
				else if ( type == 'mail' ) {

					var subject     = types[type].subject ? encodeURIComponent( types[type].subject ) : '%20'
					array[arrayNum] = {
						type : type,
						text : title,
						link : 'mailto:?body=' + message + '&subject=' + subject,
					}

				}
				else if ( type == 'copy' ) {

					var btn         = types[type].button ? types[type].button : false,
						msg         = types[type].successMessage ? types[type].successMessage : false
					array[arrayNum] = {
						type      : type,
						text      : title,
						link      : link,
						btn       : btn,
						succesMSG : msg,
					}

				}
				else {

					array[arrayNum] = {
						type : type,
						text : title,
						link : link,
					}

				}

				arrayNum++

			}

			return array

		}

		functs.html = values => {

			var array = functs.array( values ),

				html = document.createElement( 'div' )

			for ( var i = 0; i < array.length; i++ ) {

				if ( array[i].type == 'copy' ) {

					var title = ( array[i].text != '' ) ? '<div class="pigeon-copy-title">' + array[i].text + '</div>' : '',
						btn   = ( array[i].btn != false ) ? '<div data-type="btn" class="pigeon-copy-btn">' + array[i].btn + '</div>' : '',
						msg   = ( array[i].succesMSG != false ) ? '<div data-mode="close" class="pigeon-copy-success">' + array[i].succesMSG + '<div>' : '',

						htmlCopy = '<div data-type="share-copy" class="pigeon-share-copy">'
						+ title
						+ '<div data-type="share-copy-section">'
						+ '<input data-type="input" class="pigeon-copy-text" type="text" value="' + array[i].link + '" readonly="readonly">'
						+ btn + msg
						+ '</div>'
						+ '</div>',

						htmlCopyDiv = document.createElement( 'div' )

					htmlCopyDiv.innerHTML = htmlCopy

					html.insertAdjacentHTML( 'beforeend', htmlCopyDiv.innerHTML )

				}
				else {

					var htmlContent = '<a href="' + array[i].link + '" title="' + array[i].type + '" target="_blank">'
						+ array[i].text
						+ '</a>'

					html.insertAdjacentHTML( 'beforeend', htmlContent )

				}

			}

			return html.innerHTML

		}

		return functs

	}

	create( values = { } ) {

		var data = this.core.merge( this.options, values ),
			result

		// Change result depending of 'get'
		if ( data.get == 'html' ) {

			result = this.functs.html( data.types )

		}
		else if ( data.get == 'array' ) {

			result = this.functs.array( data.types )

		}
		else {

			result = ''

		}

		this.loaded()

		// Return
		return result

	}

	/**
	 * LOADER.
	 *
	 * When all dom is loaded this function is called.
	 *
	 */

	loaded() {

		document.addEventListener( 'DOMContentLoaded', ( ) => {

			var copyLinks = document.querySelectorAll( '[data-type="share-copy"]' )

			for ( var i = copyLinks.length - 1; i >= 0; i-- ) {

				var selector = copyLinks[i]

				this.functs.copy( selector )

			}

		} )

	}

}

/**
 * EXPORT.
 *
 * A variable with an instance of the class is exported.
 *
 */

export const share = new Share()
