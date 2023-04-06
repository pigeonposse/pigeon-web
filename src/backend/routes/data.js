/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

export const data = async ( core, utils ) => {

	const apiV1 = await core.api.v1.getMain( utils )

	const keys = 'code, js, open-source, collective, developers'

	const assets = {
		footer : [
			'<script type="module" src="assets/main.js"></script>',
		],
		head : [
			'<link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.1.1/css/all.css?ver=81582bdb254a94e4464424087c6479a8" type="text/css" media="all">',
			'<link rel="stylesheet" href="assets/main.css" type="text/css" media="all">',
		],
	}

	return {
		pages : {
			index : {
				args : {
					// logo   : logo,
					// menu   : menu,
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
					assets : assets,
					meta   : {
						title       : 'PigeonPosse | Privacy Policy 🐦⚠️',
						description : '',
						keywords    : keys + ', privacy, policy',
					},
				},
			},
		},
		errorPage : {
			args : {
				// logo   : logo,
				// menu   : menu,
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
