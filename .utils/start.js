/**
 * Bundle config.
 *
 * @description Bundle config: esbuild.config.js.
 *
 * @see https://esbuild.github.io/api/
 */

import { pkg }      from './getPkg.js'
import { execSync } from 'child_process'
import { join }     from 'path'

const projectPaths = pkg.data.extra.projectPath

const run = () => {

	let exec 

	exec = 'node ' + join( pkg.dir, '.utils', 'build.js' ) + ' && '
	exec = exec + 'node ' + join( pkg.dir, projectPaths.dist.output )
	
	console.log( 'Exec: ' + exec )

	execSync( exec, { stdio: 'inherit' } )

}

try{

	run()

}catch( e ){

	console.error( e )

}
