/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

import { GHData } from './super'

export class Social extends GHData {

	async getSocial() {

		let data

		data = '.github'
		data = await this.getGithubPigeonPosseContent( data )

		return data && data.social ? data.social : false
	
	}

	async set() {

		let res
		
		res = await this.getSocial()

		return res
	
	}

	async get(){

		return await this.set()
	
	}

}
