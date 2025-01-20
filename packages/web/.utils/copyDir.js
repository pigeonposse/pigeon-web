/**
 * Copies files from one directory to another.
 * Skips hidden files and handles missing files gracefully.
 */

import dotenv    from 'dotenv'
import {
	readdirSync,
	existsSync,
	mkdirSync,
	copyFileSync,
} from 'fs'
import { join } from 'path'

dotenv.config()

const projectPath = process.env.PNPM_SCRIPT_SRC_DIR

export const ensureDir = dirPath => {

	if ( !existsSync( dirPath ) ) {

		mkdirSync( dirPath, { recursive: true } )

	}

}

export const copyDir = ( srcDir, destDir, consoleLog = true ) => {

	try {

		const srcPath  = join( projectPath, srcDir )
		const destPath = join( projectPath, destDir )

		// Ensure the destination directory exists
		ensureDir( destPath )

		const files = readdirSync( srcPath )

		files.forEach( file => {

			if ( file.startsWith( '.' ) ) return // Skip hidden files

			const srcFilePath  = join( srcPath, file )
			const destFilePath = join( destPath, file )

			if ( existsSync( srcFilePath ) ) {

				try {

					copyFileSync( srcFilePath, destFilePath )
					if ( consoleLog ) {

						console.log( `[copy] ${file} copied successfully` )

					}

				}
				catch ( err ) {

					console.error( `[copy] Error copying ${file}:`, err )

				}

			}
			else {

				console.warn( `[copy] File not found: ${srcFilePath}` )

			}

		} )

	}
	catch ( err ) {

		console.error( `[copy] Error reading directory: ${srcDir}`, err )

	}

}
