import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig( [
	{
		failOnWarn  : false,
		rollup      : { dts: { tsconfig: './node_modules/@pigeonposse/repo-config/tsconfig.json' } },
		declaration : true,
	},
] )
