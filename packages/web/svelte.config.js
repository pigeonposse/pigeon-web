import adapterCloudflare  from '@sveltejs/adapter-cloudflare'
import adapter            from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

const isCloudflare = process.env.CLOUDFLARE

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess : vitePreprocess(),
	kit        : {
		alias : {
			'$components/*' : 'src/lib/components/*',
			'$core/*'       : 'src/lib/core/*',
		},
		adapter : isCloudflare
			? adapterCloudflare()
			: adapter( {
				pages    : 'dist/web',
				assets   : 'dist/web',
				fallback : 'index.html',
			} ),
	},
}
