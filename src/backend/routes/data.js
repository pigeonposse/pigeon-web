/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

export const data = async ( core, utils ) => {

	const apiV1   = await core.api.v1.getMain( utils )
	const mdPages = await core.pages.mdPages( utils )

	const keys = 'code, js, open-source, collective, developers, pigeonposse'

	const assets = {
		footer : [
			'<script type="module" src="/assets/main.js"></script>',
		],
		head : [
			'<link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.1.1/css/all.css?ver=81582bdb254a94e4464424087c6479a8" type="text/css" media="all">',
			'<link rel="stylesheet" href="/assets/main.css" type="text/css" media="all">',
			`<script>
			  var _paq = window._paq = window._paq || [];
			  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
			  _paq.push(['trackPageView']);
			  _paq.push(['enableLinkTracking']);
			  (function() {
			    var u="//analytics.pigeonposse.com/";
			    _paq.push(['setTrackerUrl', u+'matomo.php']);
			    _paq.push(['setSiteId', '1']);
			    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
			    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
			  })();
			</script>`,
			'<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>',
		],
	}
	const mark   = `<!--
${utils.mark}
-->`
	return {
		pages : {
			index : {
				args : {
					mark   : mark,
					assets : assets,
					meta   : {
						title       : 'PigeonPosse | Official site 🐦🌈',
						description : '',
						keywords    : keys,
					},
				},
			},			
			policy : {
				args : {
					// logo   : logo,
					// menu   : menu,
					mark   : mark,
					assets : assets,
					meta   : {
						title       : 'PigeonPosse | Privacy Policy 🐦🍪',
						description : '',
						keywords    : keys + ', privacy, policy',
					},
				},
			},
		},
		mdPages : {
			args : {
				mark   : mark,
				assets : assets,
				meta   : {
					title       : 'PigeonPosse | Page 🐦🌈',
					description : '',
					keywords    : keys + ', pages',
				},
			},
			content : mdPages,
		},
		errorPage : {
			args : {
				// logo   : logo,
				// menu   : menu,
				mark   : mark,
				assets : assets,
				meta   : {
					title       : 'PigeonPosse | 404 error 🐦❌',
					description : '404 Error. Page not found',
					keywords    : keys + ', error, 404',
				},
			},
		},
		api : {
			v1 : apiV1,
		},
	}

}
