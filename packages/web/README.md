# PIGEONPOSSE WEB

![HEADER](docs/public/banner.png)

Use the PigeonPosse web 2024 theme.

## Features

- Use locally with `JS runtime` (Compatible with `node`, `bun` and `deno`)
- Use with `docker`. [Read more](https://hub.docker.com/r/pigeonposse/pigeon-web)
- Use in a cloud (_Cloudflare_, _Vercel_, etc)

## Prerequisites

Access to a PIGEONPOSSE API Server.

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
PUBLIC_API_URL="http:my-pigeonposse-api.com" npx serve node_modules/@pigeonposse/web-2024/dist/web
# or
PUBLIC_API_URL="http:my-pigeonposse-api.com" pnpx serve node_modules/@pigeonposse/web-2024/dist/web
```
