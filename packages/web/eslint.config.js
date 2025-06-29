import {
	setConfig,
	setSvelteConfig,
} from '@dovenv/theme-pigeonposse/eslint'

// @ts-ignore
const svelteConfig = await setSvelteConfig( { ts: true } )

export default setConfig(
	{
		general : 'ts',
		toml    : true,
		json    : true,
		package : true,
		yaml    : true,
		jsdoc   : true,
		md      : true,
		html    : true,
		// gitignore : true,
		ignore  : [
			'**/docs/**/*.md',
			'**/README.md',
			'**/docs/data/**/*.md',
			'**/CHANGELOG.md',
			'**/examples/**/partials/*',
			'**/.dovenv/**/partials/*',
			'**/.dovenv/**/templates/*',
			'**/packages/create/data/**',
			'**/packages/web/data/**',
			'**/packages/config/**/tests/**',
			'**/packages/config/**/data/**',
		],
	},
	c => ( [ ...c, ...svelteConfig ] ),
)

// /**
//  * ESLint config.
//  * @description ESLint config for JavaScript and TypeScript projects.
//  * @see https://eslint.org/docs
//  * @see https://typescript-eslint.io/
//  */
// import { lint }           from '@dovenv/theme-pigeonposse'
// import eslintPluginSvelte from 'eslint-plugin-svelte'

// const { dovenvEslintConfig } = lint

// const generalConfig = dovenvEslintConfig.config
// const svelteConfig  = eslintPluginSvelte.configs['flat/recommended']

// /** @type import("eslint").Linter.Config[] */
// export default [
// 	...generalConfig,
// 	...svelteConfig,
// 	{
// 		files : [ '**/*.svelte' ],
// 		rules : {
// 			'align-import/align-import' : 'off',
// 			'align-import/trim-import'  : 'off',
// 			'no-undef'                  : 'off',
// 			'one-var'                   : 'off',
// 			'svelte/button-has-type'    : [
// 				'error',
// 				{
// 					button : true,
// 					submit : true,
// 					reset  : true,
// 				},
// 			],
// 			'svelte/spaced-html-comment' : [ 'error', 'always' ],
// 			'svelte/indent'              : [
// 				'error',
// 				{
// 					indent                    : 'tab',
// 					ignoredNodes              : [],
// 					switchCase                : 1,
// 					alignAttributesVertically : false,
// 				},
// 			],
// 			'prefer-const'           : 'off',
// 			'svelte/no-at-html-tags' : 'off',
// 			'import/order'           : [
// 				'error',
// 				{
// 					'groups' : [
// 						// Native modules (builtin) and externals
// 						[ 'builtin', 'external' ],
// 						// Internal
// 						[
// 							// example: import api from "@/services/api"
// 							'internal',
// 							// example: import config from "../config"
// 							'parent',
// 							// example: import logger from "./logger"
// 							'sibling',
// 							// example: import main from "./"
// 							'index',
// 						],
// 						// Types
// 						[ 'type' ],
// 						// special object import. Not used
// 						[ 'object' ],
// 					],
// 					'pathGroups' : [
// 						{
// 							pattern  : '$*/**',
// 							group    : 'index',
// 							position : 'after',
// 						},
// 						{
// 							pattern  : '**/*.{css,sass,scss,postcss}',
// 							group    : 'internal',
// 							position : 'before',
// 						},
// 					],
// 					'named'       : true,
// 					'alphabetize' : {
// 						order           : 'asc',
// 						caseInsensitive : false,
// 					},
// 					'newlines-between'        : 'always',
// 					'warnOnUnassignedImports' : true,
// 					'distinctGroup'           : false,
// 				},
// 			],
// 		},
// 	},
// 	{
// 		files : [ '**/+*.ts', '**/*.svelte' ],
// 		rules : { 'jsdoc/require-jsdoc': 'off' },
// 	},
// 	{
// 		files : [ '**/*.js' ],
// 		rules : { 'jsdoc/valid-types': 'off' },
// 	},
// ]
