<script lang="ts">

	import { faGithub } from '@fortawesome/free-brands-svg-icons'
	import {
		faBookOpen,
		faCode,
	} from '@fortawesome/free-solid-svg-icons'

	import Cards from './contribute/cards.svelte'
	import { goto } from '$app/navigation'

	import type { PageProps } from './$types'

	import Button from '#components/button/main.svelte'
	import CardCarousel from '#components/carousel/cards.svelte'
	// import FeatCarousel from '#components/carousel/feat.svelte'
	import Section from '#components/section/container.svelte'
	import Page from '#components/section/content.svelte'
	import Typewriter from '#components/typewriter/main.svelte'
	import { routes } from '#core/routes/main'

	const { data }: PageProps = $props()

	const t        = $derived( data.t )
	const api      = $derived( data.api )
	const appName  = $derived( data.appName )
	const apiRepos = $derived( data.apiRepos )
	const config   = $derived( api.getConfig() )

</script>

<Page
	seo={{
		title       : 'A Software development collective',
		pageTitle   : appName,
		description : $t( 'common.home.desc' ),
		titleType   : 'left',

	}}
	share={$t( 'common.home.title' )}
>

	<Section type="center">
		{#snippet header()}
			<div class="hero">
				<span class="hero__eyebrow">
					<!-- <span class="hero__eyebrow__dot"></span> -->
					{$t( 'common.home.eyebrow' )}
				</span>
				<!-- <img
					style="width: 800px"
					alt={appName}
					height="100px"
					src="/banner.svg"
				> -->
				<h1 class="title">{appName}</h1>
			</div>
		{/snippet}

		<span class="title__subtitle">
			<span>{config?.title || $t( 'common.home.subtitle' ) || 'Software development collective focused on'}</span>
			<Typewriter
				class="title__subtitle__typewriter"
				delay={2000}
				onclick={e => {

					if ( !config?.titleOpts && api.tags ) {

						const name = e.currentTarget.getAttribute( 'data-name' )
						if ( name )
							goto( $routes.projects.params.search.path( name ) )

					}

				}}
				speed={100}
				texts={config?.titleOpts || api.tags || [
					'Dev Tools',
					'User Utilities',
					'Software Plugins',
					'Software Themes',
					'Services',
				]}
			/>
		</span>
		<span class="title__desc">{config?.action || $t( 'common.home.action' ) || 'Open source and self-hosting whenever possible.'}</span>
		{#snippet footer()}
			<div class="hero__actions">
				<Button
					href="https://github.com/{api.data?.user.id}"
					icon={faGithub}
					type="primary"
				>GitHub</Button>
				<Button
					goto={$routes.projects.path}
					icon={faCode}
					type="dark"
				>{$t( 'common.projects.title' )}</Button>
				<Button
					goto={$routes.about.path}
					icon={faBookOpen}
					type="dark"
				>{$t( 'common.about.title' )}</Button>
			</div>
		{/snippet}

	</Section>

	{#if apiRepos}

		<!-- {#if 'feat' in apiRepos}
			<Section
				// btnTitle={$t( 'common.btns.viewMore' )}
				// goto={$routes.projects.path}
				// title={$t( 'common.projects.feat' )} type="diagonal-bottom"
			>
				<div class="py-8 flex flex-col gap-4 w-full">
					<FeatCarousel values={apiRepos.feat} />
				</div>
			</Section>

		{/if} -->
		{#if 'general' in apiRepos}
			<Section
				btnTitle={$t( 'common.btns.projects' )}
				goto={$routes.projects.path}
				// title={$t( 'common.projects.title' )}
				type="diagonal-bottom"
			>
				<CardCarousel
					goto={$routes.projects.path}
					max={10}
					type="right"
					values={apiRepos.general}
				/>
			</Section>

		{/if}
	{:else}
		<div class="flex items-center justify-center h-[50vh]">
			{$t( 'common.projects.error' )}
		</div>
	{/if}

	<Section
		btnTitle={$t( 'common.btns.readMore' )}
		goto={$routes.contribute.path}
		title={$t( 'common.contribute.title' )}
		type="diagonal-bottom"
	>

		{#if api.data?.user}
			<Cards data={api.data.user} />
		{/if}

	</Section>

</Page>
