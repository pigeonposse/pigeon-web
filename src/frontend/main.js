/**
 * Todo.
 *
 * @description Todo.
 */

import { banda }  from './banda/banda'
import * as utils from './utils/main'

import '../assets/scss/main.scss'

( async() => {

	let menbersHTML, popupsArgs, shareHtml, shareMsg, location
	
	location = window.location
	location = location.toString()
	location = location.replace( '?popup=about', '' ).replace( '&popup=about', '' )
	shareMsg = 'See what original projects I just discovered at PIGEONPOSSE 🤩 Code 💻, games 👾 and creativity 💻 all in one, incredible 😎😎😎! ' + location
	
	shareHtml = utils.setShare( 
		banda.share,
		{
			general : {
				msg : 'W👀👀W! ' + shareMsg,
			},
			mail : {
				msg     : shareMsg,
				subject : '👇🤩 See what original projects in ' + location + '🤩👇',
			},
			copy : {
				title          : 'Copy URL here', 
				link           : location,
				successMessage : 'Copied successfully!',
			}, 
		}, 
	)	

	/**
	 * Set defaults popups.
	 */
	popupsArgs = {
		generalOptions : {
			classSelector  : 'body',
			appendSelector : '.footer',
		},
		popups : {
			donate : {
				title    : 'Donate',
				footer   : '',
				position : 'left',
				section  : '<iframe id=\'kofiframe\' loading="lazy" src=\'https://ko-fi.com/pigeonposse/?hidefeed=true&widget=true&embed=true&preview=true\' height=\'712\' title=\'pigeonposse\'></iframe>',
			},
			share : {
				title    : 'Share on Social networks',
				footer   : '',
				position : 'center',
				section  : `
<div class="popup-content pigeon-section-content">
	<div class="pigeon-share">
	${shareHtml}
	</div>
</div>
				`,
			},
			more : {
				title    : 'More info',
				footer   : '',
				position : 'center',
				section  : `
<div class="popup-content pigeon-section-content">
	<div data-id="darkmode" class="checkbox">
		<h3><span class="fa-solid fa-circle-half-stroke"></span>Darkmode</h3>
		<div class="content">
			<label data-type="checkbox" class="switch content">
				<input type="checkbox" checked="checked"><span class="slider round"></span>
			</label>
		</div>
	</div>
	<div data-id="info" class="buttons">
		<h3><span class="fa-solid fa-info"></span>Info</h3>
		<div class="content">
			<a href="/policy" class="" target="_blank">Cookies</a>
			<a href="/?popup=donate" class="" target="_blank">Donate</a>
		</div>
	</div>
	<div data-id="social" class="buttons">
		<h3><span class="fa-solid fa-share"></span>Social</h3>
		<div class="content">
		</div>
	</div>
	<div class="newsletter">
<div class="content"><p>Subscribe to our newsletter!</p>
<script type="text/javascript" src="//notification.pigeonposse.com/form/generate.js?id=1"></script>

<form autocomplete="false" role="form" method="post" action="https://notification.pigeonposse.com/form/submit?formId=1" id="mauticform_suscripcionnewsletter" data-mautic-form="suscripcionnewsletter" enctype="multipart/form-data" pp-subscribe="" style="width: 100%;" class="AVAST_PAM_nonloginform">
    
    <input id="mauticform_input_suscripcionnewsletter_f_name" name="mauticform[f_name]" value="" class="mauticform-input" type="text" placeholder="First name">
    <input id="mauticform_input_suscripcionnewsletter_last_name" name="mauticform[last_name]" value="" class="mauticform-input" type="text" placeholder="Last name">
    <input id="mauticform_input_suscripcionnewsletter_email" name="mauticform[email]" value="" class="mauticform-input" type="email" placeholder="Mail">
    <div class="cf-turnstile" data-theme="dark" data-sitekey="0x4AAAAAAAB-AYfWgQnFmqYa" style="margin-top: 20px;"><iframe src="https://challenges.cloudflare.com/cdn-cgi/challenge-platform/h/g/turnstile/if/ov2/av0/swj9g/0x4AAAAAAAB-AYfWgQnFmqYa/dark/normal" allow="cross-origin-isolated" id="cf-chl-widget-swj9g" tabindex="0" title="Widget containing a Cloudflare security challenge" style="border: none; overflow: hidden; width: 300px; height: 65px;"></iframe><input type="hidden" name="cf-turnstile-response" id="cf-chl-widget-swj9g_response" value=""></div>
    <button type="submit" name="mauticform[submit]" id="mauticform_input_suscripcionnewsletter_submit" value="" class="mauticform-button btn btn-default">Submit</button>

    <input type="hidden" name="mauticform[formId]" id="mauticform_suscripcionnewsletter_id" value="1">
    <input type="hidden" name="mauticform[return]" id="mauticform_suscripcionnewsletter_return" value="">
    <input type="hidden" name="mauticform[formName]" id="mauticform_suscripcionnewsletter_name" value="suscripcionnewsletter">

</form>

</div>
	</div>
</div>
				`,
			},
			about : {
				title    : 'About',
				footer   : '',
				position : 'right',
				section  : `
<div class="popup-content pigeon-section-content">
	<div data-id="team" class="html">
		<h3><span class="fa-solid fa-dove"></span>About collective</h3>
		<div class="content"></div>
	</div>
	<div data-id="creators" class="images">
		<h3><span class="fa-solid fa-users-gear"></span>Developers</h3>
		<div class="content"></div>
	</div>
	<div data-id="contribute" class="html">
		<h3><span class="fa-solid fa-comments"></span>Contribute</h3>
			<div class="content">
			If you want to be part of the team, you can do it in different ways: helping us improve our code, donating so we can spend more time on the project, or sending us proposals.
			<div class="buttons">
				<div class="content">
				</div>
			</div>
	</div>
</div>
				`,
			},
		},
	}

	await utils.setPopups( banda.popup, popupsArgs )

	if ( !banda ) return
		
	const data     = await utils.apiData()
	const founders = data.members.find( d => d.slug === 'founders' )
	// console.log( founders )
	
	menbersHTML = ''

	founders.members.forEach( value => {

		let web = !value.blog.startsWith( 'http://' ) && !value.blog.startsWith( 'https://' ) ? 'https://' + value.blog : value.blog
		
		menbersHTML += ` 
		<a href="${web}">
			<span class="img">
			<img loading="lazy" src="${value.avatar}" alt="${value.login}">
			</span>
			<span class="title">${value.name}</span>
			<span class="info">Founder</span>
		</a>
		`
	
	} )

	const socialLinks = ( obj ) => {

		let res = ''

		Object.keys( obj ).forEach( k => {

			if ( obj[k] && obj[k].url && obj[k].name ) {

				res += `<a href="${obj[k].url}" target="_blank">${obj[k].name}</a>`
			
			}
		
		} )

		return res
	
	}

	const fundingLinks = ( obj ) => {

		let res = ''

		Object.keys( obj.funding ).forEach( k => {

			if ( ( k == 'kofi' || k == 'github' ) && obj.funding[k].url && obj.funding[k].name ) {

				res += `<a href="${obj.funding[k].url}" target="_blank">${obj.funding[k].name}</a>`
			
			}
		
		} )

		Object.keys( obj.social ).forEach( k => {

			if ( ( k == 'email' ) && obj.social[k].url && obj.social[k].name ) {

				res += `<a href="${obj.social[k].url}" target="_blank">${obj.social[k].name}</a>`
			
			}
		
		} )

		return res

	}
	
	document.querySelector( '[data-id="team"] > div' ).innerHTML                = data.orgData.descriptionLong
	document.querySelector( '[data-id="creators"] > div' ).innerHTML            = menbersHTML
	document.querySelector( '[data-id="social"] > div' ).innerHTML              = socialLinks( data.social )
	document.querySelector( '[data-id="contribute"] > div .content' ).innerHTML = fundingLinks( data )

	utils.darkMode( document.querySelectorAll( '[data-id="darkmode"] [data-type="checkbox"] input' ) )

} )()

