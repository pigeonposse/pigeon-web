/**
 * URL.
 *
 * Class to create url and requests faster and easier.
 *
 * Since    1.0.0
 * version  1.0.0.
 */

import { Core } from '../core/core'

class Url extends Core {

	constructor() {

		super()

	}

	change( url, param, paramVal, update, refresh, history ) {

		this.core.urlParameter( url, param, paramVal, update, refresh, history )

	}

	request( url, method, headers, done, error, async ) {

		this.core.request( url, method, headers, done, error, async )

	}

	fetch( url, method, headers, done, error ) {

		this.core.fetch( url, method, headers, done, error )

	}

}

/**
 * EXPORT.
 *
 * A variable with an instance of the class is exported.
 *
 */

export const url = new Url()
