<script lang="ts">

	import { faSearch } from '@fortawesome/free-solid-svg-icons'
	import {
		onDestroy,
		onMount,
	} from 'svelte'

	import './search.css'
	import { updateURLParams } from './utils'
	import { goto } from '$app/navigation'
	import Icon from '$components/icons/main.svelte'

	let {
		onChange,
		onkeydown = false,
		keys = [ 'cmd', 'k' ],
		placeholder = undefined,
		id = undefined,
		value = $bindable( '' ),
		urlParams = false,
		isFocused = $bindable( false ),
		class: Klass = '',
		...rest
	}: {
		// eslint-disable-next-line no-unused-vars
		onChange?    : ( value : string ) => void | undefined
		onkeydown?   : boolean | ( () => void )
		keys?        : string[]
		placeholder? : string | undefined
		id?          : string | undefined
		value?       : string | undefined
		urlParams?   : boolean
		isFocused?   : boolean
		class?       : string
	} = $props()

	let inputElement: HTMLInputElement

	function handleKeyDown( event: KeyboardEvent ) {

		if ( onkeydown && keys.includes( event.key.toLowerCase() ) ) {

			if ( typeof onkeydown === 'function' ) onkeydown()
			isFocused = true

		}

	}

	onMount( () => {

		// Keydown
		if ( typeof window !== 'undefined' )
			window.addEventListener( 'keydown', handleKeyDown )

		// url params
		if ( !urlParams || !id ) return

		const params   = new URLSearchParams( window.location.search )
		const tabParam = params.get( id )
		if ( tabParam ) {

			value     = tabParam
			isFocused = true
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

	$effect( () => {

		if ( isFocused ) inputElement?.focus()

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
		onfocus={() => isFocused = true}
		onblur={() => isFocused = true}
		oninput={_e => {

			onChange?.( value )

			if ( !urlParams || !id ) return
			updateURLParams( id, value )

		}}
	/>
</div>
