/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

import { join } from 'path'
import express  from 'express'
import favicon  from 'serve-favicon'
import { data } from './data'

const app = express()

export const routes = async ( core, utils ) => {

	/**
	 * VARS.
	 */
	let args, viewsPath, frontDir, imgDir, faviconPath, projectDir, minute
	
	minute = 60000
	args   = await data( core, utils )
	
	projectDir  = utils.pkg.data.extra.projectPath.dist
	viewsPath   = join( utils.pkg.dir, utils.pkg.data.extra.projectPath.src.views )
	frontDir    = join( utils.pkg.dir, projectDir.public )
	imgDir      = join( utils.pkg.dir, projectDir.images )
	faviconPath = join( imgDir, 'favicon.ico' ) 

	/**
	 * VIEWS.
	 */

	app.set( 'view engine', 'ejs' )
	app.set( 'views', viewsPath )

	/**
	 * ASSETS.
	 */
	app.use( favicon( faviconPath ) )
	app.use( '/assets', express.static( imgDir ) )
	app.use( '/assets', express.static( frontDir ) )
	app.use( '/', express.static( join( utils.pkg.dir, 'data/public' ) ) )

	/**
	 * PAGES.
	 */
	if ( args.pages ) {

		Object.keys( args.pages ).forEach( key => {

			let pageArgs = args.pages[key] && args.pages[key].args ? args.pages[key].args : {}
			
			/**
			 * INDEX.
			 */
			if ( key == 'index' ) {

				app.get( '/', ( req, res ) => {

					res.render( 'pages/index', pageArgs )
				
				} )

			}

			/**
			 * Others.
			 */
			// app.get( '/' + key, ( req, res ) => {

			// 	res.render( 'pages/' + key, pageArgs )

			// } )	
	
		} )

	}

	/**
	 * API.
	 *
	 */

	const createMDRoutes = ( pages, parentPath = '/' ) =>{

		for ( const [ key, value ] of Object.entries( pages ) ) {

			const fullPath = join( parentPath, key )
			
			if ( typeof value === 'object' ) {

				createMDRoutes( value, fullPath )
			
			} else {

				app.get( fullPath, ( req, res ) => {

					let pageArgs = {
						...args.mdPages.args,
						...{ 
							id   : fullPath.replace( /\//g, ' ' ),
							html : value, 
						},
					}

					res.render( 'pages/mdPages', pageArgs )
				
				} )
			
			}
		
		}
	
	}

	if ( args.mdPages && args.mdPages.content ) {

		if ( Object.keys( args.mdPages.content ).length > 0 ) {

			createMDRoutes( args.mdPages.content )
			
			// setInterval( async () => {

			// 	args.mdPages.content = await core.pages.mdPages( utils )

			// }, minute )

		}
	
	}

	/**
	 * API.
	 */
	
	if ( args.api ) {

		app.set( 'json spaces', 2 )

		Object.keys( args.api ).forEach( key => {

			app.get( '/api/' + key, async ( req, res ) => {

				res.set( 'Access-Control-Allow-Origin', utils.apiAccepted )
				res.json( args.api[key] )
				
			} )

			setInterval( async () => {

				args.api[key] = await core.api[key].getMain( utils )

			}, minute )

		} )

	}

	/**
	 * ERROR PAGES.
	 */
	app.get( '*', ( req, res ) => {

		let pageArgs

		pageArgs = args.errorPage && args.errorPage.args ? args.errorPage.args : {}
		
		res.status( 404 ).render( 'pages/error', pageArgs )

	} )

	/**
	 * PORT SECTION.
	 */
	if ( utils.port ) {

		app.listen( utils.port, () => {

			console.log( 'Server started on port ' + utils.port )

		} )
	
	}else {

		console.error( 'Port not exist' )
	
	}

}
