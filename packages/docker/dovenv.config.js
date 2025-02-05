import { defineConfig } from '@dovenv/core'

export default defineConfig( { transform : { docker : {
	input : [ './Dockerfile' ],
	fn    : async () => {

		const API_PORT = 1312
		const PORT     = 13124
		const pkg      = ( await import( '../web/package.json', { with: { type: 'json' } } ) ).default
		const apiPkg   = ( await import( '../api/package.json', { with: { type: 'json' } } ) ).default
		const v        = pkg.version
		const name     = pkg.name

		return `FROM node:23-alpine

WORKDIR /app
	
ENV VERSION=${v}

ENV GH_TOKEN=''
ENV GH_USER='pigeonposse'
ENV GH_USER_TYPE='user'
ENV GH_BRANCH='main'

RUN npm i -q -g pnpm
RUN pnpm i concurrently ${pkg.name}@${v} ${apiPkg.name}@${v}

EXPOSE ${API_PORT}
EXPOSE ${PORT}

CMD ["sh", "-c", "pnpm exec concurrently --kill-others --names 'API,WEB' 'API_PORT=${API_PORT} pnpm exec ${Object.keys( apiPkg.bin )[0]}' 'pnpm exec ${name} serve -p ${PORT} --api http://localhost:${API_PORT}'"]
`

	},
} } } )
