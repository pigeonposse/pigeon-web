<script lang="ts">
	import {
		Fa,
		type IconDefinition,
	} from '../icons/main'
	import type { TooltipProps } from '$components/tooltip/types'

	import type { Snippet } from 'svelte'
	import type { HTMLAnchorAttributes } from 'svelte/elements'

	type Props = HTMLAnchorAttributes & {
		title?    : string
		icon?     : IconDefinition
		tooltip?  : TooltipProps
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
	aria-label={tooltip?.title}
	href={href}
	target="_blank"
	{...rest}
	class={[
		rest['aria-label'] || tooltip?.title
			? [
				'hint--rounded',
				tooltip?.placement === 'bottom'
					? 'hint--bottom'
					: tooltip?.placement === 'left' ? 'hint--left' : tooltip?.placement === 'right' ? 'hint--right' : 'hint--top',
			]
			: undefined,
	]}
>
	{#if icon}
		<Fa {icon} />
	{/if}
	{title || ''}

	{@render children?.()}
</a>

