import { defineConfig } from '@playwright/test'

const port = 4173

export default defineConfig( {
	webServer : {
		command : `vite preview --port ${port}`,
		port    : port,
	},
	testDir : 'tests',
} )
