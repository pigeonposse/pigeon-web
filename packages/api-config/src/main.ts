import setGithubPreset from '@collectium/preset-github'

export type Response = ReturnType<typeof setGithubPreset>

export const ENV = {
	/**
	 * @default 'false'
	 */
	DEBUG        : globalThis.process.env.DEBUG as 'true' | 'false' | undefined,
	/**
	 * @default undefined
	 */
	GH_TOKEN     : globalThis.process.env.GH_TOKEN,
	/**
	 * @default 'pigeonposse'
	 */
	GH_USER      : globalThis.process.env.GH_USER || 'pigeonposse',
	/**
	 * @default 'main'
	 */
	GH_BRANCH    : globalThis.process.env.GH_BRANCH || 'main',
	/**
	 * @default 'org'
	 */
	GH_USER_TYPE : (
		globalThis.process.env.GH_USER_TYPE === 'org' || globalThis.process.env.GH_USER_TYPE === 'user'
			? globalThis.process.env.GH_USER_TYPE
			: 'org'
	) as 'org' | 'user' | undefined,
}

export const setConfig = ( env: typeof ENV ) :Response => {

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
