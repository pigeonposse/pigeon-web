import { defineConfig }             from '@dovenv/core'
import { pigeonposseMonorepoTheme } from '@dovenv/theme-pigeonposse'

import core from './const.js'

const theme = pigeonposseMonorepoTheme( {
	core,
	// 	templates : {
	// 		'docker-file' : {
	// 			input : `{{const.templateMark}}

	// FROM node:23-alpine

	// WORKDIR /usr/src/app

	// ENV GH_TOKEN=""

	// ENV GH_USER='pigeonposse'
	// ENV GH_USER_TYPE='user'
	// ENV GH_BRANCH='main'

	// RUN npm install -g pnpm
	// RUN pnpx @pigeonposse/api-2024@{{const.corePkg.version}} --port 1312

	// EXPOSE 13124

	// CMD ["PUBLIC_API_URL=http://localhost:1312", "pnpx", "@pigeonposse/web-2024@{{const.corePkg.version}}", "--port", "13124"]
	// `,
	// 			output : '.dovenv/container/Dockerfile',
	// 		},
	// 		'docker-compose' : {
	// 			input : `{{const.templateMark}}

	// version: "3.8"

	// services:

	//   pigeonposse-web:

	//     container_name: \${PIGEONPOSSE_WEB_CONTAINER_NAME:-pigeon-web}
	//     build: .
	//     ports:
	//       - '\${PIGEONPOSSE_WEB_CONTAINER_PORT:-13124}:13124'
	//     restart: always

	// `,
	// 			output : '.dovenv/container/docker-compose.yml',
	// 		},

	// 	},
	// lint : { staged: { '**/*.{js,ts,jsx,tsx,json}': 'pnpm --silent . lint eslint --fix --silent' } },
	repo : { commit : { scopes : [
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
	] } },
} )

delete theme.check.ws // remove structure package checking
delete theme.custom.docs
delete theme.custom.predocs

export default defineConfig(
	theme,
)
