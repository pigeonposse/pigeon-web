<script lang="ts">

	import {
		faFilter,
		faSearch,
	} from '@fortawesome/free-solid-svg-icons'
	import { flip } from 'svelte/animate'
	import { fade } from 'svelte/transition'

	import './style.css'
	import Badge from '$components/badge/main.svelte'
	import CardProject from '$components/card/project.svelte'
	import SearchInput from '$components/input/search.svelte'
	import Select from '$components/input/select.svelte'
	import Notification from '$components/notification/main.svelte'
	import Section from '$components/section/container.svelte'
	import Content from '$components/section/content.svelte'
	import Spinner from '$components/spinner/main.svelte'
	import { sortedTypes } from '$core/api/main.svelte'
	import { t } from '$core/i18n/main'
	import { routes } from '$core/routes/main'

	import type { PageProps } from './$types'

	const { data }: PageProps = $props()

	type RepoData = Awaited<typeof data.api.repos>

	const {
		api,
		appName,
	} = data

	const keys = {
		search : 'search',
		filter : 'filter',
	} as const

	let projectsFiltered: RepoData               = $state( undefined )
	let bottomOpened: string | undefined | false = $state( undefined )
	let searchFocused                            = $state( false )
	let titleProps                               = $derived.by( () => {

		return (
			projectsFiltered?.general.length
				? ` (${projectsFiltered.general.length})`
				: ''
		) + (
			!api.filteredRepoValue || api.filteredRepoValue === ''
				? ''
				: `: ${api.filteredRepoValue}`
		)

	} )

	$effect( () => {

		;( async () => {

			projectsFiltered = await api.filteredRepos

		} )()

	} )
</script>

{#snippet search()}

	<SearchInput
		id={$routes.projects.params.search.id}
		placeholder={$t( 'common.projects.searchPlaceholder' )}
		bind:value={api.filteredRepoValue}
		bind:isFocused={searchFocused}
		class={projectsFiltered ? 'visible' : 'hidden'}
		onkeydown={() => ( bottomOpened = keys.search )}
		urlParams={true}
	/>

{/snippet}

{#snippet filter()}
	{#if projectsFiltered }
		<div>
			<span>{$t( `common.projects.sortTitle` )}</span>
			<div>
				<Select
					type='none'
					options={Object.values( sortedTypes ).map( v => ( {
						value : v,
						text  : $t( `common.projects.sort.${v}` ) as string || v,
					} ) )}
					id={$routes.projects.params.sort.id}
					urlParams={true}
					bind:value={api.sortedBy}
				/>
			</div>
		</div>
	{/if}
{/snippet}

<Content
	title={$t( 'common.projects.title' ) + titleProps}
	seo={{
		pageTitle   : appName,
		description : $t( 'common.projects.desc' ),
	}}
	share={$t( 'common.projects.title' ) + titleProps}
	bottomOpened={bottomOpened}
	bottomContent={{
		[keys.search] : {
			title   : $t( 'common.btns.search' ),
			content : search,
			icon    : faSearch,
			cmd     : [ 'cmd', 'k' ],
			type    : 'none',
			onclick : () => ( searchFocused = true ),
		},
		[keys.filter] : {
			title   : $t( 'common.btns.filters' ),
			content : filter,
			icon    : faFilter,
			type    : 'info',
		},
	} }
>
	{#snippet titleContent()}
		<div class="title">
			<h1>{$t( 'common.projects.title' )}</h1>
			<div>
				{#if api.filteredRepoValue}
					<Badge
						type="secondary"
						closable={true}
						onClose={() => {

							api.filteredRepoValue = ''

						} }
					>
						<span>{$t( 'common.projects.searchRes' )}</span><span>{api.filteredRepoValue}</span>
					</Badge>
				{/if}
				<Badge>
					<span>{$t( 'common.projects.sortRes' )}</span><span>{$t( `common.projects.sort.${api.sortedBy}` ) }</span>
				</Badge>
				<Badge><span>{$t( 'common.projects.countRes' )}</span><span>{projectsFiltered?.general.length || 0}</span></Badge>

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

				<div transition:fade={{ duration: 300 }}>
					<Notification class="!p-4">{$t( 'common.projects.notFound' )}</Notification>
				</div>

			</Section>
		{:else}
			{#if 'general' in projectsFiltered && projectsFiltered.general.length > 0}
				<Section type="archive">
					{#each projectsFiltered.general as project ( project.data.id )}
						<div animate:flip={{ duration: 200 }} class="h-full flex justify-between">
							<CardProject
								{...project}
								onTagClick={n => {

									api.filteredRepoValue = n

								}}
							/>
						</div>
					{/each}
				</Section>
			{/if}
			{#if 'other' in projectsFiltered &&  projectsFiltered.other.length > 0}
				<Section
					title={$t( 'common.projects.others' )}
					type="archive"
				>

					{#each projectsFiltered.other as project}
						<CardProject {...project}/>
					{/each}

				</Section>
			{/if}
		{/if}

	{:catch _e}
		<Section >
			{$t( 'common.projects.error' )}
		</Section>
	{/await}

</Content>
