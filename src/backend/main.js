/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

// import favicon    from 'serve-favicon'
import dotenv       from 'dotenv'
import * as core    from './core/main'
import { routes }   from './routes/main'
import * as utils   from './utils/main'
import { pkg }      from '../../.utils/getPkg'
import { introMsg } from '../../.utils/introMsg'

const run = async () => {

	dotenv.config()
	
	const ghApiTokenKey = pkg.data.extra.envs.ghToken.name
	const port          = process.env.PORT || pkg.data.extra.devPort 
	const mark          = introMsg() || false
	
	if ( !ghApiTokenKey || !process.env[ghApiTokenKey] ) return console.error( `❌ Does not exist ENV ${ghApiTokenKey}` )
	if ( !port ) return console.error( `❌ Does not exist listen post: value ${port}` )
	
	const utilsWithExtra = {
		...utils,
		...{
			pkg,
			ghApiToken  : process.env[ghApiTokenKey],
			isDev       : process.env.NODE_ENV === 'development',
			port        : port,
			mark        : mark,
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
