/**
 * Todo.
 *
 * @description Todo.
 */

import { execSync } from 'child_process'
import { pkg }      from './getPkg.js'
import { join }     from 'path'

const projectPaths = pkg.data.extra.projectPath

const deploy = ( )=> {

	let cmd

	cmd = join( pkg.dir, projectPaths.dist.build )

	cmd = `pnpm wrangler login && pnpm build && pnpm wrangler pages publish ${cmd}`

	console.log( `[DELPOY]: ${cmd}` )

	return execSync( cmd, { stdio: 'inherit' } )

}

try{

	deploy()

}catch( e ){

	console.error( e )

}
