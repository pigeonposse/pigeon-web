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
import open           from 'open'

import { rm }             from './rm.js'
import { pkg }            from './getPkg.js'
import { copyDir }        from './copyDir.js'
import { setDockerFiles } from './setDockerFiles.js'

const projectPaths = pkg.data.extra.projectPath
const isTest       = process.argv.includes( '--test' )
const isWatch      = process.argv.includes( '--watch' )
const isMinify     = !process.argv.includes( '--no-minify' )
const isConsole    = !process.argv.includes( '--no-console' )

rm( join( pkg.dir, projectPaths.dist.own ), isConsole )

const lint = ( )=> {

	let cmd 

	cmd = join( pkg.dir, projectPaths.src.own )
	cmd = 'eslint ' + cmd + ' --ext .js'

	if ( isConsole ) console.log( '[lint CMD]: ' + cmd )

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
			minify      : isMinify,
			platform    : 'browser',
			outfile     : projectPaths.dist.publicOutput,
			plugins     : [ sassPlugin() ],
			format      : 'esm',
		},
		// BACKEND
		{
			entryPoints : [ projectPaths.src.entry ],
			bundle      : true,
			minify      : isMinify,
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

		if ( isConsole ) console.log( `[esbuild] ${watch ? 'watching' : 'Building'}... ${builds[prop].entryPoints}` )
	
	}

	return Promise.all( cmds )
		.then( () => {

			copyDir( projectPaths.src.images, projectPaths.dist.images, isConsole )
			
		} )
		.then( () => setDockerFiles() )
		.catch( e => console.error( e ) )

}

const watch = async () => {
	
	await builded( true )
		.then( () => {

			let prop, cmds, devEnv
			
			devEnv = isTest ? '' : 'NODE_ENV="development" '
			cmds   = []
			
			for ( prop in projectPaths.src.scss ) {

				cmds.push( {
					name    : 'sass ' + prop,
					command : `sass --no-source-map --watch ${projectPaths.src.scss[prop]} ${projectPaths.dist.scss[prop]}`,
				} )
						
			}

			cmds.push( {
				name    : 'nodemon',
				command : devEnv + 'nodemon ' + projectPaths.dist.output,
			} )	
			
			concurrently( cmds )

		} )
		.then( () => open( 'http://localhost:' + pkg.data.extra.devPort ) )
		.catch( e => console.error( e ) )
	
}

const run = async () => {

	try{

		if ( isWatch ) {
	
			watch()

		}else {

			await builded()

		}

	}catch( e ){

		console.error( e )

	}

}
run()

