import { argv } from 'node:process'

import { Argv } from './argv'
import { Core } from './core'
import {
	errorOut,
	helpOut,
	versionOut,
} from './print'

export const createCLI = async ( args = argv ): Promise<void> => {

	try {

		const cli = new Argv( args )

		const GENERAL_FLAG = {
			HELP    : cli.existsFlag( 'help' ) || cli.existsFlag( 'h' ),
			VERSION : cli.existsFlag( 'version' ) || cli.existsFlag( 'v' ),
			DEBUG   : cli.existsFlag( 'debug' ),
		}

		const CMD  = {
			DEV   : cli.existsCmd( 'dev' ),
			BUILD : cli.existsCmd( 'build' ),
			SERVE : cli.existsCmd( 'serve' ),
		}
		const FLAG = {
			PORT    : Number( cli.getFlagValue( 'port' ) || cli.getFlagValue( 'p' ) || 1312 ),
			API_URL : cli.getFlagValue( 'api' ),
			CONFIG  : cli.getFlagValue( 'config' ) || cli.getFlagValue( 'c' ),
			ASSETS  : cli.getFlagValue( 'assets' ),
			OUTPUT  : cli.getFlagValue( 'output' ) || cli.getFlagValue( 'o' ),
		}

		const core = new Core( {
			port   : FLAG.PORT,
			apiUrl : FLAG.API_URL,
			config : FLAG.CONFIG,
			debug  : GENERAL_FLAG.DEBUG,
			assets : FLAG.ASSETS,
			output : FLAG.OUTPUT,
		} )

		if ( GENERAL_FLAG.HELP ) console.log( helpOut() )
		else if ( GENERAL_FLAG.VERSION ) console.log( versionOut() )
		else if ( CMD.DEV ) await core.dev()
		else if ( CMD.SERVE ) await core.serve()
		else if ( CMD.BUILD ) await core.build()
		else console.error( helpOut() )

	}
	catch ( e ) {

		console.error( errorOut( e ) )

	}

}
