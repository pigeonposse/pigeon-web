import { defineConfig }             from '@dovenv/core'
import { pigeonposseMonorepoTheme } from '@dovenv/theme-pigeonposse'

import core from './const.js'

const theme = pigeonposseMonorepoTheme( {
	core,
	repo : {
		commit : {
			scopes : [
				{
					value : 'packages',
					desc  : '📦 All or some packages',
				},
				{
					value : 'core',
					desc  : '☀️ Core package',
				},
				{
					value : 'env',
					desc  : 'Only dev environment',
				},
				{
					value : 'all',
					desc  : 'env, packages etc',
				},
			],
		},
	},
} )

// delete theme.check.ws // remove structure package checking
delete theme.custom.docs
delete theme.custom.predocs

export default defineConfig(
	theme,
)
