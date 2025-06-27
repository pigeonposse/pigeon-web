import { styleText } from 'node:util'

import {
	BIN_NAME,
	description,
	HELP_URL,
	version,
} from './const'

const bold  = ( v:string ) => styleText( 'bold', v )
const desc  = ( v:string ) => styleText( 'dim', v )
const url   = ( v:string ) => styleText( 'magenta', styleText( 'italic', styleText( 'underline', v ) ) )
const title = ( v:string ) => styleText( 'bold', styleText( 'inverse', ' ' + v + ' ' ) )
// const cmds  = ( v:string, o?: string ) => styleText( 'green', v + ( o ? ' ' + desc( o ) : '' ) )
const flag = ( v:string ) => styleText( 'yellow', v )
const bin  = ( v:string ) => styleText( 'cyan', v )

export const versionOut = () => `${bold( 'Version' )} ${desc( version )}`

export const helpOut = () => `${title( BIN_NAME )} ${desc( version )}

${description}

${bold( 'Usage:' )} ${bin( BIN_NAME )} ${flag( '[...flags]' )} 

${bold( 'flags:' )}

  ${flag( '--cwd' )}          ${desc( `Current working dir. Used in check command` )}

${bold( 'General flags:' )}

  ${flag( '-h, --help' )}     ${desc( 'Print Help' )}
  ${flag( '-v, --version' )}  ${desc( 'Print Version' )}

${bold( 'Info:' )}            ${url( HELP_URL )}
`
