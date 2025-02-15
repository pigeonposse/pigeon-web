<script lang="ts">

	import {
		Accordion,
		AccordionItem,
	} from 'flowbite-svelte'

	import './style.css'
	import Icon from '$components/icons/main.svelte'

	import type { IconDefinition } from '../icons/main'
	import type { Snippet } from 'svelte'

	let {
		title,
		icon,
		type = 'item',
		open = $bindable( false ),
		class: Klass,
		children,
		...rest
	} :  {
		title?    : string
		icon?     : IconDefinition
		type?     : 'section' | 'item'
		open?     : boolean
		class?    : string
		children? : Snippet
	} = $props()
</script>

{#if type === 'item'}

	<AccordionItem
		bind:open={open}
		borderClass="border-none"
		borderBottomClass="border-none"
		{...rest}
		defaultClass="flex items-center justify-between w-full font-medium text-left group-first:rounded-t-xl border-gray-200 dark:border-gray-700' {open ? '!text-primary-300' : '!text-primary-100'} p-4 font-bold text-xl {Klass || ''}"
	>

		<span slot="header" class="relative flex gap-2 items-center">
			{#if icon}
				<Icon svg={icon} class=""/>
			{/if}

			{#if title}
				{title}
			{/if}

		</span>

		{@render children?.()}

	</AccordionItem>

{:else if type === 'section' }

	<Accordion
		flush
		class="w-full {Klass || ''}"
		{...rest}
	>

		{@render children?.()}

	</Accordion>

{/if}
