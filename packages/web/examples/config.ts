import { defineConfig } from '../dist/bin/main.mjs'

export default defineConfig( {
	scripts : [
		[
			'script',
			{ id: 'hola' },
			'globalThis.HOLA = "Hola que tal";',
		],
	],
	title : 'ejemplo de:',
} )
