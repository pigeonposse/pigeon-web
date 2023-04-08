/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

import { GHData } from './super'

export class Assets extends GHData {

	async getContent() {

		let data

		data = '.github'
		data = await this.getGithubPigeonPosseContent( data )

		return data && data.assets ? data.assets : false
	
	}

	async set() {

		let res
		
		res = await this.getContent()

		return res
	
	}

	async get(){

		return await this.set()
	
	}

}
