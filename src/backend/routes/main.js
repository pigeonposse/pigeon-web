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

const app = express()

export const routes = ( args, utils ) => {

	/**
	 * VARS.
	 */
	let viewsPath, frontDir, imgDir, faviconPath, projectDir

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
			app.get( '/' + key, ( req, res ) => {

				res.render( 'pages/' + key, pageArgs )

			} )		
		
		} )

	}

	/**
	 * API.
	 */
	
	if ( args.api ) {

		app.set( 'json spaces', 2 )

		Object.keys( args.api ).forEach( key => {

			app.get( '/api/' + key, ( req, res ) => {

				if( utils.isDev || utils.apiAccepted.includes( req.get( 'host' ) ) ){
	
					res.json( args.api[key] )
				
				}else {

					res.status( 404 ).json( {
						message : 'You dont have access',
					} )
				
				}

			} )
		
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
