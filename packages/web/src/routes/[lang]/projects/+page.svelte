<script lang="ts">
	import {
		faFilter,
		faSearch,
	} from '@fortawesome/free-solid-svg-icons'

	import { goto } from '$app/navigation'
	import { page } from '$app/state'
	import Badge from '$components/badge/main.svelte'
	import CardProject from '$components/card/project.svelte'
	import SearchInput from '$components/input/search.svelte'
	import Select from '$components/input/select.svelte'
	import Notification from '$components/notification/main.svelte'
	import Section from '$components/section/container.svelte'
	import Content from '$components/section/content.svelte'
	import Spinner from '$components/spinner/main.svelte'
	import { t } from '$core/i18n/main'
	import { routes } from '$core/routes/main'

	import type { PageProps } from './$types'

	const { data }: PageProps = $props()

	// let open = $state( false )
	// let filteredValue = $derived( api.filteredRepoValue )

	const {
		api, appName,
	} = data

	type RepoData = Awaited<typeof api.repos>

	let projectsFiltered: RepoData = $state( undefined )

	$effect( () => {

		;( async () => {

			projectsFiltered = await api.filteredRepos

		} )()

	} )

	const onClickCardProject = async ( e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }, v:string ) => {

		if ( innerWidth < 640        // bail if the screen is too small
			|| e.shiftKey             // or the link is opened in a new window
			|| e.metaKey || e.ctrlKey // or a new tab (mac: metaKey, win/linux: ctrlKey)
		// should also consider clicking with a mouse scroll wheel
		) return

		// prevent navigation
		e.preventDefault()
		const href = page.url.pathname + '/' + v
		goto( href )

	}

</script>

{#snippet search()}

	<SearchInput
		id={$routes.projects.params.search.id}
		placeholder={$t( 'common.projects.searchPlaceholder' )}
		bind:value={api.filteredRepoValue}
		class={projectsFiltered ? 'visible' : 'hidden'}
		onKeyFocus={true}
		urlParams={true}
	/>

{/snippet}

{#snippet filter()}
	{#if projectsFiltered }
		<Select title={'Order'} options={[]}/>
	{/if}
{/snippet}

<Content
	title={$t( 'common.projects.title' ) + ( projectsFiltered?.general.length ? ` (${projectsFiltered.general.length})` : '' ) + ( !api.filteredRepoValue || api.filteredRepoValue === '' ? '' : `: ${api.filteredRepoValue}` )}
	seo={{
		pageTitle   : appName,
		description : $t( 'common.projects.desc' ),
	}}
	share={$t( 'common.projects.title' )}
	bottomContent={{
		search : {
			title   : 'Search',
			content : search,
			icon    : faSearch,
			cmd     : [ 'cmd', 'k' ],
		},
		filter : {
			title   : 'Filter',
			content : filter,
			icon    : faFilter,
		},
	} }
>
	{#snippet titleContent()}
		<div class="flex w-full sm:items-center justify-between flex-col sm:flex-row gap-4">
			<h1>{$t( 'common.projects.title' )}</h1>
			<div class="flex gap-2">
				{#if api.filteredRepoValue}
					<Badge
						type="secondary"
						closable={true}
						onClose={() => {

							api.filteredRepoValue = ''

						} }
					>
						<span class="opacity-80">Search:</span><span>{api.filteredRepoValue}</span>
					</Badge>
				{/if}
				<Badge><span class="opacity-80">Total:</span><span>{projectsFiltered?.general.length || 0}</span></Badge>

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
			&& !( projectsFiltered && 'other' in projectsFiltered && projectsFiltered.other.length > 0 )
		)}
			<Section type="start">

				<Notification class="!p-4">{$t( 'common.projects.notFound' )}</Notification>
			</Section>
		{:else}
			{#if 'general' in projectsFiltered && projectsFiltered.general.length > 0}
				<Section>
					<div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{#each projectsFiltered.general as project}
							<CardProject
								{...project}
								href={undefined}
								onclick={async e => await onClickCardProject( e, project.data.id )}
								data-sveltekit-preload-data
							/>
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
							<CardProject {...project}/>
						{/each}
					</div>
				</Section>
			{/if}
		{/if}

	{:catch _e}
		<Section >

			{$t( 'common.projects.error' )}
		</Section>
	{/await}

</Content>
