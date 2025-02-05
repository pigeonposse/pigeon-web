
import { globby } from 'globby'
import {
	readdir,
	mkdir,
	rm,
	copyFile,
	writeFile,
	readFile,
}  from 'node:fs/promises'
import {
	dirname,
	join,
} from 'node:path'
import { fileURLToPath } from 'node:url'

export {
	writeFile,
	join,
	dirname,
}

export const getPathFromUrl = ( p:string ) => fileURLToPath( new URL( p ) )
export const getDirFromUrl = ( p:string ) => dirname( getPathFromUrl( p ) )
export const existsPath = async ( cwd: string ) => {

	try {

		const paths = await globby( [ '*' ], {
			onlyFiles : true,
			cwd,
		} )
		return paths.length > 0

	}
	catch ( _e ) {

		return false

	}

}

export const overridePaths = async ( cwd: string, output: string ) => {

	const paths = await globby( [ '*' ], {
		onlyFiles : true,
		cwd       : cwd,
	} )

	if ( paths.length === 0 ) return

	for ( const path in paths ) {

		const content = await readFile( join( cwd, path ) )

		await writeFile( join( output, path ), content )

	}

}

export const copyDir = async ( src: string | string[], output: string | string[] ) => {

	if ( Array.isArray( src ) ) src = join( ...src )
	if ( Array.isArray( output ) ) output = join( ...output )

	await rm( output, {
		recursive : true,
		force     : true,
	} )

	await mkdir( output, { recursive: true } )
	const entries = await readdir( src, { withFileTypes: true } )

	for ( const entry of entries ) {

		const srcPath    = join( src, entry.name )
		const outputPath = join( output, entry.name )

		if ( entry.isDirectory() ) await copyDir( srcPath, outputPath )
		else await copyFile( srcPath, outputPath )

	}

}

