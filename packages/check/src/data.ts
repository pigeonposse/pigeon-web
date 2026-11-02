import color                         from '@clippium/color'
import { formatter as setFormatter } from '@clippium/preset-colored'
import { defineData }                from 'clippium'

import {
	name,
	description,
	bin,
	version,
	homepage,
} from '../package.json'

const BIN_NAME = typeof bin === 'string' ? name : Object.keys( bin )[0]
const HELP_URL = homepage

const GENERAL_FLAGS = 'General flags:'

export const data = defineData( {
	name  : BIN_NAME,
	version,
	desc  : description,
	flags : {
		cwd : {
			desc : 'Current working dir. Used in check command',
			type : 'string',
		},
		help : {
			desc  : 'Print Help',
			alias : [ 'h' ],
			group : GENERAL_FLAGS,
			type  : 'boolean',
		},
		version : {
			desc  : 'Print Version',
			alias : [ 'v' ],
			group : GENERAL_FLAGS,
			type  : 'boolean',
		},
	},
	more : HELP_URL,
} )

export const formatter = setFormatter( {
	title         : color.cyan.inverse.bold,
	bin           : color.cyan,
	version       : color.cyan.dim.italic,
	name          : color.bold,
	positionals   : color.green.dim,
	commands      : color.green,
	flags         : color.yellow,
	desc          : color.white.dim,
	examples      : color.cyan,
	sectionTitle  : color.white.bold.underline,
	sectionDesc   : color.white.dim,
	sectionsProps : color.white.dim.italic,
} )
