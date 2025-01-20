/**
 * Todo.
 * @description Todo.
 * @version 1.0.0
 */

import { captcha } from './captcha'

export const newsletter = ( ) => {

	return ` 
<div class="content"><p>Subscribe to our newsletter!</p>
	<script type="text/javascript" src="//notification.pigeonposse.com/form/generate.js?id=1"></script>
	<form autocomplete="false" role="form" method="post" action="https://notification.pigeonposse.com/form/submit?formId=1" id="mauticform_suscripcionnewsletter" data-mautic-form="suscripcionnewsletter" enctype="multipart/form-data" pp-subscribe="">
	    
	    <input id="mauticform_input_suscripcionnewsletter_f_name" name="mauticform[f_name]" value="" class="mauticform-input" type="text" placeholder="First name">
	    <input id="mauticform_input_suscripcionnewsletter_last_name" name="mauticform[last_name]" value="" class="mauticform-input" type="text" placeholder="Last name">
	    <input id="mauticform_input_suscripcionnewsletter_email" name="mauticform[email]" value="" class="mauticform-input" type="email" placeholder="Mail">
	    ${captcha()}
	    <button type="submit" name="mauticform[submit]" id="mauticform_input_suscripcionnewsletter_submit" value="" class="mauticform-button btn btn-default">Submit</button>

	    <input type="hidden" name="mauticform[formId]" id="mauticform_suscripcionnewsletter_id" value="1">
	    <input type="hidden" name="mauticform[return]" id="mauticform_suscripcionnewsletter_return" value="">
	    <input type="hidden" name="mauticform[formName]" id="mauticform_suscripcionnewsletter_name" value="suscripcionnewsletter">

	</form>
</div>
	`

}

