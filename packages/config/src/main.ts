import setGithubPreset from '@collectium/preset-github'

export type Response = ReturnType<typeof setGithubPreset>
const usertype = globalThis.process.env.GH_USER_TYPE === 'org' || globalThis.process.env.GH_USER_TYPE === 'user' ? globalThis.process.env.GH_USER_TYPE : undefined
export const ENV = {
	GH_TOKEN     : globalThis.process.env.GH_TOKEN,
	GH_USER      : globalThis.process.env.GH_TOKEN,
	GH_BRANCH    : globalThis.process.env.GH_BRANCH,
	GH_USER_TYPE : usertype as 'org' | 'user' | undefined,
}

const config: Response = setGithubPreset( {
	id         : 'pigeonposse',
	user       : ENV.GH_USER || 'pigeonposse',
	branch     : ENV.GH_BRANCH || 'main',
	userType   : ENV.GH_USER_TYPE || 'org',
	configPath : [ '.pigeonposse', '.dovenv/pigeonposse' ],
	token      : ENV.GH_TOKEN,
} )
export default config
