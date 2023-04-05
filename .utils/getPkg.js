/**
 * Package function.
 *
 * @description Get package.json data, path or dir.
 */

import { readFileSync } from 'fs'
import { join }         from 'path'
import * as url         from 'url'
import dotenv           from 'dotenv'

dotenv.config()

export const pkgFunct = ( ) => {

	const json = ( path ) => JSON.parse( readFileSync( path ) )

	const projectPath = process.env.PNPM_SCRIPT_SRC_DIR

	const pkgPath = join( projectPath, 'package.json' )
	const pkgData = json( pkgPath )

	return {
		path : pkgPath,
		dir  : projectPath,
		data : pkgData,
	}

}

export const pkg = pkgFunct()
