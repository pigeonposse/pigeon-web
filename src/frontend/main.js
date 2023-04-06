/**
 * Todo.
 *
 * @description Todo.
 */

import { banda }  from './banda/banda'
import * as utils from './utils/main'
import * as html  from './html/main'
import { data }   from './data'

import '../assets/scss/main.scss'

( async() => {
	
	utils.darkMode.set()

	const apiData  = await utils.apiData()
	const sections = await html.sections( apiData, utils )

	utils.addInnerHTML( '.footer-content', html.footer( apiData ) )
	utils.addInnerHTML( '.header', html.header( apiData ) )
	utils.addInnerHTML( '#app .pigeon-archive-sites.all', sections )

	const frontData = data( utils, html, banda )

	await utils.setPopups( banda.popup, frontData.popups )

	if ( !banda ) return

	/**
	 * AFTER INIT POPUP CONTENT.
	 */
	utils.addInnerHTML( '[data-id="donate"] > .popup-content', '<iframe id="kofiframe" loading="lazy" src="' + apiData.funding.kofi.iframe + '" ></iframe>' )
	utils.addInnerHTML( '[data-id="team"] > div', apiData.orgData.descriptionLong )
	utils.addInnerHTML( '[data-id="creators"] > div', html.members( apiData ) )
	utils.addInnerHTML( '[data-id="social"] > div', html.links.social( apiData ) )
	utils.addInnerHTML( '[data-id="contribute"] > div .content', html.links.funding( apiData ) )

	utils.darkMode.changeBtns( '[data-id="darkmode"] [data-type="checkbox"] input' )

} )()

