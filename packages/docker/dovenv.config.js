import { defineConfig } from '@dovenv/core'

export default defineConfig( { transform : { docker : {
	input : [ './Dockerfile' ],
	fn    : async () => {

		const API_PORT = 1312
		const PORT     = 13124
		const pkg      = ( await import( '../web/package.json', { with: { type: 'json' } } ) ).default
		const apiPkg   = ( await import( '../api/package.json', { with: { type: 'json' } } ) ).default

		return `FROM node:23-alpine

WORKDIR /app

ENV GH_TOKEN=''
ENV GH_USER='pigeonposse'
ENV GH_USER_TYPE='user'
ENV GH_BRANCH='main'
ENV DEBUG=false

RUN npm i -q -g pnpm
RUN pnpm i concurrently ${apiPkg.name}@${apiPkg.version}

EXPOSE ${API_PORT}
EXPOSE ${PORT}

CMD ["sh", "-c", "pnpm exec concurrently --kill-others --names 'API,WEB' 'pnpm exec ${Object.keys( apiPkg.bin )[0]}' 'pnpm dlx ${pkg.name}@${pkg.version} dev -p ${PORT} --api http://localhost:${API_PORT}'"]
`

	},
} } } )
