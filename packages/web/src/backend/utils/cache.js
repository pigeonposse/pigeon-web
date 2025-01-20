/**
 * Todo.
 * @description Todo.
 * @version 1.0.0
 */

import NodeCache from 'node-cache'

const cacheModule = new NodeCache()
const fiveMin     = 300
const set         = ( id, data, time = fiveMin ) => cacheModule.set( id, data, time )
const get         = id => cacheModule.get( id )

export const cache = {
	set,
	get,
}

