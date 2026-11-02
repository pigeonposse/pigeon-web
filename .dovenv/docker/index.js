import { defineConfig } from '@dovenv/core'
import { joinPath }     from '@dovenv/core/utils'

export default defineConfig( {
	transform : {
		docker : {
			input : [ './.dovenv/docker/Dockerfile' ],
			fn    : async ( { utils } ) => {

				const API_PORT = 1312
				const PORT     = 13124
				const pkg      = ( await import( joinPath( utils.wsDir, './packages/web/package.json' ), { with: { type: 'json' } } ) ).default
				const apiPkg   = ( await import( joinPath( utils.wsDir, './packages/api/package.json' ), { with: { type: 'json' } } ) ).default

				return `FROM node:26-alpine

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
		},
	},
} )
