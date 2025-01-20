/**
 * Todo.
 * @description Todo.
 * @version 1.0.0
 */

// import { Contributors } from './contributors'
import { Assets }  from './assets'
import { Funding } from './funding'
import { Members } from './members'
import { OrgData } from './orgData'
import { Repos }   from './repos'
import { Social }  from './social'

export const gh = async utils => {

	return {
		orgData : await new OrgData( utils ).get(),
		repos   : await new Repos( utils ).get(),
		assets  : await new Assets( utils ).get(),
		members : await new Members( utils ).get(),
		// 'contributors' : await new Contributors( utils ).get(),
		social  : await new Social( utils ).get(),
		funding : await new Funding( utils ).get(),
	}

}
