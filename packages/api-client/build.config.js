import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig( [
	{
		entries     : [ './src/main' ],
		sourcemap   : false,
		declaration : true,
		failOnWarn  : false,
		rollup      : {
			emitCJS            : true,
			inlineDependencies : false,
			esbuild            : {
				minify : false,
				target : 'node20',
			},
		},
		externals : [
			'@backan/client',
			'@pigeonposse/api-2025',
		],
	},
] )
