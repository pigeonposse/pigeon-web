/**
 * Bundle config.
 *
 * @description Bundle config: esbuild.config.js.
 *
 * @see https://esbuild.github.io/api/
 */

import { execSync }   from 'child_process'
import { join }       from 'path'
import concurrently   from 'concurrently'
import esbuild        from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'

import { rm }      from './rm.js'
import { pkg }     from './getPkg.js'
import { copyDir } from './copyDir.js'

const projectPaths = pkg.data.extra.projectPath

rm( join( pkg.dir, projectPaths.dist.own ) )

const lint = ( )=> {

	let cmd 

	cmd = join( pkg.dir, projectPaths.src.own )
	cmd = 'eslint ' + cmd + ' --ext .js'

	console.log( '[lint CMD]: ' + cmd )

	return execSync( cmd, { stdio: 'inherit' } )

}

const builded = ( watch = false ) => {
	
	let builds, cmds, prop
	
	// if ( !watch ) lint()

	builds = [
		// FRONTEND
		{
			entryPoints : [ projectPaths.src.publicEntry ],
			bundle      : true,
			minify      : true,
			platform    : 'browser',
			outfile     : projectPaths.dist.publicOutput,
			plugins     : [ sassPlugin() ],
			format      : 'esm',
		},
		// BACKEND
		{
			entryPoints : [ projectPaths.src.entry ],
			bundle      : true,
			minify      : true,
			platform    : 'node',
			outfile     : projectPaths.dist.output,
			external    : Object.keys( pkg.data.dependencies ),
			format      : 'esm',
		},

	]

	cmds = []

	for ( prop in builds ) {
		
		if ( watch ) {

			cmds.push( 
				esbuild.build( {
					...builds[prop],
					watch : true,
				} ),
			)
		
		}else{

			cmds.push( esbuild.build( builds[prop] ) )
		
		}

		console.log( `[esbuild] ${watch ? 'watching' : 'Building'}... ${builds[prop].entryPoints}` )
	
	}

	return Promise.all( cmds )
		.then( () => {

			copyDir( projectPaths.src.images, projectPaths.dist.images )
		
		} )
		.catch( e => console.error( e ) )

}

const watch = async () => {
	
	await builded( true )
		.then( () => {

			let prop, cmds
			
			cmds = []
			
			for ( prop in projectPaths.src.scss ) {

				cmds.push( {
					name    : 'sass ' + prop,
					command : `sass --no-source-map --watch ${projectPaths.src.scss[prop]} ${projectPaths.dist.scss[prop]}`,
				} )
						
			}

			cmds.push( {
				name    : 'nodemon',
				command : 'NODE_ENV="development" nodemon ' + projectPaths.dist.output,
			} )	
			
			concurrently( cmds )

		} )
		.catch( e => console.error( e ) )
	
}

const run = async () => {

	try{

		if ( process.argv.includes( '--watch' ) ) {
	
			watch()

		}else {

			await builded()

		}

	}catch( e ){

		console.error( e )

	}

}
run()

