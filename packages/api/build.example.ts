import { writeFile } from 'node:fs/promises'
import { join }      from 'node:path'
import {
	cwd,
	exit,
} from 'node:process'

import collectium from './src/instance'

if ( !collectium.opts.github?.['pigeonposse'].token ) exit()

const data = await collectium.get()
const out  = join( cwd(), './dist/openapi-example-response.json' )

await writeFile(
	out,
	JSON.stringify( data, undefined, '\t' ),
)

console.log( `Builded example at: ${out}` )
