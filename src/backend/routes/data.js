/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

export const data = async ( core, utils ) => {

	const apiV1 = await core.api.v1.getMain( utils )

	const keys = 'code, js, opem-source, collective, developers'
	const logo = {
		url    : apiV1.orgData.avatar_url,
		alt    : apiV1.orgData.name,
		height : '80px',
	}

	const menu = [
		{
			id   : 'home',
			name : 'Home',
			type : 'url',
			url  : '/',
		},
		{
			id   : 'donate',
			name : 'Donate',
			type : 'popup',
		},
		{
			id   : 'about',
			name : 'About',
			type : 'popup',
		},
		{
			id          : 'github',
			name        : '',
			type        : 'url',
			url         : apiV1.orgData.url,
			iconClasses : 'fa-brands fa-github',
		},
	]

	const assets = {
		footer : [
			// '<script src="assets/banda.js"></script>',
			// '<link rel="stylesheet" href="assets/banda.css" type="text/css" media="all">',
			'<script type="module" src="assets/main.js"></script>',
		],
		head : [
			'<link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.1.1/css/all.css?ver=81582bdb254a94e4464424087c6479a8" type="text/css" media="all">',
			'<link rel="stylesheet" href="assets/main.css" type="text/css" media="all">',
		],
	}
	
	const footerFunct = () => {

		let res = []

		Object.keys( apiV1.social ).forEach( k => {

			let v = apiV1.social[k]
		
			res.push( {
				id          : k,
				name        : '',
				url         : v.url,
				type        : 'url',
				iconClasses : ( k == 'email' ? 'fa-solid fa-envelope' : 'fa-brands' + ' fa-' + k ),
			} )
	
		} )

		return res.concat( [
			{
				id          : 'github',
				name        : '',
				type        : 'url',
				url         : apiV1.orgData.url,
				iconClasses : 'fa-brands fa-github',
			},
			{
				id          : 'donate',
				name        : '',
				type        : 'popup',
				iconClasses : 'fa-solid fa-hand-holding-dollar',
			},
			{
				id          : 'share',
				name        : '',
				type        : 'popup',
				iconClasses : 'fa-solid fa-paper-plane',
			},
			{
				id          : 'more',
				name        : '',
				type        : 'popup',
				iconClasses : 'fa-solid fa-circle-info',
			},
		] )

	}

	const footerMsg = [
		`With ♥️ by ${apiV1.orgData.name}`,
		`v${utils.pkg.data.version}`, 
	]

	const footer = footerFunct()

	const sections = await core.sections( apiV1.repos, utils )

	return {
		pages : {
			index : {
				args : {
					logo      : logo,
					menu      : menu,
					footer    : footer,
					footerMsg : footerMsg,
					assets    : assets,
					meta      : {
						title       : 'PigeonPosse | Official site 🐦🌈',
						description : '',
						keywords    : keys,
					},
					sections : sections,
				},
			},			
			policy : {
				args : {
					logo      : logo,
					menu      : menu,
					footer    : footer,
					footerMsg : footerMsg,
					assets    : assets,
					meta      : {
						title       : 'PigeonPosse | Privacy Policy 🐦⚠️',
						description : '',
						keywords    : keys + ', privacy, policy',
					},
				},
			},
		},
		errorPage : {
			args : {
				logo      : logo,
				menu      : menu,
				footer    : footer,
				footerMsg : footerMsg,
				assets    : assets,
				meta      : {
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
