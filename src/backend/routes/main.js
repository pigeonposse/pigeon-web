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
	let args, viewsPath, frontDir, imgDir, faviconPath, projectDir

	args = await data( core, utils )
	
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

			/**
			 * INDEX.
			 */
			if ( key == 'index' ) {

				app.get( '/', async ( req, res ) => {
					
					let pageArgs 
					
					pageArgs = await data( core, utils )
					pageArgs = pageArgs && pageArgs.pages && pageArgs.pages[key] && pageArgs.pages[key].args ? pageArgs.pages[key].args : {}

					res.render( 'pages/index', pageArgs )
				
				} )

			}

			/**
			 * Others.
			 */
			app.get( '/' + key, async ( req, res ) => {

				let pageArgs 
					
				pageArgs = await data( core, utils )
				pageArgs = pageArgs && pageArgs.pages && pageArgs.pages[key] && pageArgs.pages[key].args ? pageArgs.pages[key].args : {}

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

			app.get( '/api/' + key, async ( req, res ) => {

				let pageArgs 
					
				pageArgs = await data( core, utils )
				pageArgs = pageArgs && pageArgs.api && pageArgs.api[key] ? pageArgs.api[key] : {}

				res.set( 'Access-Control-Allow-Origin', utils.apiAccepted )

				res.json( pageArgs )

				// if( 
				// 	utils.isDev || 
				// 	utils.apiAccepted.includes( req.get( 'host' ) ) 
				// ){
	
				// 	res.json( args.api[key] )
				
				// }else {

				// 	res.status( 404 ).json( {
				// 		message : 'You dont have access',
				// 	} )
				
				// }

			} )
		
		} )

	}

	/**
	 * ERROR PAGES.
	 */
	app.get( '*', async ( req, res ) => {

		let pageArgs 
			
		pageArgs = await data( core, utils )
		pageArgs = pageArgs.errorPage && pageArgs.errorPage.args ? pageArgs.errorPage.args : {}
		
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
