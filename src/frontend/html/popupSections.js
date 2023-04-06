/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */
import { newsletter } from './newsletter'

const section = ( html = '' ) => {

	return '<div class="popup-content pigeon-section-content">' + html + '</div>'

}

const about = ()=> {

	return section( `
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
` )

}

const more = ()=> {

	return section( `
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
<div class="newsletter">${newsletter()}</div>
</div>
` )

}

export const popupSections = {
	about  : about,
	more   : more,
	donate : section,
	share  : ( d ) =>'<div class="pigeon-share">' + section( d ) + '</div>',
}

