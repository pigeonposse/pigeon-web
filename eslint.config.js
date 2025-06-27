/**
 * ESLint config.
 *
 * @description ESLint config for JavaScript and TypeScript projects.
 * @see https://eslint.org/docs
 * @see https://typescript-eslint.io/
 */
import { setConfig } from '@dovenv/theme-pigeonposse/eslint'

export default setConfig( {
	general   : 'ts',
	vue       : true,
	toml      : true,
	json      : true,
	package   : true,
	yaml      : true,
	jsdoc     : true,
	md        : true,
	html      : true,
	gitignore : true,
	ignore    : [
		'./docs/**.md',
		'**/docs/data/**/*.md',
		'**/CHANGELOG.md',
		'**/examples/**/partials/*',
		'**/.dovenv/**/partials/*',
		'**/.dovenv/**/templates/*',
	],
} )

