<script lang="ts">
	import type { Snippet } from 'svelte'

	type Props = {
		title     : string
		desc?     : string
		emoji?    : string
		children? : Snippet
	}

	const {
		title,
		desc,
		emoji = '💥',
		children,
	}: Props = $props()

</script>

<div class="py-10 flex items-center justify-center flex-col gap-4 sm:text-center">
	<h2 class="sm:text-8xl text-6xl font-extrabold text-primary-300 text_color_change w-full">{title}</h2>
	{#if desc || children}
		<span class="py-10">
			{@html desc || ''}
			{@render children?.()}
		</span>
	{/if}

	<div class="text-9xl sm:py-10 py-4 w-full relative">
		<span class="blur-[80px] absolute inset-0">{emoji}</span>
		<span class="absolute inset-0">{emoji}</span>
	</div>
</div>
