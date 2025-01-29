
/** @type {import('unbuild').BuildConfig} */
const config = {
	sourcemap   : false,
	declaration : true,
	rollup      : {
		emitCJS            : true,
		inlineDependencies : true,
		esbuild            : {
			minify : false,
			target : 'node20',
		},
	},
	failOnWarn : true,
}

export default config
