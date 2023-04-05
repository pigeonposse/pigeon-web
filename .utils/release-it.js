/**
 * Release-it config builder.
 *
 * @description Configuration for release versions in github.
 *
 * @see https://github.com/release-it/release-it/blob/main/docs/configuration.md
 */
import { writeFile } from 'fs/promises'
import { join }      from 'path'
import { pkg }       from './getPkg.js'

const projectPaths  = pkg.data.extra.projectPath
const releaseItFile = join( pkg.dir, '.release-it.json' )
const topics        = pkg.data.keywords.join( ',' )
const data          = {
	'git' : {
		'requireBranch' : 'main',
		'commitMessage' : `Release v${pkg.data.version}`,
	},
	'hooks' : {
		'before:init' : [ 
			'git push', 
			// 'pnpm lint-fix', 
			'pnpm build', 
		],
	    'after:bump'        : 'pnpm auto-changelog -p',
	    'after:git:release' : 'echo \'After git push, before github release\'',
	    'after:release'     : [
	    	`gh repo edit ${pkg.data.repository.url} -d \"${pkg.data.description}\"`,
	    	`gh repo edit ${pkg.data.repository.url} --add-topic ${topics}`,
	    	`echo \'Github action is now releasing: ${pkg.data.name} v${pkg.data.version} to ${pkg.data.repository.url}.\n Check if all is ok 🌈🤖\n ${pkg.data.repository.url}/actions\'`,
	    ],
	},
	'github' : {
		'release' : false,
	},
	'npm' : {
		'release' : false,
	},
}

const JsonData = JSON.stringify( data, null, 4 )

await writeFile( releaseItFile, JsonData, 'utf-8' )
