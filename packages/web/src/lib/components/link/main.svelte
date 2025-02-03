<script lang="ts">

	import {
		Fa,
		type IconDefinition,
	} from '../icons/main'
	import Tooltip from '$lib/components/tooltip/main.svelte'

	import type { ComponentProps } from 'svelte'

	export let href: string
	export let title: string | undefined = undefined
	export let icon: IconDefinition | undefined = undefined
	export let tooltip: ComponentProps<Tooltip> | undefined = undefined

</script>
<a
	href={href}
	on:click="{event => event.stopPropagation()}"
	target="_blank"
	{...$$restProps}
>
	{#if icon}
		<Fa {icon}/>
	{/if}
	{#if title}
		{title}
	{/if}
</a>
{#if tooltip}
	<Tooltip {...tooltip}/>
{/if}
