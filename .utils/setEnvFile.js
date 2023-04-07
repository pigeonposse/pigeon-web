/**
 * Todo.
 *
 * @description Todo.
 */

import { writeFileSync, existsSync } from 'fs'
import { join }                      from 'path'
import { pkg }                       from './getPkg.js'

const envsObj = pkg.data.extra.envs

const content = `########################## PIGEONPOSSE .ENV #########################

${envsObj.ghToken.name}=${envsObj.ghToken.defaultValue}

# ${envsObj.containerName.name}=${envsObj.containerName.defaultValue}
# ${envsObj.containerPort.name}=${envsObj.containerPort.defaultValue}

########################## PIGEONPOSSE .ENV #########################`

const setEnv = () => {

	let file = join( pkg.dir, '.env' )
	
	if ( !existsSync( file ) ) {

		writeFileSync( file, content, 'utf-8' )
	
	}else {

		console.log( '❌📂 FILE ALREADY EXIST' )
	
	}

}

setEnv()
