/**
 * Playwright config.
 *
 * @description Playwright config.
 * @see https://playwright.dev/docs/api/class-testconfig
 */
import { defineConfig } from '@playwright/test'

const port = 1312

export default defineConfig( {
	webServer : {
		command : `pnpm dev --port ${port}`,
		port,
	},
	testDir   : 'tests',
	testMatch : /(.+\.)?(test|spec)\.[jt]s/,
} )
