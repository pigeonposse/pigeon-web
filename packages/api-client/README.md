# PIGEONPOSSE API CLIENT

![HEADER](https://raw.githubusercontent.com/pigeonposse/pigeon-web/main/docs/public/banner.png)

API Client for [@pigeonposse/api-2025](https://www.npmjs.com/package/@pigeonposse/api-2025)

## Installation

```bash
npm i @pigeonposse/api-client-2025
# or
pnpm i @pigeonposse/api-client-2025
```

## Usage

```js
import { createClient } from '@pigeonposse/api-client-2025'

export const client = createClient( { baseUrl: 'https:/localhost:1312' } )
```

### Example

```js
import { createClient } from '@pigeonposse/api-client-2025'

const fetchData = async () => {

  const client = createClient( { baseUrl: env.PUBLIC_API_URL } )

  const res = await client.GET( '/all' )

  if ( res.error ) return { type: 'error' } as const

  return res

}
```
