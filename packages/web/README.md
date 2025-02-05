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
npx serve node_modules/@pigeonposse/web-2024/dist/web
# or
pnpx serve node_modules/@pigeonposse/web-2024/dist/web
```

## Custom Config

```bash
PUBLIC_API_URL="http://my-pigeonposse-api.com" npx serve node_modules/@pigeonposse/web-2024/dist/web
# or
PUBLIC_API_URL="http://my-pigeonposse-api.com" pnpx serve node_modules/@pigeonposse/web-2024/dist/web
```

## Docker

Example With 'docker compose'.

```yaml
version: '3.9'

services:
  pigeon-web-2024:
    container_name: pigeon-web-2024
    build: .
    ports:
    #   - "1312:1312"   # the port of the internal server to the host
      - "13124:13124" # the port of frontend
    environment:
      GH_TOKEN: "my-github-token"
      GH_USER: "pigeonposse"
      GH_USER_TYPE: "org" # 'user' or 'org'
      GH_BRANCH: "main"
      PUBLIC_API_URL: "http://localhost:1312"
    restart: always

```
