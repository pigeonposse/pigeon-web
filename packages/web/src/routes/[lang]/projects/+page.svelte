<script lang="ts">

	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'

	import Card from '$lib/components/card/project.svelte'
	import Notification from '$lib/components/notification/main.svelte'
	import SearchInput from '$lib/components/search/main.svelte'
	import Section from '$lib/components/section/container.svelte'
	import Page from '$lib/components/section/content.svelte'
	import Spinner from '$lib/components/spinner/main.svelte'

	import type { ComponentProps } from 'svelte'

	export let data

	const {
		t, api, appName,
	} = data

	let projects: Awaited<ReturnType<typeof api.get>>
	const projectsStore    = writable<typeof projects>( projects )
	let filterTimer: NodeJS.Timeout
	let searchTerm: string = ''

	const run = async () => {

		api.response = 'loading'
		projects     = await api.get()
		if ( projects ) {

			projectsStore.set( JSON.parse( JSON.stringify( projects ) ) )
			api.response = 'success'

		}
		else api.response = 'error'

	}

	onMount( async () => {

		await run()

	} )

	function handleFilter( value: string ) {

		if ( !projects ) return

		searchTerm = value.trim().toLowerCase()

		if ( filterTimer ) clearTimeout( filterTimer )

		filterTimer = setTimeout( () => {

			if ( !searchTerm || searchTerm === '' ) {

				projectsStore.set( JSON.parse( JSON.stringify( projects ) ) )
				return

			}

			projectsStore.update( value => {

				if ( !projects || !value ) return

				const filterF = ( p: ComponentProps<Card> ) => p.title.toLowerCase().includes( searchTerm )
					|| p.title.replace( ' ', '' ).toLowerCase().includes( searchTerm )
					|| p.desc.toLowerCase().includes( searchTerm )
					||  ( p.tags && Array.isArray( p.tags ) && p.tags.join( ' ' ).includes( searchTerm ) )
					|| ( p.status && Array.isArray( p.status ) && p.status.join( ' ' ).includes( searchTerm ) )

				value.general = projects.general.filter( p => filterF( p ) )
				value.other   = projects.other.filter( p => filterF( p ) )

				return value

			} )

		}, 200 )

	}

</script>

<Page
	title={$t( 'common.projects.title' ) + ( $projectsStore?.general.length ? ` (${$projectsStore.general.length})` : '' ) + ( !searchTerm || searchTerm === '' ? '' : `: <i>${searchTerm}</i>` )}
	seo={{
		pageTitle   : appName,
		description : $t( 'common.projects.desc' ),
	}}
	share={$t( 'common.projects.title' )}
>

	{#if api.response === 'loading' }
		<Section type="center">
			<Spinner/>
		</Section>
	{:else if api.response === 'success' && projects}

		{#if (
			!( $projectsStore && 'general' in $projectsStore && $projectsStore.general.length > 0 )
			&& !( $projectsStore && 'other' in  $projectsStore &&  $projectsStore.other.length > 0 )
		)}
			<Section>
				<Notification  class="!p-4">{$t( 'common.projects.notFound' )}</Notification>
			</Section>
		{:else}
			{#if 'general' in $projectsStore && $projectsStore.general.length > 0}
				<Section>
					<div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{#each  $projectsStore.general as project}
							<Card {...project}/>
						{/each}
					</div>
				</Section>
			{/if}
			{#if 'other' in $projectsStore &&  $projectsStore.other.length > 0}
				<Section
					title={$t( 'common.projects.others' )}
				>
					<div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{#each $projectsStore.other as project}
							<Card {...project}/>
						{/each}
					</div>
				</Section>
			{/if}
		{/if}

	{:else}
		<Section>
			{$t( 'common.projects.error' )}
		</Section>
	{/if}

	<svelte:fragment slot="bottom">
		{#if api.response === 'success' && projects}
			<SearchInput
				id='filter'
				placeholder="{$t( 'common.projects.searchPlaceholder' )}"
				onChange={handleFilter}
				onKeyFocus={true}
				urlParams={true}
			/>
		{/if}
	</svelte:fragment>

</Page>
