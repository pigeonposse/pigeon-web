import { defineConfig } from '@playwright/test'

const port = 4173

export default defineConfig( {
	webServer : {
		command : `pnpm preview --port ${port}`,
		port    : port
		,
	},
	testDir : 'tests',
} )
