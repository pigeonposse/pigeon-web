import { defineConfig } from 'vitest/config'

/**
 * Vitest config.
 *
 * @description Vitest needs its own config: the SvelteKit plugin in
 * `vite.config.ts` requires a `RunnableDevEnvironment`, which Vitest does not
 * provide. Unit tests in this package do not need the SvelteKit plugin.
 */
export default defineConfig( {
	test : {
		include     : [ 'src/**/*.{test,spec}.{js,ts}' ],
		environment : 'node',
	},
} )
