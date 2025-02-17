import {
	name,
	description,
	bin,
	version,
	homepage,
} from '../package.json'

export {
	description,
	version,
}

export const BIN_NAME = typeof bin === 'string' ? name : Object.keys( bin )[0]
export const HELP_URL = homepage

