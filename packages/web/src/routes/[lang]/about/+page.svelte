<script lang="ts">

	import { faGithub } from '@fortawesome/free-brands-svg-icons'
	import {
		faGlobe,
		faLink,
	} from '@fortawesome/free-solid-svg-icons'

	import Link from '$components/button/link.svelte'
	import Button from '$components/button/main.svelte'
	import Card from '$components/card/main.svelte'
	import Image from '$components/image/main.svelte'
	import Section from '$components/section/container.svelte'
	import Page from '$components/section/content.svelte'
	import Tabs from '$components/tabs/main.svelte'
	import type { ApiDataUserMember } from '$lib/core/api/types'
	import { setTitleFromID } from '$lib/core/utils/main'
	import { renderMarkdown } from '$lib/core/utils/md'

	import type { PageProps } from '../$types'

	const { data }: PageProps = $props()

	type Member = ApiDataUserMember

	const {
		t, appName, routes, api,
	} = data

	let userContent: Awaited<ReturnType<typeof setUserContent>> = $state( undefined )

	const setUserContent = async () => {

		const USER_CONTENT = api.data?.repo?.filter( d => d.id === '.github' )[0].content
			|| api.data?.repo?.filter( d => d.id === api.data?.user?.id )[0].content

		if ( !USER_CONTENT ) return

		const props = Object.entries( USER_CONTENT ).map( async ( [ k, v ] ) => {

			if ( !( typeof v === 'object' && 'content' in v ) || typeof v.content !== 'string' ) return

			return {
				id    : k,
				name  : setTitleFromID( k ),
				type  : 'text' as const,
				input : await renderMarkdown( v.content, { heading: 2 } ),
			}

		} )
		const res   = await Promise.all( props )
		return res.filter( d => d !== undefined ).filter( d => d.id !== 'readme' )

	}

	const run = async () => userContent = await setUserContent()

	run()

</script>

{#snippet member( data: Member )}

	<Card
		class="p-8"
		href={data.homepage || data.github}
		imgBgUrl={data.avatar}
	>
		{#snippet contentHeader()}
			<div>

				<Image
					class="object-contain rounded-full bg-primary-800/10 p-2"
					alt="card-image-{data.name}"
					height="150"
					src={data.avatar}
					width="150"
				/>

				<div class="py-4">
					<h3 class="text-4xl font-extrabold text-start">{data.name}</h3>
					<div class="text-start py-4 px-2">
						{data.desc || ''}
					</div>
				</div>
			</div>
		{/snippet}
		{#snippet contentFooter()}
			<div class="flex gap-4 w-full justify-end p-2">
				{#if data.homepage}
					<Link
						href={data.homepage}
						icon={faGlobe}
						tooltip={{ title: $t( 'common.projects.card.web' ) }}
					/>
				{/if}

				{#if data.github}
					<Link
						href={data.github}
						icon={faGithub}
						tooltip={{ title: $t( 'common.projects.card.repo' ) }}
					/>
				{/if}
			</div>
		{/snippet}
	</Card>

{/snippet}

<Page
	seo={{
		pageTitle   : appName,
		description : $t( 'common.about.desc' ),
	}}
	share={$t( 'common.about.title' )}
	title={$t( 'common.about.title' )}
>
	<p>{api.data?.user?.description || ''}</p>

	{#if api.data?.user && Array.isArray( api.data?.user.teams )}

		<Section
			title={$t( 'common.about.section.teams.title' )}
			type="start"
		>
			{#each api.data?.user.teams as team}
				{#if 'members' in team}

					<div class="py-4 flex flex-col gap-4">

						<div class="flex gap-2 justify-between">
							<h4>{team.name}</h4>
							<Button
								class="opacity-40 hover:opacity-80"
								href="https://github.com/orgs/pigeonposse/teams/{team.slug}"
								icon={faLink}
								type="none"
							/>
						</div>

						<div class="flex flex-col sm:flex-row gap-4 h-max items-between justify-between">
							{#each team.members as data}
								{@render member( data )}
							{/each}
						</div>
					</div>

				{/if}
			{/each}
		</Section>
	{/if}

	{#if userContent}
		<Section title={$t( 'common.about.section.info.title' )}>
			<div class="py-4 w-full">
				<Tabs
					id='page'
					customSectionClasses="!items-start"
					items={userContent}
					urlParams={true}
				/>
			</div>
		</Section>
	{/if}

	<Section type="start">
		<div class="flex gap-4">
			<Button
				href={'https://github.com/' + api.data?.user?.id}
				icon={faGithub}
				type="secondary"
			>
				GitHub
			</Button>
			<Button
				goto={$routes.contribute.path}
				type="dark"
			>
				{$t( 'common.contribute.title' )}
			</Button>
			<Button
				goto={$routes.sponsors.path}
				type="dark"
			>
				<span>{$t( 'common.sponsors.title' )}</span>
			</Button>
		</div>
	</Section>

</Page>
