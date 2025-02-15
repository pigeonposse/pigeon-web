<script lang="ts">
	import { onMount } from 'svelte'

	import './select.css'
	import { updateURLParams } from './utils'

	import type {
		HTMLOptionAttributes,
		HTMLSelectAttributes,
	} from 'svelte/elements'

	let {
		urlParams,
		id,
		title,
		value = $bindable( '' ),
		options,
		attr,
		type = 'main',
		class: Klass,
		placeholder,
	}: {
		id?          : string
		urlParams?   : boolean
		value?       : string
		title?       : string
		placeholder? : string
		attr?        : Omit<HTMLSelectAttributes, 'class'>
		type?        : 'main' | 'none'
		class?       : string
		options: ( {
			value : string
			text? : string
			attr? : Omit<HTMLOptionAttributes, 'value'>
		} )[]
	} = $props()

	onMount( () => {

		if ( !urlParams || !id ) return

		const params   = new URLSearchParams( window.location.search )
		const tabParam = params.get( id )
		if ( tabParam ) {

			value = tabParam

		}

	} )

	$effect( () => {

		if ( !urlParams || !id ) return
		updateURLParams( id, value )

	} )
</script>

<div class="select {type} {Klass || ''}" >

	{#if title}
		<span>{title}</span>
	{/if}

	<select
		bind:value={value}
		{...attr}
	>
		{#if placeholder}
			<option value="" disabled selected>{placeholder}</option>
		{/if}

		{#each options as opt}
			<option
				value={opt.value}
				{...opt.attr}
			>   { opt.text || opt.value}
			</option>
		{/each}
	</select>

</div>

