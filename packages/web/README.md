# PIGEONPOSSE WEB

![HEADER](https://raw.githubusercontent.com/pigeonposse/pigeon-web/main/docs/public/banner.png)

Use the PigeonPosse web 2024 theme.

## Features

- Use locally with `JS runtime` (Compatible with `node`, `bun` and `deno`)
- Use with `docker`. [Read more](#docker). [Docker hub](https://hub.docker.com/r/pigeonposse/pigeon-web)
- Use in a cloud (_Cloudflare_, _Vercel_, etc)

## Prerequisites

Access to a **PIGEONPOSSE** API Server.

Read more in: [@pigeonposse/api-2024](https://www.npmjs.com/package/@pigeonposse/api-2024)

## Installation

```bash
npm i @pigeonposse/web-2024
# or
pnpm i @pigeonposse/web-2024
```

## Usage

```bash
npx @pigeonposse/web-2024 serve --port 1312
# or
pnpx @pigeonposse/web-2024 serve --port 1312
```

### Custom Config

```bash
pnpx @pigeonposse/web-2024 serve --port 1312 --api "http://my-pigeonposse-api.com" --config ./config.js
```

```js
import {defineConfig} from '@pigeonposse/web-2024'
export default defineConfig({
 /** config */
})
```

### More info

```bash
npx @pigeonposse/web-2024 serve --help
# or
pnpx @pigeonposse/web-2024 serve --help
```

## Docker

Example With 'docker compose'.

```yaml

services:
  pigeon-web-2024:
    image: pigeon-web:2024-latest
    ports:
      - "13124:13124" # the web port
    environment:
      GH_TOKEN: ${GH_TOKEN}
      GH_USER: "pigeonposse"
      GH_USER_TYPE: "org" # 'user' or 'org'
      GH_BRANCH: "main"
      DEBUG: false
    restart: always

```
