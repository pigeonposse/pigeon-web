import { Checker }  from '@collectium/check'
import config       from '@pigeonposse/api-config-2026'
import { Clippium } from 'clippium'
import { cwd }      from 'node:process'

import {
	data, formatter,
} from './data'

const cli = new Clippium(
	data,
	{ help: { formatter } },
)

cli.fn = async data => {

	if ( !config.github ) throw Error( 'Github config does not exist' )

	const check = new Checker( config )

	if ( data.flags.help )
		console.log( data.utils.getHelp(), '\n' )
	else if ( data.flags.version )
		console.log( data.utils.getVersion(), '\n' )
	else
		await check.run( Object.keys( config.github )[0], { cwd: data.flags.cwd || cwd() } )

}

export default cli
