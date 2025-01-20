/**
 * Todo.
 * @description Todo.
 * @version 1.0.0
 */
import { GHData } from './super'

export class Repos extends GHData {

	async getRepos( ) {

		let data

		data = `orgs/${this.org}/repos`
		data = await this.getGithubApiData( data )
		data = data ? await data.json() : false

		if ( !data ) return false

		return data.map( value => value.name ).filter( Boolean )

	}

	async set() {

		let names, res

		names = await this.getRepos()
		res   = {}

		if ( !names ) return

		names.forEach( async name => {

			let data

			if ( name == '.github' ) return

			data = await this.getGithubPigeonPosseContent( name )

			if ( data ) res[name] = data

		} )

		return res

	}

	async get() {

		return await this.set()

	}

}

