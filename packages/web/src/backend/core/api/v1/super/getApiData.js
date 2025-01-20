/**
 * Todo.
 * @description Todo.
 * @version 1.0.0
 */

import { Data } from './data'

export class GetApiData extends Data {

	async fetch( url, args ) {

		try {

			let res

			res = await fetch( url, args )

			if ( res.status == 200 ) return res

			return false

		}
		catch ( error ) {

			return false

		}

	}

	async getGithubApiData( path ) {

		// const cachedResponse = this.utils.cache.get( 'repos' )
		// if ( cachedResponse ) {

		// 	return cachedResponse

		// }
		// cache.set('repos', this.utils.data, 300);

		return await this.fetch( this.ghApiUrl + path, { headers: { Authorization: `Bearer ${this.token}` } } )

	}

	async getGithubApiPublicData( path ) {

		return await this.fetch( this.ghApiUrl + path )

	}

	async getGithubRawData( path ) {

		return await this.fetch( this.ghRawUrl + path )

	}

	async getGithubOrgData( ) {

		let data, res

		data = await this.getGithubApiData( `orgs/${this.org}` )
		data = data ? await data.json() : false

		res = data ? this.utils.filterObject( data, ( key, value ) => this.orgDataAcceptedKeys.includes( key ) ) : false

		for ( const key in res ) {

			if ( key == 'url' && typeof res[key] === 'string' && res[key].startsWith( 'https://api.' ) ) res[key] = res[key].replace( 'api.', '' )

		}

		return res

	}

}
