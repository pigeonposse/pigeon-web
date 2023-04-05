/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

import { gh } from './gh/main'

const funct = async ( cb, utils ) => {

	let minute 

	minute = 60000

	if ( process.env.NODE_ENV === 'development' ) return await cb( utils )

	return setInterval( async () => await cb( utils ), minute )

}

export const getMain = async ( utils ) => {

	return await funct( gh, utils )

}

export const getPages = async ( utils ) => {
	
	// return await funct( gh, utils )

}
