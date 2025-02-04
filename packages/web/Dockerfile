FROM node:23-alpine

WORKDIR /app

RUN apk add --no-cache jq

COPY package.json .

RUN VERSION=$(jq -r .version package.json) && \
    echo "Version is: $VERSION" && \
    export VERSION=$VERSION && \
    echo "VERSION=$VERSION" > .env

ENV GH_TOKEN=''
ENV GH_USER='pigeonposse'
ENV GH_USER_TYPE='user'
ENV GH_BRANCH='main'

RUN npm install -g pnpm 
RUN pnpm dlx '@pigeonposse/server-node-2024@${VERSION}' --port 1312

EXPOSE 1312
EXPOSE 13124

CMD ["sh", "-c", "PUBLIC_API_URL=http://localhost:1312 pnpm dlx '@pigeonposse/web-2024@${VERSION}' --port 13124"]
