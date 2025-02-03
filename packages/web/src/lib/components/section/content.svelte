<script lang="ts">

	import './content.css'
	import { page } from '$app/state'
	import SharePopover from '$lib/components/section/share.svelte'
	import Seo from '$lib/components/seo/main.svelte'

	import type { ComponentProps } from 'svelte'

	export let title: string | undefined = undefined
	export let type: 'main' | 'center' = 'main'
	export let share: string | Partial<ComponentProps<SharePopover>> | undefined = undefined
	export let seo: ComponentProps<Seo> | undefined = undefined

</script>

{#if seo}
	<Seo {...{
		title : title || '',
		...seo,
	}} />
{/if}

<div class="content {type}">

	{#if title }
		<h1>{@html title}</h1>
	{/if}

	<slot/>

	{#if 'bottom' in $$slots || share }

		<section class="content_bottom">

			<slot name="bottom" />

			{#if share}
				<SharePopover
					{...( typeof share === 'string' ? { title: share } : { title: title || '' } )}
					url={page.url.href}
					{...( typeof share === 'object' ? share : {} )}
				/>
			{/if}

		</section>

	{/if}

</div>
