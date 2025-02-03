import createApp from '@collectium/api/standard'

import collectium           from './instance'
import { setNotifications } from './utils'

export type AppStandardRes = ReturnType<typeof createApp>
export const appStandard = (): AppStandardRes => {

	setNotifications()
	return createApp( { collectium } )

}

export default appStandard
