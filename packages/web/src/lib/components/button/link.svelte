<script lang="ts">

	import {
		Fa,
		type IconDefinition,
	} from '../icons/main'
	import Tooltip from '$components/tooltip/main.svelte'

	import type {
		ComponentProps,
		Snippet,
	} from 'svelte'
	import type { HTMLAnchorAttributes } from 'svelte/elements'

	type Props = HTMLAnchorAttributes & {
		title?    : string
		icon?     : IconDefinition
		tooltip?  : ComponentProps<typeof Tooltip>
		children? : Snippet
	}

	let {
		tooltip,
		icon,
		title,
		href,
		children,
		...rest
	}: Props = $props()

</script>

<a
	href={href}
	target="_blank"
	{...rest}
>
	{#if icon}
		<Fa {icon} />
	{/if}
	{title || ''}

	{@render children?.()}
</a>

{#if tooltip}
	<Tooltip {...tooltip} />
{/if}
