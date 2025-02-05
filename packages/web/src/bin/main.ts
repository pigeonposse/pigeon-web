import { Core }      from './core'
import { createCLI } from './create'

import type { Config } from './types'

export const defineConfig = ( opt: Config ): Config => opt

export {
	createCLI,
	Core,
}

export type { Config }
