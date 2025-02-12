<script lang="ts">

	import { faSearch } from '@fortawesome/free-solid-svg-icons'
	import {
		onDestroy,
		onMount,
	} from 'svelte'

	import './search.css'
	import {
		goto,
		replaceState,
	} from '$app/navigation'
	import Icon from '$components/icons/main.svelte'

	let {
		onChange,
		onKeyFocus = false,
		keys = [ 'cmd', 'k' ],
		placeholder = undefined,
		id = undefined,
		value = $bindable( '' ),
		urlParams = false,
		class: Klass = '',
		...rest
	}: {
		// eslint-disable-next-line no-unused-vars
		onChange?    : ( value : string ) => void | undefined
		onKeyFocus?  : boolean
		keys?        : string[]
		placeholder? : string | undefined
		id?          : string | undefined
		value?       : string | undefined
		urlParams?   : boolean
		class?       : string
	} = $props()

	let inputElement: HTMLInputElement
	let isFocused: boolean = $state( false )

	function handleKeyDown( event: KeyboardEvent ) {

		if ( onKeyFocus && keys.includes( event.key.toLowerCase() ) ) {

			inputElement.focus()

		}

	}

	if ( typeof window !== 'undefined' ) window.addEventListener( 'keydown', handleKeyDown )

	function handleFocus() {

		isFocused = true

	}

	function handleBlur() {

		isFocused = false

	}

	function updateUrlWithId() {

		if ( !urlParams || !id ) return
		const currentUrl = new URL( window.location.href )
		currentUrl.searchParams.set( id, value )

		replaceState( currentUrl, '' )

	}

	onMount( () => {

		if ( !urlParams || !id ) return

		const params   = new URLSearchParams( window.location.search )
		const tabParam = params.get( id )
		if ( tabParam ) {

			value = tabParam
			inputElement?.focus()
			onChange?.( value )

		}

	} )

	onDestroy( () => {

		window?.removeEventListener( 'keydown', handleKeyDown )

		if ( urlParams && id ) {

			const currentUrl = new URL( window.location.href )
			currentUrl.searchParams.delete( id )
			goto( currentUrl.toString(), {
				replaceState : true,
				keepFocus    : true,
			} )

		}

	} )

</script>
<div
	{...rest}
	class="search{isFocused ? ' focused' : '' }{Klass ? ' ' + Klass : ''}"
>
	<Icon
		svg={faSearch}
		class="search__icon"
	/>
	<input
		type="text"
		{placeholder}
		class="search__input"
		bind:value={value}
		bind:this={inputElement}
		onfocus={handleFocus}
		onblur={handleBlur}
		oninput={_e => {

			onChange?.( value )
			updateUrlWithId()

		}}
	/>
</div>
