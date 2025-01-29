import createApp from '@collectium/api/local'

import collectium from './instance'

export const app = createApp( {
	collectium,
	opts : { path: globalThis.process.env.APP_STORE_PATH || 'build/store/pigeonposse-web.json' },
} )

export default app
