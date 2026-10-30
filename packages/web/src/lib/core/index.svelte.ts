import { appWindow  } from './window/index.svelte'

class App {

	// page = page
	window = appWindow
	#isInit = $state( false )

	async init() {

		if ( this.#isInit ) return

	}

}

export const app = new App()

