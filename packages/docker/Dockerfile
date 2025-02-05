FROM node:23-alpine

WORKDIR /app
	
ENV VERSION=0.0.2

ENV GH_TOKEN=''
ENV GH_USER='pigeonposse'
ENV GH_USER_TYPE='user'
ENV GH_BRANCH='main'

RUN npm i -q -g pnpm
RUN pnpm i concurrently @pigeonposse/web-2024@0.0.2 @pigeonposse/api-2024@0.0.2

EXPOSE 1312
EXPOSE 13124

CMD ["sh", "-c", "pnpm exec concurrently --kill-others --names 'API,WEB' 'API_PORT=1312 pnpm exec pigeonposse-api' 'pnpm exec @pigeonposse/web-2024 serve -p 13124 --api http://localhost:1312'"]
