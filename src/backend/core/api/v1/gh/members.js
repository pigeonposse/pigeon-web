/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

import { GHData } from './super'

export class Members extends GHData {
	
	async getTeams(){

		let data, res
		
		data = `orgs/${this.org}/teams`
		data = await this.getGithubApiData( data )
		data = data ? await data.json() : false

		res = data.map( value => {

			return {
				id          : value.id,
				name        : value.name,
				slug        : value.slug,
				description : value.description,
			}
		
		} )

		return res
	
	}

	async getMembers(){
		
		let teams, res

		teams = await this.getTeams()

		res = await Promise.all(
			teams.map( async team => {

				let data, members

				data = await this.getGithubApiData( `teams/${team.id}/members` ).then( d => d.json() )
				
				members = await Promise.all(
					data.map( async member => {

						let userInfo

						userInfo = await this.getGithubApiData( `users/${member.login}` ).then( d => d.json() )
					
						return {
							// id       : userInfo.id,
							login    : userInfo.login,
							name     : userInfo.name,
							desc     : userInfo.bio,
							blog     : userInfo.blog,
							location : userInfo.location,
							avatar   : userInfo.avatar_url,
							github   : userInfo.html_url,
						}
				
					} ),
				)

				team.members = members
				
				delete team.id

				return team
			
			} ),
		)

		return res

	}

	async set() {
		
		let res
		
		res = await this.getMembers()

		return res
	
	}

	async get(){

		return await this.set()
	
	}

}
