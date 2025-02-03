import createApp from '@collectium/api/local'

import { ENV }              from './env'
import collectium           from './instance'
import { setNotifications } from './utils'

export type AppLocalRes = ReturnType<typeof createApp>
export const appLocal = (): AppLocalRes => {

	setNotifications()

	return createApp( {
		collectium,
		opts : { path: ENV.API_STORE_PATH },
	} )

}
export default appLocal
