/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

import fs   from 'fs/promises'
import path from 'path'

const convertPagesToHtml = async ( dirPath, utils ) => {

	const htmlPages = {}
	const fileNames = await fs.readdir( dirPath )
	for ( const fileName of fileNames ) {

		const filePath = path.join( dirPath, fileName )
		const stats    = await fs.stat( filePath )
		if ( stats.isDirectory() ) {

			const dirPages = await convertPagesToHtml( filePath, utils )
			Object.assign( htmlPages, { [fileName]: dirPages } )
		
		} else if ( stats.isFile() && path.extname( filePath ) === '.md' ) {

			const fileContents = await fs.readFile( filePath, 'utf-8' )
			const htmlContents = utils.md.toHtml( fileContents )
			const pageName     = path.basename( filePath, '.md' )
			Object.assign( htmlPages, { [pageName]: htmlContents } )
		
		}
	
	}
	return htmlPages

}

export const mdPages = async ( utils ) => {

	const pagesDir = path.join( utils.pkg.dir, 'data','pages' )

	return await convertPagesToHtml( pagesDir, utils )

}
