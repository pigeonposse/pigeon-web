/**
 * Bundle config.
 *
 * @description Bundle config: esbuild.config.js.
 *
 * @see https://esbuild.github.io/api/
 */

import { execSync } from 'child_process'
import { join }     from 'path'
import { pkg }      from './getPkg.js'
import { introMsg } from './introMsg.js'

const projectPaths = pkg.data.extra.projectPath

const run = () => {

	let exec 

	exec  = 'node ' + join( pkg.dir, '.utils', 'build.js' ) + ' --no-console'
	exec += ' && '
	exec += 'node ' + join( pkg.dir, projectPaths.dist.output )
	
	// console.log( 'Exec: ' + exec )
	
	console.log( introMsg( pkg.data.version, pkg.data.repository.url ) )
	
	execSync( exec, { stdio: 'inherit' } )

}

try{

	run()

}catch( e ){

	console.error( e )

}
