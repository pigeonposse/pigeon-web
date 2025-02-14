import { replaceState } from '$app/navigation'

export const updateURLParams = ( id:string, value: string ) => {

	const currentUrl = new URL( window.location.href )
	currentUrl.searchParams.set( id, value )

	replaceState( currentUrl, '' )

}
