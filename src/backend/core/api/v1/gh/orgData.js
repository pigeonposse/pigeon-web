/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

import { GHData } from './super'

export class OrgData extends GHData {

	async getPigeonPosseContent() {

		let data

		data = '.github'
		data = await this.getGithubPigeonPosseContent( data )

		return data && data.about ? data.about : false
	
	}

	async set() {

		let res
		
		res = {
			...await this.getGithubOrgData(),
			...await this.getPigeonPosseContent(),
		}

		return res
	
	}

	async get(){

		return await this.set()
	
	}

}

