import { buildSchema } from '@backan/builder'

import app from './dist/main.mjs'

buildSchema( {
	app,
	output : 'dist/openapi.json',
} )
