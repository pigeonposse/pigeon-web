import { ENV }         from './env'
import { appLocal }    from './local'
import { appStandard } from './standard'

export * from './server'
export type * from './server'
export type * from './env'
export type * from './local'
export type * from './standard'

export {
	ENV,
	appStandard,
	appLocal,
}

export default appStandard
