/**
 * PIGEON JS.
 *
 * Javascript library with functionalities for a faster and more modern web development.
 *
 * Link     https//pigeonposse.com
 * author   Angelo <angelespejo13@gmail.com>.
 *
 * Since    1.0.0
 * version  1.0.0.
 */

/**
 * IMPORT ALL OBJECTS.
 *
 */
// import './banda.css'

import { popup } from './src/popup'
import { share } from './src/share'
import { url }   from './src/url'

let res, body
res  = false
body = document.querySelector( 'body' )

if ( body ) {

	body.classList.add( 'banda-js' )

	res = {
		popup : popup,
		share : share,
		url   : url,
	}

}

export const banda = res
