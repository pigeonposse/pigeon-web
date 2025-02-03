import build from '@collectium/builder'

import collectium from './src/instance'
import app        from './src/main'

await build( {
	api    : { input: app() },
	schema : { input: collectium },
	output : 'dist',
} )
