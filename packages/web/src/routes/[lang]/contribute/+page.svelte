<script lang="ts">

	import Cards from './cards.svelte'

	import type { PageProps } from '../$types'

	import Section from '#components/section/container.svelte'
	import Page from '#components/section/content.svelte'

	const { data }: PageProps = $props()

	const t       = $derived( data.t )
	const appName = $derived( data.appName )
	const api     = $derived( data.api )

</script>

<Page
	seo={{
		pageTitle   : appName,
		description : $t( 'common.contribute.desc' ),
	}}
	share={$t( 'common.contribute.title' )}
	title={$t( 'common.contribute.title' )}
	type="center"
>
	<Section>
		{#if api.data?.user}
			<Cards data={api.data?.user} />
		{/if}
	</Section>

</Page>
