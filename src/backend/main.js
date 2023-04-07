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

const run = async () => {

	// process.setMaxListeners( 0 )
	// process.env.NODE_NO_WARNINGS = '1'

	dotenv.config()
	
	const ghApiTokenKey = pkg.data.extra.envs.ghToken.name
	console.log( ghApiTokenKey )
	if ( !ghApiTokenKey || !process.env[ghApiTokenKey] ) return console.error( 'Does not exist ENV $ghApiTokenKey' )
	
	const utilsWithExtra = {
		...utils,
		...{
			pkg,
			ghApiToken  : process.env[ghApiTokenKey],
			isDev       : process.env.NODE_ENV === 'development',
			port        : process.env.PORT || pkg.data.extra.devPort,
			apiAccepted : [
				'https://pigeonposse.com',
				'https://*.pigeonposse.com',
				'http://localhost',
			],
		},
	}	

	await routes( core, utilsWithExtra )

} 

try{

	run()

}catch( e ){

	console.error( e )

}
