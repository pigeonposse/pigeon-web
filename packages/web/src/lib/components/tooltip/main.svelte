<script lang="ts">

	import { Tooltip } from 'flowbite-svelte'

	import './style.css'
	import { commandSVG } from '../icons/main'
	import Badge from '$components/badge/main.svelte'

	import type { ComponentProps } from 'svelte'

	let {
		title,
		cmd,
		class: Klass,
		...rest
	}: Partial<ComponentProps<typeof Tooltip>> & {
		title  : string
		cmd?   : string[]
		class? : string
	} = $props()

</script>

<Tooltip
	class={[ 'tooltip', Klass ]}
	{...rest}
>
	<span>{title}</span>

	{#if cmd}
		<Badge type="primary">
			{#each cmd as key}
				<span class="command">
					{#if key === 'cmd'}
						{@html commandSVG}
					{:else}
						{key.toUpperCase()}
					{/if}
				</span>
			{/each}
		</Badge>
	{/if}

</Tooltip>
