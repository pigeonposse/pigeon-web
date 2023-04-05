/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

export class Data{

	org = 'pigeonposse'
	files = [ '.pigeonposse.yml', '.pigeonposse.yaml', '.pigeonposse.json' ]
	ghApiUrl = 'https://api.github.com/'
	ghRawUrl = 'https://raw.githubusercontent.com/'
	branch = 'main'
	orgDataAcceptedKeys = [
		'login',
		'url',
		'avatar_url',
		'description',
		'name',
		'blog',
		'location',
		'email',
		// 'repos_url',
		// 'events_url',
		// 'hooks_url',
		// 'issues_url',
		// 'members_url',
		// 'followers',
		// 'following',
	]

	constructor( utils ){

		this.utils = utils
		this.token = utils.ghApiToken
	
	}

}
