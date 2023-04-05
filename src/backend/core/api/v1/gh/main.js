/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

import { Repos } from './repos'
// import { Contributors } from './contributors'
import { Members } from './members'
import { Social }  from './social'
import { Funding } from './funding'
import { OrgData } from './orgData'

export const gh = async ( utils ) => {

	return {
		'orgData' : await new OrgData( utils ).get(),
		'repos'   : await new Repos( utils ).get(),
		'members' : await new Members( utils ).get(),
		// 'contributors' : await new Contributors( utils ).get(),
		'social'  : await new Social( utils ).get(),
		'funding' : await new Funding( utils ).get(),
	}

}
