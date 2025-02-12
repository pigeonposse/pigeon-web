<script lang="ts">

	import Cards from './cards.svelte'
	import Section from '$components/section/container.svelte'
	import Page from '$components/section/content.svelte'

	import type { PageProps } from '../$types'

	const { data }: PageProps = $props()

	const {
		t, appName, api,
	} = data

</script>

<Page
	type="center"
	title={$t( 'common.contribute.title' )}
	seo={{
		pageTitle   : appName,
		description : $t( 'common.contribute.desc' ),
	}}
	share={$t( 'common.contribute.title' )}
>
	<Section>
		{#if api.data?.user }
			<Cards data={api.data?.user}/>
		{/if}
	</Section>

</Page>
