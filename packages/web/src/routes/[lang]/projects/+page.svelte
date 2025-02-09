<script lang="ts">

	import Badge from '$lib/components/badge/main.svelte'
	import Card from '$lib/components/card/project.svelte'
	import Notification from '$lib/components/notification/main.svelte'
	import SearchInput from '$lib/components/search/main.svelte'
	import Section from '$lib/components/section/container.svelte'
	import Page from '$lib/components/section/content.svelte'
	import Spinner from '$lib/components/spinner/main.svelte'

	import type { PageProps } from './$types'

	const { data }: PageProps = $props()

	const {
		t, api, appName,
	} = data

	type RepoData = Awaited<typeof api.repos>

	let projectsFiltered: RepoData = $state( undefined )

	$effect( () => {

		;( async () => {

			projectsFiltered = await api.filteredRepos

		} )()

	} )

</script>

<Page
	title={$t( 'common.projects.title' ) + ( projectsFiltered?.general.length ? ` (${projectsFiltered.general.length})` : '' ) + ( !api.filteredRepoValue || api.filteredRepoValue === '' ? '' : `: ${api.filteredRepoValue}` )}
	seo={{
		pageTitle   : appName,
		description : $t( 'common.projects.desc' ),
	}}
	share={$t( 'common.projects.title' )}
>
	{#snippet titleContent()}
		<div class="flex w-full sm:items-center justify-between flex-col sm:flex-row gap-4">
			<h1>{$t( 'common.projects.title' )}</h1>
			<div class="flex gap-2">
				{#if api.filteredRepoValue}
					<Badge>Filter: {api.filteredRepoValue}</Badge>
				{/if}
				<Badge>Total: {projectsFiltered?.general.length || 0}</Badge>
			</div>
		</div>

	{/snippet}

	{#await api.filteredRepos }
		<Section type="center">
			<Spinner/>
		</Section>
	{:then projectsFiltered }

		{#if (
			!( projectsFiltered && 'general' in projectsFiltered && projectsFiltered.general.length > 0 )
			&& !( projectsFiltered && 'other' in  projectsFiltered &&  projectsFiltered.other.length > 0 )
		)}
			<Section type="start">
				<Notification class="!p-4">{$t( 'common.projects.notFound' )}</Notification>
			</Section>
		{:else}
			{#if 'general' in projectsFiltered && projectsFiltered.general.length > 0}
				<Section>
					<div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{#each projectsFiltered.general as project}
							<Card {...project}/>
						{/each}
					</div>
				</Section>
			{/if}
			{#if 'other' in projectsFiltered &&  projectsFiltered.other.length > 0}
				<Section
					title={$t( 'common.projects.others' )}
				>
					<div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{#each projectsFiltered.other as project}
							<Card {...project}/>
						{/each}
					</div>
				</Section>
			{/if}
		{/if}

	{:catch _e}
		<Section>
			{$t( 'common.projects.error' )}
		</Section>
	{/await}

	{#snippet bottomContent()}
		{#if projectsFiltered }
			<SearchInput
				id='filter'
				placeholder={$t( 'common.projects.searchPlaceholder' )}
				onChange={v => {

					api.filteredRepoValue = v

				}}
				onKeyFocus={true}
				urlParams={true}
			/>
		{/if}
	{/snippet}

</Page>
