# PIGEONPOSSE API

![HEADER](https://raw.githubusercontent.com/pigeonposse/pigeon-web/main/docs/public/banner.png)

Run the PigeonPosse API.

Rest API to get data from your GitHub repository.

- Required for [@pigeonposse/web-2025](https://www.npmjs.com/package/@pigeonposse/web-2025)

## Prerequisites

- GitHub Token [Read more](https://github.com/settings/tokens)

## Installation

```bash
npm i @pigeonposse/api-2025
# or
pnpm i @pigeonposse/api-2025
```

## CLI Usage

```bash
GH_TOKEN="your-github-token" GH_USER="your-github-user" npx @pigeonposse/api-2025
# or
GH_TOKEN="your-github-token" GH_USER="your-github-user" pnpx @pigeonposse/api-2025
```

Or with a installation

```bash
npm i @pigeonposse/api-2025
GH_TOKEN="your-github-token" npm exec pigeonposse-api-2025
# or
pnpm i @pigeonposse/api-2025
GH_TOKEN="your-github-token" GH_USER="your-github-user" pnpm exec pigeonposse-api-2025
```

## Library Usage

### Standard server

```js
import { createServer } from '@pigeonposse/api-2025' // OR: import { createServer } from '@pigeonposse/api-2025/server'
createServer( {
 DEBUG: 'false',
 GH_TOKEN: "your-github-token",
 GH_USER: 'angelespejo',
 GH_BRANCH: 'main',
 GH_USER_TYPE: 'user',
 API_PORT: 1312,
 API_STORE_PATH: 'build/store/pigeonposse.json'
} )
```

```bash
node standard-server.js
## Override OPTION
DEBUG=true node standard-server.js
```

### Local server

```js
import { createLocalServer } from '@pigeonposse/api-2025' // OR: import { createLocalServer } from '@pigeonposse/api-2025/server'

createLocalServer( {
 DEBUG: 'false',
 GH_TOKEN: "your-github-token",
 GH_USER: 'angelespejo',
 GH_BRANCH: 'main',
 GH_USER_TYPE: 'user',
 API_PORT: 1312,
 API_STORE_PATH: 'build/store/pigeonposse.json'
} )
```

```bash
node local-server.js
## Override OPTION
DEBUG=true node local-server.js
```

### Custom server

You can use only the app, for build your server wetheaver you want.

### Standard app

```js
import { appStandard } from '@pigeonposse/api-2025' // OR: import app from '@pigeonposse/api-2025/standard'

// Build you server
```

### Local app

```js
import { appLocal } from '@pigeonposse/api-2025' // OR: import app from '@pigeonposse/api-2025/local'

// Build you server
```

### Change enviroment variables

```js
import { ENV } from '@pigeonposse/api-2025' // OR: import { ENV } from '@pigeonposse/api-2025/env'

ENV.DEBUG = 'true'
ENV.GH_USER='angelespejo'
ENV.GH_BRANCH='main'
ENV.GH_USER_TYPE='user'

// Do something
```

## Add custom config in your repositories

This package use Collectium Github Preset for get Github data. For more information read [Docs](https://collectium.pigeonposse.com/guide/preset/github/)
