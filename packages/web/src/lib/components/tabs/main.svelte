<script lang="ts">

	import { onMount } from 'svelte'

	import './style.css'
	import { goto } from '$app/navigation'
	import Button from '$lib/components/button/main.svelte'

	import type {
		Component,
		Snippet,
	} from 'svelte'

	export let items: {
		id     : string
		input  : string | Component | ( () => ReturnType<Snippet> )
		name   : string
		desc?  : string
		/** Component / snippet props */
		props? : object
	}[]

	export let id: string
	export let activeTabId: string | undefined = undefined
	export let customSectionClasses: string = ''
	export let customBtnClasses: string = ''
	export let urlParams: boolean = false
	export let defaultItem = items[0].id

	if ( !activeTabId ) activeTabId = defaultItem

	const updateUrlWithId = ( ) => {

		if ( !urlParams || !id || !activeTabId ) return
		const currentUrl = new URL( window.location.href )
		const curr       = currentUrl.searchParams.get( id )
		if ( curr === activeTabId ) return
		currentUrl.searchParams.set( id, activeTabId )
		goto( currentUrl.toString(), { replaceState: false } )

	}

	const handleClick = ( tabId: string ) => () => {

		activeTabId = tabId
		if ( urlParams ) updateUrlWithId()

	}

	onMount( () => {

		if ( !urlParams || !id ) return
		const params   = new URLSearchParams( window.location.search )
		const tabParam = params.get( id )
		if ( tabParam && items.some( item => item.id === tabParam ) ) {

			activeTabId = tabParam

		}

		if ( defaultItem !== activeTabId ) updateUrlWithId()

	} )
</script>

<div
	{...$$restProps}
	class="tabs {$$restProps.class || ''}">

	<div class="tabs__header">
		{#each items as item}
			<Button
				on:click={handleClick( item.id )}
				class="{customBtnClasses}"
				title="{item.desc}"
				type={activeTabId === item.id ? 'primary' : 'dark'}
				disabled={activeTabId === item.id}
			>
				{item.name}
			</Button>
		{/each}
	</div>

	{#each items as item}
		{#if activeTabId === item.id}
			<div class="tabs__content {customSectionClasses}">
				{#if typeof item.input !== 'string'}
					<svelte:component this={item.input} {...item.props} />
				{:else}
					{@html item.input}
				{/if}
			</div>
		{/if}
	{/each}
</div>
