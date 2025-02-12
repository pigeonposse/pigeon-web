import { Checker } from '@collectium/check'
import config      from '@pigeonposse/api-config-2025'
import { cwd }     from 'process'

import {
	helpOut,
	versionOut,
} from './print'
import { Argv } from './process'

export default async ( args: string[] ) => {

	if ( !config.github ) throw Error( 'Github config does not exist' )

	const check = new Checker(  config  )
	const cli   = new Argv( args )

	const help    = cli.existsFlag( 'help' ) || cli.existsFlag( 'h' )
	const version =  cli.existsFlag( 'version' ) || cli.existsFlag( 'v' )

	if ( help ) console.log( helpOut() )
	else if ( version ) console.log( versionOut() )
	else
		await check.run( Object.keys( config.github )[0], { cwd: cli.getFlagValue( 'cwd' ) || cwd() } )

}

