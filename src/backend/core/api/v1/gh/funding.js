/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

import { GHData } from './super'

export class Funding extends GHData {

	async getContent() {

		let data

		data = '.github'
		data = await this.getGithubPigeonPosseContent( data )

		return data && data.funding ? data.funding : false
	
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
