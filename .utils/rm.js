/**
 * Todo.
 *
 * @description Todo.
 */

import { rmSync, existsSync } from 'fs'

export const rm = ( path, consoleLog = true ) =>{

	try {

		if ( !existsSync( path ) ) return
		
		rmSync( path, { recursive: true } )
		
		if ( consoleLog ) console.log( `[rm] Folder ${path} removed successfully.` )
	
	} catch ( error ) {

		console.error( `[rm] Error removing folder ${path}:`, error )
	
	}

}
