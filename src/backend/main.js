/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

// import favicon    from 'serve-favicon'
import dotenv     from 'dotenv'
import * as core  from './core/main'
import { routes } from './routes/main'
import * as utils from './utils/main'
import { pkg }    from '../../.utils/getPkg'

( async () => {

	dotenv.config()

	const utilsWithExtra = {
		...utils,
		...{
			pkg,
			ghApiToken  : process.env.GH_API_TOKEN,
			isDev       : process.env.NODE_ENV === 'development',
			port        : process.env.PORT || pkg.data.extra.devPort,
			apiAccepted : [
				'https://pigeonposse.com',
				'https://*.pigeonposse.com',
				'http://localhost',
			],
		},
	}	

	// let request          = async () => console.log( await core.api.v1.getMain( utilsWithExtra ) )
	// setInterval( request, 6000 )

	// await routes( core, utilsWithExtra )

	// let request = async () => await routes( core, utilsWithExtra )
	
	await routes( core, utilsWithExtra )

} )()
