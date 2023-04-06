/**
 * Todo.
 *
 * @description Todo.
 */

import { readdirSync, existsSync, copyFileSync } from 'fs'
import { join }                                  from 'path'
import dotenv                                    from 'dotenv'

dotenv.config()

const projectPath = process.env.PNPM_SCRIPT_SRC_DIR

export const copyDir = ( srcDir, destDir, consoleLog = true ) => {

	const files = readdirSync( join( projectPath, srcDir ) )

	files.forEach( file => {

		if ( file.startsWith( '.' ) ) return

		const srcFilePath  = join( projectPath, srcDir, file )
		const destFilePath = join( projectPath, destDir, file )

		if ( existsSync( srcFilePath ) ) {

			try {

				copyFileSync( srcFilePath, destFilePath )
				if (consoleLog) console.log( `[copy] ${file} copied successfully` )
			
			} catch ( err ) {

				console.error( `[copy] Error copying ${file}:`, err )
			
			}
		
		}
	
	} )

}
