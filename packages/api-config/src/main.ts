import setGithubPreset from '@collectium/preset-github'

export type Response = ReturnType<typeof setGithubPreset>

const PROCESS_ENV = globalThis.process.env 

export const ENV = {
	/**
	 * @default 'false'
	 */
	DEBUG        : PROCESS_ENV.DEBUG as 'true' | 'false' | undefined,
	/**
	 * @default undefined
	 */
	GH_TOKEN     : PROCESS_ENV.GH_TOKEN,
	/**
	 * @default 'pigeonposse'
	 */
	GH_USER      : PROCESS_ENV.GH_USER || 'pigeonposse',
	/**
	 * @default 'main'
	 */
	GH_BRANCH    : PROCESS_ENV.GH_BRANCH || 'main',
	/**
	 * @default 'org'
	 */
	GH_USER_TYPE : (
		PROCESS_ENV.GH_USER_TYPE === 'org' || PROCESS_ENV.GH_USER_TYPE === 'user'
			? PROCESS_ENV.GH_USER_TYPE
			: 'org'
	) as 'org' | 'user' | undefined,
}

export const setConfig = ( env: typeof ENV ): Response => {

	return setGithubPreset( {
		id         : 'pigeonposse',
		user       : env.GH_USER,
		branch     : env.GH_BRANCH,
		userType   : env.GH_USER_TYPE,
		configPath : [ '.pigeonposse', '.dovenv/pigeonposse' ],
		token      : env.GH_TOKEN,
	} )

}

export const config: Response = setConfig( ENV )
export default config
