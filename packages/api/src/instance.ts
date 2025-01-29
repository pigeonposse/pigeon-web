import { Collectium  } from '@collectium/core'
import config          from '@pigeonposse/config'
import { styleText }   from 'node:util'

const bold    = ( v:string ) => styleText( 'bold', v )
const desc    = ( v:string ) => styleText( 'dim', v )
const warnOut = ( v:string ) => styleText( 'yellow', `${bold( '⚠ IMPORTANT' )} ${desc( v )}` )

if ( !globalThis.process.env.GH_TOKEN )
	console.warn( warnOut( 'Pass a Github token as an argument for the API to work fully\n' ) )

export default new Collectium( config )
