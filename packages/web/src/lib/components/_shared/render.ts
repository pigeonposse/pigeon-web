
import {
	createRawSnippet,
	hydrate,
} from 'svelte'
import { render } from 'svelte/server'

import type {
	Component,
	Snippet,
} from 'svelte'

import { browser } from '$app/environment'

type ComponentOrSnippet = Component | Snippet | ( () => ReturnType<Snippet> )

export const isSnippet = ( value: ComponentOrSnippet ): value is Snippet => {

	return value.length === 1

}

export const isComponent = ( value: ComponentOrSnippet ): value is Component => {

	return value.length === 2

}
export const isHTML = ( value: string ): value is string => /<\/?[a-z][\s\S]*>/i.test( value )

export const convertComponent2Snippet = ( Component: Component ) => createRawSnippet( props => ( {
	render : () => `<div>${browser ? '' : render( Component ).body}</div>`,
	setup( target ) {

		hydrate( Component, {
			target,
			// @ts-ignore
			props : props?.(),
		} )

	},
} ) )
