/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

export const captcha = ( )=>{
	
	return `
    <div class="cf-turnstile" data-theme="dark" data-sitekey="0x4AAAAAAAB-AYfWgQnFmqYa" style="margin-top: 20px;">
    	<iframe src="https://challenges.cloudflare.com/cdn-cgi/challenge-platform/h/g/turnstile/if/ov2/av0/swj9g/0x4AAAAAAAB-AYfWgQnFmqYa/dark/normal" allow="cross-origin-isolated" id="cf-chl-widget-swj9g" tabindex="0" title="Widget containing a Cloudflare security challenge" style="border: none; overflow: hidden; width: 300px; height: 65px;"></iframe>
    	<input type="hidden" name="cf-turnstile-response" id="cf-chl-widget-swj9g_response" value="">
    </div>
	`

}

