
// docker build -t my-node-app .

// docker run -p 3000:3000 my-node-app

/**
 * Build Docker & run.
 * @description Build Docker.
 */

import { spawnSync } from 'child_process'
import inquirer      from 'inquirer'

import { pkg } from './getPkg.js'

const questions = [
	{
		type    : 'input',
		name    : 'name',
		message : 'Add 🐳 Docker name',
		default() {

			return pkg.data.name

		},
	},
	{
		type    : 'confirm',
		name    : 'run',
		message : 'Do you want to run? 🚀',
		default : true,
	},
	{
		type     : 'number',
		name     : 'port',
		message  : 'Expose a port 🛳️🌅 for your app',
		validate : value => {

			if ( isNaN( value ) || value < 0 ) {

				return 'Please enter a valid age.'

			}
			return true

		},
		default : 1312,
		when    : answers => answers.run === true,
	},
]

inquirer.prompt( questions ).then( answers => {

	let exec

	if ( !answers || !answers.name ) return

	exec = `docker build -t ${answers.name} ${pkg.dir}`

	console.log( '[Exec] ' + exec )

	spawnSync( exec, {
		shell : true,
		stdio : 'inherit',
	} )

	if ( answers.run ) {

		if ( !answers.port ) return

		exec = `docker run -p ${answers.port}:${pkg.data.extra.devPort} ${answers.name}`

		console.log( '[Exec] ' + exec )

		spawnSync( exec, {
			shell : true,
			stdio : 'inherit',
		} )

	}
	return

} ).catch( e => console.error( e ) )
