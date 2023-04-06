/**
 * Todo.
 *
 * @description Todo.
 */

import { rmdirSync, existsSync } from 'fs'
import rimrafSync                from 'rimraf'

export const rm = ( path, consoleLog = true ) =>{

	try {

		if ( !existsSync( path ) ) return
		
		rmdirSync( path, { recursive: true } )
		rimrafSync.sync( path )
		
		if ( consoleLog ) console.log( `[rm] Folder ${path} removed successfully.` )
	
	} catch ( error ) {

		console.error( `[rm] Error removing folder ${path}:`, error )
	
	}

}
