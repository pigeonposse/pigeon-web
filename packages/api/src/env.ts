import { ENV as CONFIG_ENV } from '@pigeonposse/api-config-2025'

export type Env = typeof ENV
export const ENV = {
	...CONFIG_ENV,
	/**
	 * Used in server.
	 * @default 1312
	 */
	API_PORT       : Number( globalThis.process.env.API_PORT ) || 1312,
	/**
	 * Used in server.
	 * @default 'build/store/pigeonposse-api.json'
	 */
	API_STORE_PATH : globalThis.process.env.API_STORE_PATH || 'build/store/pigeonposse-api.json',
}
