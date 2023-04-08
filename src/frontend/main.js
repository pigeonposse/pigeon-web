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

const run = async () => {
	
	utils.darkMode.set()

	const apiData  = await utils.apiData()
	const sections = await html.sections( apiData, utils )
	const ErroMsg  = '<div></div><div style="text-align:center;"><h2>❌ API REST ERROR</h2><h3>Data not found 👎</h3></div><div></div>'
	
	if ( apiData ) {

		utils.addInnerHTML( '.footer-content', html.footer( apiData ) )
		utils.addInnerHTML( '.header', html.header( apiData ) )
		utils.addInnerHTML( '#app .pigeon-archive-sites.all', sections ? sections : ErroMsg )

	}else {

		utils.addInnerHTML( '#app .pigeon-archive-sites.all', ErroMsg )

	}

	const frontData = data( utils, html, banda )

	await utils.setPopups( banda.popup, frontData.popups )

	if ( !banda ) return

	/**
	 * AFTER INIT POPUP CONTENT.
	 */
	if ( apiData ) {
	
		const iframeFunding = apiData.funding && apiData.funding.kofi && apiData.funding.kofi.iframe ? apiData.funding.kofi.iframe : ''
		const descLong      = apiData.orgData && apiData.orgData.descriptionLong ? apiData.orgData.descriptionLong : ''
		
		utils.addInnerHTML( '[data-id="donate"] > .popup-content', iframeFunding )
		utils.addInnerHTML( '[data-id="team"] > div', descLong )
		utils.addInnerHTML( '[data-id="creators"] > div', html.members( apiData ) )
		utils.addInnerHTML( '[data-id="social"] > div', html.links.social( apiData ) )
		utils.addInnerHTML( '[data-id="contribute"] > div .content', html.links.funding( apiData ) )
	
	}

	utils.menu( '.menu .responsive' )
	utils.darkMode.changeBtns( '[data-id="darkmode"] [data-type="checkbox"] input' )

} 

( async() => {

	try{

		run()

	}catch( e ){

		console.error( e )

	}

} )()
