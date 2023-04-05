/**
 * Bundle config.
 *
 * @description Bundle config: esbuild.config.js.
 *
 * @see https://esbuild.github.io/api/
 */

import { pkg }      from './getPkg.js'
import { execSync } from 'child_process'

const projectPaths = pkg.data.extra.projectPath

exec   = 'node ' + projectPaths.dist.output
output = execSync( exec, { stdio: 'inherit' } )
	
console.log( 'Exec: ' + exec )
console.log( output )
