////////////////////////////////////////////////
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
////////////////////////////////////////////////

declare global {
	////////////////////////////////////////////////
	// APP
	////////////////////////////////////////////////
	namespace App {
		// interface Error {
		// 	data : object | undefined
		// 	id   : string
		// }
		interface Locals { lang: string }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	////////////////////////////////////////////////
	// VIEW TRANSITIONS
	// @see https://svelte.dev/blog/view-transitions
	////////////////////////////////////////////////
	interface ViewTransition {
		updateCallbackDone : Promise<void>
		ready              : Promise<void>
		finished           : Promise<void>
		skipTransition     : () => void
	}
	// eslint-disable-next-line @typescript-eslint/method-signature-style
	interface Document { startViewTransition( updateCallback: () => Promise<void> ): ViewTransition }
	////////////////////////////////////////////////
	// VARIABLES
	////////////////////////////////////////////////
	// eslint-disable-next-line @typescript-eslint/consistent-type-imports
	declare const PKG: typeof import( '../package.json' )
}

export {}
