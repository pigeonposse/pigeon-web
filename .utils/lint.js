/**
 * Todo.
 *
 * @description Todo.
 */

import { execSync } from 'child_process'
import { pkg }      from './getPkg.js'
import { join }     from 'path'

const projectPaths = pkg.data.extra.projectPath

const eslint = ( fix = false )=> {

	let cmd

	cmd = join( pkg.dir, projectPaths.src.own )

	cmd = `eslint ${cmd} --ext .js ${ fix ? ' --fix' : '' }`

	console.log( `[${fix ? 'LINT FIX ' : 'LINT'} CMD]: ${cmd}` )

	return execSync( cmd, { stdio: 'inherit' } )

}

try{

	if ( process.argv.includes( '--fix' ) ) {

		eslint( true )

	}else{

		eslint()

	}

}catch( e ){

	console.error( e )

}
