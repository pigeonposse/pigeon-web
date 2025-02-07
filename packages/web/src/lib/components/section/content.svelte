<script lang="ts">

	import './content.css'
	import { page } from '$app/state'
	import SharePopover from '$lib/components/section/share.svelte'
	import Seo from '$lib/components/seo/main.svelte'

	import type {
		ComponentProps,
		Snippet,
	} from 'svelte'

	type Props = {
		title?         : string
		type?          : 'main' | 'center'
		share?         : string | Partial<ComponentProps<SharePopover>>
		seo?           : ComponentProps<Seo>
		class?         : string
		children?      : Snippet
		bottomContent? : Snippet
	}
	let {
		title,
		type  = 'main',
		share,
		seo,
		class: Klass,
		children,
		bottomContent,
	}: Props = $props()

</script>

{#if seo}
	<Seo {...{
		title : title || '',
		...seo,
	}} />
{/if}

<div class="content {type} {Klass || ''}">

	{#if title }
		<h1>{@html title}</h1>
	{/if}

	{@render children?.()}

	<section class="content_bottom">

		{@render bottomContent?.()}

		{#if share}
			<SharePopover
				{...( typeof share === 'string' ? { title: share } : { title: title || '' } )}
				url={page.url.href}
				{...( typeof share === 'object' ? share : {} )}
			/>
		{/if}

	</section>

</div>
