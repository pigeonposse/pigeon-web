import { createClient } from '../dist/main.mjs'

const client =  createClient()

const response = await client.GET( '/github', { params: { query: undefined } } )

console.log( response )
