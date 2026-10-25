/**
 * ENVIRONMENT VARIABLES.
 *
 * @description Public environment variables used by the web app.
 * @see https://svelte.dev/docs/kit/environment-variables
 */

import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars( {
	PUBLIC_API_URL : {
		public      : true,
		description : 'Base URL of the PigeonPosse API.',
		schema      : value => value ?? 'https://api.pigeonposse.com',
	},
	PUBLIC_CONFIG : {
		public      : true,
		description : 'Optional JSON configuration for the web app.',
		schema      : value => value,
	},
} )
