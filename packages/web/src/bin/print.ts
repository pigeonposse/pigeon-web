import { styleText } from 'node:util'

import {
	name,
	description,
	version,
	repository,
} from '../../package.json'

export {
	description,
	version,
}

export const BIN_NAME = name
export const HELP_URL = repository.url

const bold   = ( v:string ) => styleText( 'bold', v )
const desc   = ( v:string ) => styleText( 'dim', v )
const italic = ( v:string ) => styleText( 'italic', v )
const error  = ( v:string ) => styleText( 'red', v )
const url    = ( v:string ) => styleText( 'magenta', italic(  styleText( 'underline', v ) ) )
const title  = ( v:string ) => styleText( 'bold', styleText( 'inverse', ' ' + v + ' ' ) )
const cmds   = ( v:string, o?: string ) => styleText( 'green', v + ( o ? ' ' + desc( o ) : '' ) )
const flag   = ( v:string ) => styleText( 'yellow', v )
const bin    = ( v:string ) => styleText( 'cyan', v )

export const errorOut = ( e: unknown ) => error( `${title( 'Error' )} ${desc( e instanceof Error ? e.message : ( e || 'Unexpected Error' ).toString() )}` )

export const versionOut = () => `${bold( 'Version' )} ${desc( version )}`

export const helpOut = () => `${title( BIN_NAME )} ${desc( version )}

${description}

${bold( 'Usage:' )} ${bin( BIN_NAME )} ${cmds( '<cmd>' )}  ${flag( '[...flags]' )} 

${bold( 'Commands:' )}

  ${cmds( 'dev' )}            ${desc( `Start development server` )}
  ${cmds( 'serve' )}          ${desc( `Start server` )}
  ${cmds( 'build' )}          ${desc( `Build web without start server` )}

${bold( 'flags:' )}

  ${flag( '-p, --port' )}     ${desc( `Server port. ${italic( 'Default: 1312' )}` )}
  ${flag( '-o, --output' )}   ${desc( `Output path. ${italic( 'Default: build/web' )}` )}
  ${flag( '-c, --config' )}   ${desc( `Web configuration path. ${italic( 'Supported: *.{js|cjs|mjs|ts|mts|cts}' )}` )}
  ${flag( '--api' )}          ${desc( `URL for API server` )}
  ${flag( '--assets' )}       ${desc( `Asstes dir. ${italic( 'Default: assets' )}` )}

${bold( 'General flags:' )}

  ${flag( '-h, --help' )}     ${desc( 'Print Help' )}
  ${flag( '-v, --version' )}  ${desc( 'Print Version' )}
  ${flag( '--debug' )}        ${desc( 'Debug mode' )}

${bold( 'Info:' )}            ${url( HELP_URL )}
`
