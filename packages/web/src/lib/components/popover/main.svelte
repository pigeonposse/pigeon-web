<script lang="ts">
	import { onMount } from 'svelte'

	import './style.css'

	import type { Snippet } from 'svelte'

	let {
		id,
		class: Klass,
		children,
		content,
		...rest
	}: {
		id?       : string
		class?    : string
		children? : Snippet
		content?  : Snippet
		[key: string]: any
	} = $props()

	let open = $state( false )

	const toggle = () => ( open = !open )

	onMount( () => {
		const handler = ( e: MouseEvent ) => {
			const target = e.target as Node
			if ( !target || !document.body.contains( target as Node ) ) return
			const container = document.getElementById( id || '' )
			if ( container && !container.contains( target as Node ) ) open = false
		}
		document.addEventListener( 'click', handler )
		return () => document.removeEventListener( 'click', handler )
	} )
</script>

<div
	class="popover relative inline-block {Klass || ''}"
	onclick={( e ) => {

		e.stopPropagation()
		toggle()

	}}
	{...rest}
>
	{@render children?.()}
	{#if open}
		<div
			id={id || 'popover'}
			class="popover__content absolute z-50 mt-2 w-64 rounded-xl border border-primary-500/20 bg-dark-600/90 backdrop-blur-2xl p-3 text-gray-200 shadow-2xl"
			role="tooltip"
		>
			{@render content?.()}
		</div>
	{/if}
</div>
