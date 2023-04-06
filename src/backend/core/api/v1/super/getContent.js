/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

import { GetApiData } from './getApiData'

export class GetContent extends GetApiData {

	async getSharedVars( data, name ){

		let res
		
		res = {
			package  : false,
			composer : false,
			orgData  : false,
		}
		
		if ( !data ) return

		data.replace( /\{\{([\w.]+)\}\}/g, ( match, key ) => {

			if ( !res.package && key.startsWith( 'package' ) ) res.package = true
			if ( !res.composer && key.startsWith( 'composer' ) ) res.composer = true
			if ( !res.orgData && key.startsWith( 'orgData' ) ) res.orgData = true
		
		} )

		if ( res.package ) res.package = await this.getGithubRepoContent( name, 'package.json' ).then( d => JSON.parse( d ) )
		if ( res.composer ) res.composer = await this.getGithubRepoContent( name, 'composer.json' ).then( d => JSON.parse( d ) )
		if ( res.orgData ) res.orgData =  await this.getGithubOrgData()

		return res

	}

	async replaceSharedVars( data, name ){

		let sharedVars

		sharedVars = await this.getSharedVars( data, name )
		
		if ( !sharedVars ) return

		const result = data.replace( /\{\{([\w.]+)\}\}/g, ( match, key ) => {

			let shared, value, objKey

			objKey = false
			shared = false
			value  = false

			if ( key.startsWith( 'package' ) ) shared = sharedVars.package
			if ( key.startsWith( 'package.' ) ) objKey = key.replace( 'package.', '' )

			if ( key.startsWith( 'composer' ) ) shared = sharedVars.composer
			if ( key.startsWith( 'composer.' ) ) objKey = key.replace( 'composer.', '' )

			if ( key.startsWith( 'orgData' ) ) shared = sharedVars.orgData
			if ( key.startsWith( 'orgData.' ) ) objKey = key.replace( 'orgData.', '' )
				
			value = this.utils.getObjectValue( shared, objKey )

			return value ? value : false
		
		} )

		return result

	}

	async getPigeonPosseContentoObjs( repoName ){
		
		let data, fileName, getFile

		getFile = async ( name ) =>{
			
			let data, res

			res = false
			
			data = `repos/${this.org}/${name}/contents`
			data = await this.getGithubApiData( data )
			data = data ? await data.json() : false

			if ( !data ) return false

			data.forEach( obj => {

				this.files.forEach( file => {

					if ( obj.name == file ) res = file
				
				} )

			} )

			return res

		}
		
		fileName = await getFile( repoName )
		
		if ( !fileName ) return false

		data = await this.getGithubRepoContent( repoName, fileName )
		data = await this.replaceSharedVars( data, repoName )

		if ( fileName.endsWith( '.yml' ) || fileName.endsWith( '.yaml' ) ) {

			return data ? this.utils.yaml.load( data ) : false
		
		}

		if ( fileName.endsWith( '.json' ) ) {

			return data ? await JSON.parse( data ) : false

		}

	}
	
	async getGithubPigeonPosseContent( repoName ){
		
		let data

		data = await this.getPigeonPosseContentoObjs( repoName )
		data = await this.utils.replaceUrls( data )
		
		return data
	
	}
	
	textDecoder( content ){

		let data, decoder
		
		decoder = new TextDecoder()
		data    = Uint8Array.from( atob( content ), c => c.charCodeAt( 0 ) )
		data    = decoder.decode( data )
		
		return data
	
	}

	async getGithubRepoContent( repoName, fileName ){
		
		let data
		
		data = `repos/${this.org}/${repoName}/contents/${fileName}`
		data = await this.getGithubApiData( data )
		data = data ? await data.json() : false
		data = data ? await this.textDecoder( data.content ) : false
		
		return data
	
	}

}
