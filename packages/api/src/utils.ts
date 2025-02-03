import { styleText } from 'node:util'

import { ENV } from './env'

const bold    = ( v:string ) => styleText( 'bold', v )
const desc    = ( v:string ) => styleText( 'dim', v )
const warnOut = ( v:string ) => styleText( 'yellow', `${bold( '⚠ IMPORTANT' )} ${desc( v )}` )

export const setNotifications = () => {

	if ( !ENV.GH_TOKEN )
		console.warn( warnOut( 'Pass a Github token as an argument for the API to work fully\n' ) )

}
