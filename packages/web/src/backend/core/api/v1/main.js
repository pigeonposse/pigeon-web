/**
 * Todo.
 * @description Todo.
 * @version 1.0.0
 */

import { gh } from './gh/main'

const funct = async ( cb, utils ) => {

	return await cb( utils )

}

export const getMain = async utils => {

	return await funct( gh, utils )

}

export const getPages = async utils => {

	// return await funct( gh, utils )

}
