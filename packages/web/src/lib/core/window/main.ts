/**
 * Todo.
 * @description Todo.
 */

import { writable } from 'svelte/store'

import { onNavigate } from '$app/navigation'

/**
 * TYPES
 */
type DragParams = {
	element?         : Element | Document
	noDragSelectors? : string
}

/**
 * FUNCTION
 */
class Window {

	isNavigation = writable( false )

	drag( {
		element = undefined, noDragSelectors = undefined,
	}: DragParams ) {

		if ( !document ) throw Error( 'Document is not defined' )

		element         = element === undefined ? document : element
		noDragSelectors = noDragSelectors === undefined ? 'input, a, textarea, button, iframe, video, [role="link"]' : noDragSelectors

		element.addEventListener( 'mousedown', async e => {

			if ( e.target === null ) return

			// @ts-ignore
			if ( e.target.closest( noDragSelectors ) ) return

			// @ts-ignore
			if ( window.__TAURI__ && window.__TAURI__.window ) {

				// @ts-ignore
				const tauriW = window.__TAURI__.window
				const w      = await tauriW.getCurrent()

				await w.startDragging()

			}

		} )

	}

	isTauri() {

		// @ts-ignore
		if ( window.__TAURI__ ) return true
		return false

	}

	viewTransitions() {

		onNavigate( navigation => {

			this.isNavigation.set( true )

			// @ts-ignore
			if ( !document.startViewTransition ) return

			return new Promise( resolve => {

				document.startViewTransition( async () => {

					resolve()
					await navigation.complete

				} )

			} )

		} )

	}

}

export const appWindow = new Window()
