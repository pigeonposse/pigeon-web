import type {
	HTMLAttributes,
	MouseEventHandler,
} from 'svelte/elements'

import { goto as gotoFunct } from '$app/navigation'

type GotoFn = ( ( goto: typeof gotoFunct ) => ReturnType<typeof gotoFunct> )
type OpenFn = ( ( open: typeof window.open ) => ReturnType<typeof window.open> )

type ClickCB<T extends EventTarget> = {
	e        : Parameters<MouseEventHandler<T>>[0]
	onclick? : NonNullable<HTMLAttributes<T>['onclick']>
	goto?    : string | GotoFn
	href?    : string | OpenFn
}

export const clickFn = async <T extends EventTarget>( {
	e, goto, href, onclick,
}: ClickCB<T> ): Promise<void> => {

	try {

		if ( onclick ) await onclick( e )

		if ( goto ) {

			if ( typeof goto === 'function' ) await goto( gotoFunct )
			else gotoFunct( goto ) //window?.open( goto, '_selft' )

		}
		if ( href ) {

			if ( typeof href === 'function' ) await href( window?.open )
			else window?.open( href, '_blank' )

		}

	}
	catch ( e ) {

		console.debug( 'Error on click', e )

	}

}
