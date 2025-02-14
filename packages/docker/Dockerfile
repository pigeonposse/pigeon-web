FROM node:23-alpine

WORKDIR /app

ENV GH_TOKEN=''
ENV GH_USER='pigeonposse'
ENV GH_USER_TYPE='user'
ENV GH_BRANCH='main'
ENV DEBUG=false

RUN npm i -q -g pnpm
RUN pnpm i concurrently @pigeonposse/api-2025@0.0.2

EXPOSE 1312
EXPOSE 13124

CMD ["sh", "-c", "pnpm exec concurrently --kill-others --names 'API,WEB' 'pnpm exec pigeonposse-api' 'pnpm dlx @pigeonposse/web-2025@0.0.2 dev -p 13124 --api http://localhost:1312'"]
