<script lang="ts">

	import Cards from './cards.svelte'
	import Section from '$lib/components/section/container.svelte'
	import Page from '$lib/components/section/content.svelte'

	export let data
	const {
		t, appName, apiData,
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
		{#if apiData.user }
			<Cards data={apiData.user}/>
		{/if}
	</Section>

</Page>
