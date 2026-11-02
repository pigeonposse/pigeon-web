# PIGEONPOSSE API CLIENT

![HEADER](https://raw.githubusercontent.com/pigeonposse/pigeon-web/main/docs/public/banner.png)

API Client for [@pigeonposse/api-2027](https://www.npmjs.com/package/@pigeonposse/api-2027)

## Installation

```bash
npm i @pigeonposse/api-client-2027
# or
pnpm i @pigeonposse/api-client-2027
```

## Usage

```js
import { createClient } from '@pigeonposse/api-client-2027'

export const client = createClient( { baseUrl: 'https:/localhost:1312' } )
```

### Example

```js
import { createClient } from '@pigeonposse/api-client-2027'

const fetchData = async () => {

  const client = createClient( { baseUrl: env.PUBLIC_API_URL } )

  const res = await client.GET( '/all' )

  if ( res.error ) return { type: 'error' } as const

  return res

}
```
